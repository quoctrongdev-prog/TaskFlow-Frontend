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

export { api, apiMail, apiUser };
