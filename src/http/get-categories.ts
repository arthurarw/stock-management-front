'use server';

import apiServer from "./api-server";

export async function getCategories() {
  const { data } = await apiServer.get("/categories");
  return data.data;
}
