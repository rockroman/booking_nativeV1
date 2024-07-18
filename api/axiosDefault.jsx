import axios from "axios";
import { BASE_URL } from "@env";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default axiosInstance;
export const axiosReq = axiosInstance.create();
export const axiosRes = axiosInstance.create();
