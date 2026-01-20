import apiServer from "./api-server";

export async function updateCategory(id: string, name: string) {
  await apiServer.put(`/categories/${id}`, { name });
}
