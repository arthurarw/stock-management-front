'use server'

import api from "@/lib/api";
import { LoginSchema, loginSchema } from "@/lib/validators/auth/login-schema";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginSchema) {
  const parsedData = loginSchema.safeParse(data);
  if (!parsedData.success) {
    return { error: parsedData.error.flatten().fieldErrors };
  }

  let response;

  try {
    response = await api.post("/auth/login", parsedData.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data.error || 'Erro ao fazer login.' };
    }

    return { error: 'Erro ao tentar fazer login. Por favor, tente novamente.' };
  }

  const cookieStore = await cookies();
  await cookieStore.set('access_token', response.data.data.token, {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  redirect("/dashboard");
}
