"use client";

import api from "@/lib/api";

export default function Page() {
  async function fetchData() {
    const response = await api.get("/categories");
    console.log(response.data);
  }

  async function getLoggedUserTwo() {
    const result = await api.get("/auth/me");
    console.log(result);
  }

  return (
    <>
      <h1>Estou logado</h1>
      <div className="flex flex-col">
        <button onClick={fetchData}>Buscar dados</button>
        <button onClick={getLoggedUserTwo}>Buscar usuário</button>
      </div>
    </>
  );
}
