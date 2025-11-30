import { categoryService } from "@/core/services/products/category.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
  })
}