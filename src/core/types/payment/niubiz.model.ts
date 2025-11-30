export interface NiubizStartRequest {
  orderId: number;
  amount: number;
}

export interface NiubizStartResponse {
  sessionKey: string;
  merchantId: string;
  purchaseNumber: string;
  amount: number;
}

export interface NiubizConfirmRequest {
  transactionToken: string;
  purchaseNumber: string;
  amount: number;
}

export interface PaymentUpdateRequest {
  transactionCode?: string;
  status?: string;
}
