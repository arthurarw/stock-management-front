'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/');
  }

  return cookieStore.toString();
}
