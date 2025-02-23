import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setBearer = (token: string) => {
  axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosAuth;
