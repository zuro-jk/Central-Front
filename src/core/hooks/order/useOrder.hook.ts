import { orderService } from "@/core/services/order/order.service";
import type {
  AssignDriverRequest,
  OrderRequest,
  PaymentInOrderRequest,
  UpdateLocationRequest,
  UpdateStatusRequest,
} from "@/core/types/order/order.model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (lang: string, type?: string) =>
    [...orderKeys.lists(), { lang, type }] as const,
  myOrders: (lang: string) => [...orderKeys.all, "me", { lang }] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: number, lang: string) =>
    [...orderKeys.details(), id, { lang }] as const,
  tracking: (id: number, lang: string) =>
    [...orderKeys.all, "tracking", id, { lang }] as const,
};

export function useGetAllOrdersQuery(lang = "es", type?: string) {
  return useQuery({
    queryKey: orderKeys.list(lang, type),
    queryFn: () => orderService.getAllOrders(lang, type),
  });
}

export function useGetOrderByIdQuery(id: number, lang = "es") {
  return useQuery({
    queryKey: orderKeys.detail(id, lang),
    queryFn: () => orderService.getOrderById(id, lang),
    enabled: !!id, // Solo se ejecuta si hay ID
  });
}

export function useGetOrderTrackingQuery(id: number, lang = "es") {
  return useQuery({
    queryKey: orderKeys.tracking(id, lang),
    queryFn: () => orderService.getOrderTracking(id, lang),
    enabled: !!id,
    refetchInterval: 10000,
  });
}

export function useGetMyOrdersQuery(lang = "es") {
  return useQuery({
    queryKey: orderKeys.myOrders(lang),
    queryFn: () => orderService.getMyOrders(lang),
  });
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { data: OrderRequest; lang?: string }) =>
      orderService.createOrder(params.data, params.lang),
    onSuccess: () => {
      // Invalidar listas de ordenes para que se refresquen
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.myOrders("es") }); // Ajustar idioma si es dinámico
    },
  });
}

export function useCreatePosSaleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { data: OrderRequest; lang?: string }) =>
      orderService.createPosSale(params.data, params.lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

export function useUpdateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: number; data: OrderRequest; lang?: string }) =>
      orderService.updateOrder(params.id, params.data, params.lang),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id, variables.lang || "es"),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

export function useCancelOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: number; lang?: string }) =>
      orderService.cancelOrder(params.id, params.lang),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id, variables.lang || "es"),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: orderKeys.myOrders(variables.lang || "es"),
      });
    },
  });
}

export function useUpdateOrderStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      id: number;
      data: UpdateStatusRequest;
      lang?: string;
    }) => orderService.updateOrderStatus(params.id, params.data, params.lang),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id, variables.lang || "es"),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

export function useAssignDriverMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      id: number;
      data: AssignDriverRequest;
      lang?: string;
    }) => orderService.assignDriver(params.id, params.data, params.lang),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id, variables.lang || "es"),
      });
    },
  });
}

export function useAddLocalPaymentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: number; data: PaymentInOrderRequest }) =>
      orderService.addLocalPayment(params.id, params.data),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_, __) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.details() });
    },
  });
}

export function useUpdateDeliveryLocationMutation() {
  return useMutation({
    mutationFn: (params: { id: number; data: UpdateLocationRequest }) =>
      orderService.updateDeliveryLocation(params.id, params.data),
  });
}

export function useDeleteOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => orderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

export function useDownloadInvoiceMutation() {
  return useMutation({
    mutationFn: (id: number) => orderService.downloadInvoice(id),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `comprobante.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });
}
