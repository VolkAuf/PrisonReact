import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.MOCK_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
