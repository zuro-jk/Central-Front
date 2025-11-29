import { productService } from "@/core/services/products/products.service";
import { useQuery } from "@tanstack/react-query";

export function useGetProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });
}

export function useGetFeaturedProductsQuery() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: productService.getFeaturedProducts,
  });
}
