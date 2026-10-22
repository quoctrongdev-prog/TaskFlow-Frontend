import axios from "axios";

// import dotenv from "dotenv";

// dotenv.config();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Axios sẽ tự xác định kiểu dữ liệu của request.
//headers: {
//   "Content-Type": "application/json",
// },
const api = axios.create({
  baseURL: API_URL,
  //credentials: true để xử lý httpOnly refreshToken
  //nên frontend phải cho phép browser gửi/nhận cookie.
  withCredentials: true,
});

const apiAuth = axios.create({
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

// const apiUser = axios.create({
//   baseURL: `${API_URL}/users`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Dùng một Axios instance riêng để gọi /refresh-token.
// Không dùng `api` ở đây để tránh interceptor tự bắt chính request refresh.

const apiRefresh = axios.create({
  // baseURL: `${API_URL}/auth/refresh-token`,
  baseURL: API_URL,
  withCredentials: true,
});

export { api, apiAuth, apiMail, apiRefresh };
