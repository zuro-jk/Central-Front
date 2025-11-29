import { categoryService } from "@/core/services/products/category.service";
import { productService } from "@/core/services/products/products.service";
import { useQuery } from "@tanstack/react-query";

export function useMenuData() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
  });

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  const isLoading = categoriesQuery.isLoading || productsQuery.isLoading;

  const isError = categoriesQuery.isError || productsQuery.isError;
  const error = categoriesQuery.error || productsQuery.error;

  return {
    categories: categoriesQuery.data,
    products: productsQuery.data,
    isLoading,
    isError,
    error,
  };
}
