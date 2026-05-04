import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = typeof window === 'undefined' 
  ? (process.env.API_URL || "http://ticket-booking-api:3001") 
  : "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const requestId = uuidv4();
  config.headers["x-request-id"] = requestId;
  return config;
});

export default axiosInstance;
