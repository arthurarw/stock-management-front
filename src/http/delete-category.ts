import apiServer from "./api-server";

export async function deleteCategory(id: string) {
  await apiServer.delete(`/categories/${id}`);
}
