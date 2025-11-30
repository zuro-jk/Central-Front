export const PaymentStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  CANCELLED: "CANCELLED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export interface PaymentResponse {
  id: number;
  orderId: number;
  paymentMethodId: number;
  paymentMethodName: string;
  customerName: string;
  amount: number;
  date: string;
  isOnline: boolean;
  transactionCode: string | null;
  provider: string;
  status: PaymentStatus; 
}
