import axios, { AxiosRequestConfig } from "axios";
import { HTTP_CONFIG } from "./config";

export const httpClient = () => {
  const axiosInstance = axios.create(HTTP_CONFIG);
  const token = localStorage.getItem("token") || '';
  const defaultOptions = token
    ? {
        headers: {
          Authorization: token,
        },
      }
    : {};

  return {
    get: (url: string, options?: AxiosRequestConfig) =>
      axiosInstance.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data: any, options?: AxiosRequestConfig) =>
      axiosInstance.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data: any, options?: AxiosRequestConfig) =>
      axiosInstance.put(url, data, { ...defaultOptions, ...options }),
    delete: (url: string,  options?: AxiosRequestConfig) =>
      axiosInstance.delete(url, { ...defaultOptions, ...options }),
  };
};
