'use server';

import { URLSearchParams } from "url";
import apiServer from "./api-server";

export async function getCategories(filters: {
  includeProducts?: boolean;
  offset: number;
  limit: number;
}) {
  const searchParams = new URLSearchParams(
    Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }

      return acc;
    }, {} as Record<string, string>)
  );

  const url = `/categories?${searchParams.toString()}`;

  const { data } = await apiServer.get(url);
  return data.data;
}
