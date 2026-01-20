'use server';

import apiServer from "./api-server";

export async function getMe() {
  const { data } = await apiServer.get("/auth/me").then(res => res).catch(err => err.response);

  return data;
}
