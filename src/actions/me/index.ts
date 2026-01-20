"use server";

import { ApiResponse } from "@/interfaces/response";
import { User } from "@/interfaces/users";
import api from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getLoggedUser(): Promise<ApiResponse<User>> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/');
  }

  const response = await api.get("/auth/me", {
    headers: {
      Cookie: cookieStore.toString(),
    }
  });

  return response.data;
}
