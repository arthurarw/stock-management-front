import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? undefined;
}

export async function clearToken() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
