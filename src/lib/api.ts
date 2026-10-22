import { api, apiAuth, apiMail, apiRefresh } from "./client";
import type {
  AuthResponse,
  ChangePasswordData,
  CreateTaskData,
  LoginData,
  MessageResponse,
  Project,
  ProjectDetailResponse,
  ProjectResponse,
  RegisterData,
  Task,
  TaskResponse,
  TasksResponse,
  UpdateTaskData,
  UpdateUserData,
  UserAvatar,
  UserProfileResponse,
} from "./types";

//File này chỉ chịu trách nhiệm gọi API.

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await apiAuth.post<AuthResponse>("/register", data);

  return response.data;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await apiAuth.post<AuthResponse>("/login", data);

  return response.data;
}

// export async function refreshAccessToken(): Promise<AuthResponse> {
//   const response = await api.post<AuthResponse>("/refresh-token");

//   return response.data;
// }

export async function refreshAccessToken(): Promise<AuthResponse> {
  const response = await apiRefresh.post<AuthResponse>("/auth/refresh-token");

  return response.data;
}

export async function logout(): Promise<AuthResponse> {
  const response = await apiAuth.post<AuthResponse>("/logout");

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

// export async function getUserProfile(
//   accessToken: string,
// ): Promise<UserProfileResponse> {
//   const response = await apiUser.get<UserProfileResponse>("/user-profile", {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   return response.data;
// }

// export async function getUserProfile(): Promise<UserProfileResponse> {
//   const response = await api.get<UserProfileResponse>(
//     "/users/user-profile",
//   );

//   return response.data;
// }

// Lấy profile: Access Token do interceptor gắn tự động
export async function getUserProfile(): Promise<UserProfileResponse> {
  const response = await api.get<UserProfileResponse>("/users/user-profile");

  return response.data;
}

export async function updateUser(
  data: UpdateUserData,
): Promise<UserProfileResponse> {
  const response = await api.patch<UserProfileResponse>(
    "/users/update-user",
    data,
  );
  return response.data;
}

export async function changePassword(
  data: ChangePasswordData,
): Promise<MessageResponse> {
  const response = await api.patch<MessageResponse>(
    "/users/change-password",
    data,
  );
  return response.data;
}

export async function uploadAvatar(file: File): Promise<UserAvatar> {
  //FormData là một đối tượng JavaScript dùng để đóng gói dữ
  //liệu gửi qua HTTP request, đặc biệt hữu ích khi gửi file.
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<UserAvatar>("/avatar/upload", formData);

  // Axios trả về một response object chứa nhiều thông tin, ví dụ:
  // response.status
  // response.headers
  // response.data: data chính là dữ liệu JSON do backend trả về Ví dụ:
  // {
  //   "message": "Avatar uploaded successfully",
  //   "url": "https://example.com/avatar.png",
  //   "public_id": "avatars/user123"
  // }

  return response.data;
}

// export async function getUserProfile() {
//   const response = await api.get("/users/user-profile");

//   return response.data;
// }

export async function sendResetPassword(email: string) {
  const response = await apiMail.post("/reset-link", { email });
  return response.data;
}

export async function resetPassword(token: string, reset_password: string) {
  //encodeURIComponent: mục đích của nó chỉ là xử lý URL.
  //giúp token được truyền chính xác qua URL
  //đặc biệt khi token chứa ký tự đặc biệt.
  const response = await apiMail.post(
    `/reset-password?token=${encodeURIComponent(token)}`,
    { reset_password },
  );

  return response.data;
}

// Lấy danh sách project
export async function getProjects(): Promise<Project[]> {
  const response = await api.get<ProjectResponse>("/project/get-projects");

  return Array.isArray(response.data.project) ? response.data.project : [];
}

// Tạo project
export async function createProject(data: {
  name: string;
  description: string;
}): Promise<Project> {
  const response = await api.post<ProjectResponse>(
    "/project/create-project",
    data,
  );

  return response.data.project as Project;
}

// Lấy chi tiết project
export async function getProjectDetail(projectId: string): Promise<Project> {
  const response = await api.get<ProjectDetailResponse>(
    `/project/${projectId}`,
  );

  return response.data.projectDetail;
}

// Cập nhật project
export async function updateProject(
  projectId: string,
  data: { name: string; description: string },
): Promise<void> {
  await api.patch(`/project/update/${projectId}`, data);
}

// Xóa project
export async function deleteProject(projectId: string): Promise<void> {
  await api.delete(`/project/delete/${projectId}`);
}

export async function sendProjectInvitation(projectId: string, email: string) {
  const response = await api.post(`/project/send-invitation/${projectId}`, {
    email,
  });

  return response.data;
}

export async function acceptProjectInvitation(token: string) {
  const response = await api.post("/project/accept-invitation", { token });

  return response.data;
}

export async function updateProjectMemberRole(
  projectId: string,
  userId: string,
  role: "Admin" | "Member",
) {
  const response = await api.patch(
    `/project/update-role/${projectId}/${userId}`,
    { role },
  );

  return response.data;
}

/* Lấy danh sách task thuộc một project */
export async function getTasks(projectId: string): Promise<Task[]> {
  const response = await api.get<TasksResponse>(
    `/tasks/projects/${projectId}/tasks`,
  );

  return response.data.tasks;
}

/* Tạo task trong project */
export async function createTask(
  projectId: string,
  data: CreateTaskData,
): Promise<Task> {
  const response = await api.post<TaskResponse>(
    `/tasks/projects/${projectId}/tasks`,
    data,
  );

  return response.data.task;
}

/* Lấy chi tiết một task */
export async function getTaskDetail(taskId: string): Promise<Task> {
  const response = await api.get<TaskResponse>(`/tasks/${taskId}`);

  return response.data.task;
}

/* Cập nhật thông tin task */
export async function updateTask(
  taskId: string,
  data: UpdateTaskData,
): Promise<Task> {
  const response = await api.patch<TaskResponse>(`/tasks/${taskId}`, data);

  return response.data.task;
}

/* Cập nhật riêng trạng thái task */
export async function updateTaskStatus(
  taskId: string,
  status: Task["status"],
): Promise<Task> {
  const response = await api.patch<TaskResponse>(`/tasks/${taskId}/status`, {
    status,
  });

  return response.data.task;
}

/* Xóa task */
export async function deleteTask(taskId: string): Promise<void> {
  await api.delete(`/tasks/${taskId}`);
}
