"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";

import {
  login as loginApi,
  logout as logoutApi,
  refreshAccessToken,
} from "@/lib/api";

import { getUserProfile } from "@/lib/api";
import {
  type User,
  type LoginData,
  AuthContextType,
  AuthProviderProps,
} from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { setAccessToken as setStoredAccessToken } from "@/lib/tokenStore";
import { setupInterceptors } from "@/lib/interceptor";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // Quan trọng:
  // loading = true ngay từ đầu để chờ kiểm tra session
  // cũng có thể đặt tên là isRestoringSession
  const [loading, setLoading] = useState(true);

  function clearAuthSession() {
    setUser(null);
    setAccessToken(null);
    setStoredAccessToken(null);
  }

  //Partial<User>: 1 phần User không cần lấy hết thuộc tính User
  function updateAuthUser(updatedFields: Partial<User>) {
    setUser((previous) =>
      previous ? { ...previous, ...updatedFields } : previous,
    );
  }

  //data: là 1 object gồm email và password
  //theo type LoginData cũng bao gồm 2 field đó
  async function login(data: LoginData) {
    setLoading(true);

    try {
      // 1. Login
      const response = await loginApi(data);

      if (!response.accessToken) {
        throw new Error("Access token is missing");
      }

      // 2. Lưu access token vào state
      setAccessToken(response.accessToken);
      // Bộ nhớ để Axios interceptor sử dụng: lưu access token
      // vào tokenStore
      setStoredAccessToken(response.accessToken);

      // 3. Lấy thông tin user
      // Đây là request thứ 2 sau khi login
      // Interceptor tự gắn Authorization
      const profileResponse = await getUserProfile();

      // 4. Lưu user vào state
      setUser(profileResponse.user);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await logoutApi();
      // router.push("/");
    } finally {
      clearAuthSession();
      router.replace("/");
    }
  }

  // Khôi phục session khi reload trang
  useEffect(() => {
    setupInterceptors();

    function handleSessionExpired() {
      clearAuthSession();
      router.replace("/login");
    }

    //window sống lâu hơn component. Component có thể unmount rồi, nhưng listener vẫn nằm trên window → memory leak:
    //addEventListener là "gắn dây", removeEventListener là "rút dây". React yêu cầu bạn rút dây khi không cần nữa để không rò rỉ bộ nhớ.
    //Nếu không cleanup: lặp → 10 listener cho 1 sự kiện → memory leak
    window.addEventListener("auth:session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, [router]);

  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await refreshAccessToken();

        if (!response.accessToken) {
          throw new Error("Access token is missing");
        }

        setAccessToken(response.accessToken);
        setStoredAccessToken(response.accessToken);

        const profileResponse = await getUserProfile();
        setUser(profileResponse.user);
      } catch {
        clearAuthSession();
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        updateAuthUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
