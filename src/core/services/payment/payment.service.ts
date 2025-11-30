import { api } from "@/core/api/api";
import type { ApiResponse } from "@/core/types/base/api-response";
import type {
  NiubizConfirmRequest,
  NiubizStartRequest,
  NiubizStartResponse,
  PaymentUpdateRequest,
} from "@/core/types/payment/niubiz.model";
import type { PaymentResponse } from "@/core/types/payment/payment.model";

export const paymentService = {
  async getAllPayments(filters?: {
    customerId?: number;
    paymentMethodId?: number;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<PaymentResponse[]>> {
    const res = await api.get<ApiResponse<PaymentResponse[]>>("/payments", {
      params: filters,
    });
    return res.data;
  },

  async getPaymentById(id: number): Promise<ApiResponse<PaymentResponse>> {
    const res = await api.get<ApiResponse<PaymentResponse>>(`/payments/${id}`);
    return res.data;
  },

  async startNiubizPayment(
    data: NiubizStartRequest
  ): Promise<ApiResponse<NiubizStartResponse>> {
    const res = await api.post<ApiResponse<NiubizStartResponse>>(
      "/payments/niubiz/start",
      data
    );

    if (!res.data.success) {
      throw new Error(
        res.data.message || "Error al iniciar sesión de pago con Niubiz"
      );
    }

    return res.data;
  },

  async confirmNiubizPayment(
    data: NiubizConfirmRequest
  ): Promise<ApiResponse<PaymentResponse>> {
    const res = await api.post<ApiResponse<PaymentResponse>>(
      "/payments/niubiz/confirm",
      data
    );

    if (!res.data.success) {
      throw new Error(
        res.data.message || "Error al confirmar el pago con Niubiz"
      );
    }

    return res.data;
  },

  async updatePayment(
    id: number,
    data: PaymentUpdateRequest
  ): Promise<ApiResponse<PaymentResponse>> {
    const res = await api.put<ApiResponse<PaymentResponse>>(
      `/payments/${id}`,
      data
    );
    return res.data;
  },

  async deletePayment(id: number): Promise<ApiResponse<void>> {
    const res = await api.delete<ApiResponse<void>>(`/payments/${id}`);
    return res.data;
  },
};
