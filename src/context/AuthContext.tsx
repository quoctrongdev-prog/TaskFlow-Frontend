"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  login as loginApi,
  logout as logoutApi,
  refreshAccessToken,
} from "@/lib/api";

import { getUserProfile } from "@/lib/api";
import { type User, type LoginData } from "@/lib/types";
import { useRouter } from "next/navigation";

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

      // 3. Lấy thông tin user
      // Đây là request thứ 2 sau khi login
      const profileResponse = await getUserProfile(response.accessToken);

      // 4. Lưu user vào state
      setUser(profileResponse.user);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await logoutApi();
      router.push("/")
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  }

  // Khôi phục session khi reload trang
  useEffect(() => {
    async function restoreSession() {
      try {
        // 1. Dùng refresh token trong HttpOnly cookie
        const response = await refreshAccessToken();

        if (!response.accessToken) {
          return;
        }

        // 2. Lưu access token mới
        setAccessToken(response.accessToken);

        // 3. Lấy user hiện tại
        const profileResponse = await getUserProfile(response.accessToken);

        // 4. Khôi phục user
        setUser(profileResponse.user);
      } catch (error) {
        // Không có session hoặc refresh token hết hạn
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

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
