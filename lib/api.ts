import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response && error.response.status === 401) {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
        });
      } catch { }

      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;
