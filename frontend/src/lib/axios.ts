import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_USER_MODE === "not-production"
      ? "/api"
      : "http://localhost:5001/api",
});

export default axiosInstance;
