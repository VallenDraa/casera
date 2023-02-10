import axios from "axios";

const api = axios.create({
  baseURL: `https://casera-api.vercel.app/`,
  withCredentials: true,
});

export default api;
