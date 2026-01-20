'use server';

import api from "./api";
import { fetchCookies } from "./fetch-cookies";

export async function getMe() {
  const cookies = await fetchCookies();

  const { data } = await api.get("/auth/me", {
    headers: {
      Cookie: cookies
    }
  });

  return data;
}
