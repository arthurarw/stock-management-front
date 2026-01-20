'use server'

import api from "@/lib/api";

export async function getLoggedUser() {
  let response;

  try {
    response = await api.get("/auth/me");
  } catch {
    return { error: 'Erro ao tentar fazer login. Por favor, tente novamente.' };
  }

  return { user: response.data };
}
