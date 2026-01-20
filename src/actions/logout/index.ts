"use server";

import api from "@/http/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/');
  }

  const response = await api.post("/auth/logout");

  console.log("Logout response:", response);

  console.log("Clearing access token cookie and redirecting...");

  cookieStore.delete('access_token');
  redirect('/');
}
