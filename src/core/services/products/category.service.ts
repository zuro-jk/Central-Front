import { api } from "@/core/api/api";
import type { ApiResponse } from "@/core/types/base/api-response";
import type { CategoryResponse } from "@/core/types/products/category.model";

export const categoryService = {
  async getCategories(): Promise<ApiResponse<CategoryResponse[]>> {
    const res = await api.get("categories");
    if (!res.data.success) {
      throw new Error(res.data.message || "Error al obtener categorías");
    }
    return res.data;
  },
};
