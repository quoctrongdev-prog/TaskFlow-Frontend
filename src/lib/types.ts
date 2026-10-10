import { ReactNode } from "react";
import { type InternalAxiosRequestConfig } from "axios";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  dueDate: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  tasks: number;
  completed: number;
  color: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  accessToken?: string;
};

export type User = {
  user_id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type UserProfileResponse = {
  message: string;
  user: User;
};

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;

  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
};

// export type AuthProviderProps = {
//   children: ReactNode;
// };

export type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};
