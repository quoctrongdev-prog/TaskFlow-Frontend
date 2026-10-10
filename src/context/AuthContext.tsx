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
import { type User, type LoginData } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { setAccessToken as setStoredAccessToken } from "@/lib/tokenStore";
import { setupInterceptors } from "@/lib/interceptor";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;

  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // Quan trọng:
  // loading = true ngay từ đầu để chờ kiểm tra session
  // cũng có thể đặt tên là isRestoringSession
  const [loading, setLoading] = useState(true);

  //biến theo dõi đường dẫn (URL)
  const pathname = usePathname();
  //initialPathname giúp chúng ta xác định trang người dùng đang
  //mở lúc ứng dụng bắt đầu khôi phục phiên đăng nhập.
  const initialPathname = useRef(pathname);

  function clearAuthSession() {
    setUser(null);
    setAccessToken(null);
    setStoredAccessToken(null);
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
