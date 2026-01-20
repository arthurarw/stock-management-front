'use server';

import { GetCategoriesParams } from "@/interfaces/category";
import apiServer from "./api-server";

export async function getCategories(params: GetCategoriesParams) {
  const { data } = await apiServer.get('/categories', {
    params
  });
  return data.data;
}
