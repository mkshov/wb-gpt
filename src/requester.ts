import { API_URL } from "@/lib/constants";
import axios from "axios";
import { getCookie } from "cookies-next";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor
API.interceptors.request.use(
  async function (config) {
    const token = getCookie("__wbp_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error && error.response && error.response.status === 401) {
      console.log("Ошибка авторизации");
      window.location.href = "/sign-in";
      throw new Error("Ошибка авторизации");
    }
    if (error && error.response && error.response.status >= 500) {
      console.log("Ошибка сервера");
      throw new Error("Ошибка сервера");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default API;
