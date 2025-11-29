import { api } from "@/core/api/api";
import type { ApiResponse } from "@/core/types/base/api-response";
import type { ProductResponse } from "@/core/types/products/products.model";

export const productService = {
  async getProducts(): Promise<ApiResponse<ProductResponse[]>> {
    const res = await api.get("products");

    if (!res.data.success) {
      throw new Error(res.data.message || "Error al obtener productos");
    }

    return res.data;
  },

  async getFeaturedProducts(): Promise<ApiResponse<ProductResponse[]>> {
    const res = await api.get("products/featured");

    if (!res.data.success) {
      throw new Error(
        res.data.message || "Error al obtener productos destacados"
      );
    }

    return res.data;
  },
};
