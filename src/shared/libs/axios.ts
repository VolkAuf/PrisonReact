import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "https://67a0bf435bcfff4fabe07668.mockapi.io/crocoApi",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosAuth;
