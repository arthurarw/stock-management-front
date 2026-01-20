import axios from "axios";
import { cookies } from "next/headers";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

apiServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies()
  config.headers.Cookie = cookieStore.toString()
  return config;
})

export default apiServer;
