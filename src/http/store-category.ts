import apiServer from "./api-server";

export async function storeCategory(name: string) {
  await apiServer.post("/categories", { name });
}
