import { ReactNode } from "react";
import { type InternalAxiosRequestConfig } from "axios";

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";

export type TaskStatus =
  | "Todo"
  | "In_Progress"
  | "Review"
  | "Done"
  | "Cancelled";

export type Task = {
  task_id: string;
  project_id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  assignee_id: string | null;
  assignee_name?: string | null;
  created_by: string;
  creator_name?: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type TaskResponse = {
  message?: string;
  task: Task;
};

export type TasksResponse = {
  tasks: Task[];
};

export type CreateTaskData = {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee_id: string | null;
  due_date: string | null;
};

export type UpdateTaskData = Partial<CreateTaskData>;

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

export type ChangePasswordData = {
  password: string;
  newPassword: string;
};

export type MessageResponse = {
  message: string;
};

export type UpdateUserData = {
  name: string;
};

export type UserAvatar = {
  message: string;
  url: string;
  public_id: string;
};

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;

  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;

  updateAuthUser: (updatedFields: Partial<User>) => void;
};

export type AuthProviderProps = {
  children: ReactNode;
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

export type Project = {
  project_id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at?: string;
  role?: "Admin" | "Member";
  created_by_name: string; // Thêm trường này để lưu tên người tạo
};

export type ProjectResponse = {
  message: string;
  project: Project | Project[];
};

export type ProjectDetailResponse = {
  message: string;
  projectDetail: Project;
};
