import { api, apiMail, apiUser } from "./client";
import {
  AuthResponse,
  LoginData,
  RegisterData,
  UserProfileResponse,
} from "./types";

//File này chỉ chịu trách nhiệm gọi Auth API.

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/register", data);

  return response.data;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/login", data);

  return response.data;
}

export async function refreshAccessToken(): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/refresh-token");

  return response.data;
}

export async function logout(): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/logout");

  return response.data;
}

export async function verifyEmail(token: string): Promise<AuthResponse> {
  const response = await apiMail.get<AuthResponse>("/verify-email", {
    params: { token },
  });

  return response.data;
}

export async function resendVerificationEmail(
  email: string,
): Promise<AuthResponse> {
  const response = await apiMail.post<AuthResponse>("/resend-email", {
    email,
  });

  return response.data;
}

export async function getUserProfile(
  accessToken: string,
): Promise<UserProfileResponse> {
  const response = await apiUser.get<UserProfileResponse>("/user-profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
