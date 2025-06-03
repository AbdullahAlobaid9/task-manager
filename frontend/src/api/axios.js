import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token logic
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // If 401 and retry not already attempted
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post(
          "http://localhost:8000/api/users/token/refresh/",
          {
            refresh,
          }
        );
        localStorage.setItem("access", res.data.access);

        original.headers.Authorization = `Bearer ${res.data.access}`;
        return axios(original);
      } catch (refreshErr) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
