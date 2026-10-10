import { api, apiRefresh } from "./client";
import { getAccessToken, setAccessToken } from "./tokenStore";
import { FailedRequest, RetryRequestConfig } from "./types";
import { type AxiosError, type InternalAxiosRequestConfig } from "axios";

// Axios cung cấp một cơ chế gọi là interceptor,
// cho phép bạn can thiệp vào request hoặc response
// trước khi Axios xử lý tiếp.

let isRefreshing = false;
//Hàng đợi
let failedQueue: FailedRequest[] = [];
let isInitialized = false;

// 1. Xử lý những request đang chờ refresh
function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.resolve(token);
    } else {
      request.reject(new Error("Unable to refresh access token"));
    }
  });

  failedQueue = [];
}

// 2. Đăng ký interceptor cho api. Biến isInitialized tránh đăng ký lặp trong cùng module instance.
export function setupInterceptors(): void {
  // Tránh đăng ký interceptor nhiều lần
  if (isInitialized) return;

  isInitialized = true;

  // api là instance Axios bạn tạo trong client.ts.
  // REQUEST INTERCEPTOR: chuẩn bị request và thêm Access Token, không gọi Refresh API.
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    // Dòng này trả lại cấu hình đã được xử lý cho Axios.
    // Axios cần nhận lại cấu hình để tiếp tục gửi request.
    // Nếu bạn quên trả về config, request interceptor
    // không cung cấp cấu hình hợp lệ như mong đợi và quá trình
    // gửi request có thể bị lỗi.
    return config;
    //request interceptor: Trước mỗi request qua api,
    //lấy access token hiện có và gắn vào header Authorization.
  });

  // RESPONSE INTERCEPTOR: Nó nhận lỗi 401 rồi mới bắt đầu xử lý refresh.
  api.interceptors.response.use(
    //Đây là callback xử lý trường hợp thành công.
    //Ví dụ backend trả về:
    //Axios tạo response object chứa dữ liệu và các thông tin khác. Callback này trả nguyên response lại:
    //Nó tương đương với:
    //Nếu request thành công, không cần refresh token, nên response được chuyển tiếp cho đoạn code gọi API.
    (response) => response,

    //Đây là callback xử lý lỗi.
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryRequestConfig | undefined;

      // Không có request config hoặc không phải 401
      if (!originalRequest || error.response?.status !== 401) {
        return Promise.reject(error);
      }

      //Nếu _retry là true, code từ chối lỗi luôn, không tiếp tục refresh.
      //Request 401 đã retry mà vẫn bị lỗi, không nên retry vô hạn.
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // Đánh dấu để request này không retry vô hạn
      originalRequest._retry = true;

      // Nếu request khác đang refresh, chờ kết quả
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              //cập nhật token vào header
              originalRequest.headers.Authorization = `Bearer ${token}`;

              //retry request: gọi lại request nếu đó là 401
              //như những code đã làm ở trên
              resolve(api(originalRequest));
            },

            //Nếu lỗi thì reject
            reject,
          });
        });
      }

      //Đánh dấu rằng một lần refresh đã bắt đầu.
      //Các request khác nhận 401 trong thời gian này sẽ đi vào
      //nhánh hàng đợi đã giải thích ở trên.
      isRefreshing = true;

      try {
        // Gọi bằng instance riêng, không dùng api
        const response = await apiRefresh.post<{
          accessToken: string;
        }>("/auth/refresh-token");

        const newAccessToken = response.data.accessToken;

        if (!newAccessToken) {
          throw new Error("Access token is missing");
        }

        // Cập nhật token trong bộ nhớ
        setAccessToken(newAccessToken);

        // Cho các request đang chờ tiếp tục
        processQueue(null, newAccessToken);

        // Retry request đã gây ra lỗi 401
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại: từ chối toàn bộ request đang chờ
        processQueue(refreshError, null);

        setAccessToken(null);

        //thông báo cho AuthContext biết phiên đăng nhập không thể tiếp tục.
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:session-expired"));
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
}

// Cách sửa tốt: tạo cơ chế báo session hết hạn từ interceptor
// cho AuthContext. Khi refresh thất bại, ứng dụng có thể xóa user,
// xóa token và chuyển về /login. Bạn không cần nhồi toàn bộ logic
// điều hướng vào interceptor ngay lúc này; hãy hoàn thành flow
// refresh cơ bản trước rồi bổ sung cơ chế này.

// Request Interceptor chạy trước khi gửi
// request; Response Interceptor chạy khi nhận response.
// Chính Response Interceptor mới phát hiện lỗi 401 để gọi Refresh API,
// rồi thử lại request ban đầu tối đa một lần thông qua cơ chế _retry.
