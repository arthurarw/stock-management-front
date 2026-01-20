import { getCategories } from "@/http/get-categories";
import { GetCategoriesParams } from "@/interfaces/category";
import { useQuery } from "@tanstack/react-query";

export function useCategories(params: GetCategoriesParams) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () =>
      getCategories(params),
  });
}
