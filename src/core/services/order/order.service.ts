import { api } from "@/core/api/api";
import type { ApiResponse } from "@/core/types/base/api-response";
import type {
  AssignDriverRequest,
  OrderRequest,
  OrderResponse,
  PaymentInOrderRequest,
  UpdateLocationRequest,
  UpdateStatusRequest,
} from "@/core/types/order/order.model"; 

export const orderService = {
  async getAllOrders(
    lang = "es",
    type?: string
  ): Promise<ApiResponse<OrderResponse[]>> {
    const res = await api.get<ApiResponse<OrderResponse[]>>("/orders", {
      headers: { "Accept-Language": lang },
      params: { type },
    });
    return res.data;
  },

  async getOrderById(
    id: number,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.get<ApiResponse<OrderResponse>>(`/orders/${id}`, {
      headers: { "Accept-Language": lang },
    });
    return res.data;
  },

  async getOrderTracking(
    id: number,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.get<ApiResponse<OrderResponse>>(
      `/orders/${id}/tracking`,
      {
        headers: { "Accept-Language": lang },
      }
    );
    return res.data;
  },

  async getMyOrders(lang = "es"): Promise<ApiResponse<OrderResponse[]>> {
    const res = await api.get<ApiResponse<OrderResponse[]>>("/orders/me", {
      headers: { "Accept-Language": lang },
    });
    return res.data;
  },

  async downloadInvoice(id: number): Promise<Blob> {
    const res = await api.get(`/orders/${id}/download-invoice`, {
      responseType: "blob", 
    });
    return res.data;
  },

  async createOrder(
    data: OrderRequest,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.post<ApiResponse<OrderResponse>>("/orders", data, {
      headers: { "Accept-Language": lang },
    });
    return res.data;
  },

  async createPosSale(
    data: OrderRequest,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.post<ApiResponse<OrderResponse>>(
      "/orders/pos/sale",
      data,
      {
        headers: { "Accept-Language": lang },
      }
    );
    return res.data;
  },

  async addLocalPayment(
    id: number,
    data: PaymentInOrderRequest
  ): Promise<ApiResponse<void>> {
    const res = await api.post<ApiResponse<void>>(
      `/orders/${id}/payments/local`,
      data
    );
    return res.data;
  },

  async updateDeliveryLocation(
    id: number,
    data: UpdateLocationRequest
  ): Promise<ApiResponse<void>> {
    const res = await api.post<ApiResponse<void>>(
      `/orders/${id}/location`,
      data
    );
    return res.data;
  },

  async updateOrder(
    id: number,
    data: OrderRequest,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.put<ApiResponse<OrderResponse>>(
      `/orders/${id}`,
      data,
      {
        headers: { "Accept-Language": lang },
      }
    );
    return res.data;
  },

  async cancelOrder(
    id: number,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.put<ApiResponse<OrderResponse>>(
      `/orders/${id}/cancel`,
      {},
      {
        headers: { "Accept-Language": lang },
      }
    );
    return res.data;
  },

  async updateOrderStatus(
    id: number,
    data: UpdateStatusRequest,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.put<ApiResponse<OrderResponse>>(
      `/orders/${id}/status`,
      data,
      {
        headers: { "Accept-Language": lang },
      }
    );
    return res.data;
  },

  async assignDriver(
    id: number,
    data: AssignDriverRequest,
    lang = "es"
  ): Promise<ApiResponse<OrderResponse>> {
    const res = await api.put<ApiResponse<OrderResponse>>(
      `/orders/${id}/assign-driver`,
      data,
      {
        headers: { "Accept-Language": lang },
      }
    );
    return res.data;
  },

  async deleteOrder(id: number): Promise<ApiResponse<void>> {
    const res = await api.delete<ApiResponse<void>>(`/orders/${id}`);
    return res.data;
  },
};
