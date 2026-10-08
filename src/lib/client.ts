import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { getAccessToken, setAccessToken } from "./tokenStore";

// import dotenv from "dotenv";

// dotenv.config();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/auth`,
  //credentials: true để xử lý httpOnly refreshToken
  //nên frontend phải cho phép browser gửi/nhận cookie.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiMail = axios.create({
  baseURL: `${API_URL}/mail`,
  //credentials: true để xử lý httpOnly refreshToken
  //nên frontend phải cho phép browser gửi/nhận cookie.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUser = axios.create({
  baseURL: `${API_URL}/users`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Dùng một Axios instance riêng để gọi /refresh-token.
// Không dùng `api` ở đây để tránh interceptor tự bắt chính request refresh.
const apiRefresh = axios.create({
  // baseURL: `${API_URL}/auth/refresh-token`,
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor
// Tự động gắn Access Token vào mọi request protected.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Refresh state
let isRefreshing = false;

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

// Process queued requests
function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.resolve(token);
    }
  });

  failedQueue = [];
}

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    /*
     * Không phải 401
     * → trả lỗi bình thường
     */
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    /*
     * Request này đã retry rồi
     * → tránh vòng lặp vô hạn
     */
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    /*
     * Nếu đang có một request khác refresh token
     * thì request hiện tại đứng chờ.
     */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            resolve(api(originalRequest));
          },

          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      /*
       * Gọi refresh token.
       *
       * Browser tự gửi HttpOnly cookie:
       * refreshToken=...
       */
      const response = await apiRefresh.post<{
        accessToken: string;
      }>("/auth/refresh-token");

      const newAccessToken = response.data.accessToken;

      if (!newAccessToken) {
        throw new Error("Access token is missing");
      }

      /*
       * Lưu Access Token mới
       */
      setAccessToken(newAccessToken);

      /*
       * Cho những request đang chờ tiếp tục.
       */
      processQueue(null, newAccessToken);

      /*
       * Gắn token mới vào request ban đầu
       */
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      /*
       * Gọi lại request ban đầu
       */
      return api(originalRequest);
    } catch (refreshError) {
      /*
       * Refresh Token cũng hết hạn / invalid
       *
       * Những request đang chờ đều thất bại.
       */
      processQueue(refreshError, null);

      setAccessToken(null);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export { api, apiMail, apiUser, apiRefresh };
