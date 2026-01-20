"use server";

import apiServer from "@/http/api-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/');
  }

  await apiServer.post("/auth/logout");
  cookieStore.delete('access_token');
  redirect('/');
}
