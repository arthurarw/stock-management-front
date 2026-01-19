"use client";

import { api } from "@/lib/api";

export default function Page() {
  async function fetchData() {
    const response = await api.get("/categories");
    console.log(response.data);
  }

  return (
    <>
      <h1>Estou logado</h1>
      <button onClick={fetchData}>Buscar dados</button>
    </>
  );
}
