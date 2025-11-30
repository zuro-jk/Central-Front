// ==========================================
// SUB-TYPES (Usados dentro de otros objetos)
// ==========================================

export interface OrderDetailInOrderResponse {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderStatusStepResponse {
  code: string;
  name: string;
  step: number;
}

// ==========================================
// REQUESTS (Lo que envías al Backend)
// ==========================================

export interface OrderDetailRequest {
  productId: number;
  quantity: number;
}

export interface DeliveryAddressRequest {
  street: string;
  reference?: string;
  city?: string;
  province?: string;
  zipCode?: string;
  instructions?: string;
  latitude: number;
  longitude: number;
}

export interface PaymentInOrderRequest {
  paymentMethodId: number;
  amount: number;
  isOnline: boolean;
  transactionCode?: string;
  status?: string;
}

export interface DocumentRequest {
  type: string;
  number?: string;
}

export interface OrderRequest {
  customerId?: number | null;
  employeeId?: number;

  statusId: number;
  typeId: number;

  tableId?: number;
  pickupStoreId?: number;
  deliveryAddress?: DeliveryAddressRequest;

  details: OrderDetailRequest[];
  payments?: PaymentInOrderRequest[];
  documents?: DocumentRequest[];
}

export interface AssignDriverRequest {
  employeeId: number;
}

export interface UpdateLocationRequest {
  latitude: number;
  longitude: number;
}

export interface UpdateStatusRequest {
  newStatusCode: string;
}

export interface OrderResponse {
  id: number;

  customerId: number;
  customerName: string;
  employeeId?: number;
  employeeName?: string;

  deliveryStreet?: string;
  deliveryReference?: string;
  deliveryCity?: string;
  deliveryInstructions?: string;
  deliveryProvince?: string;
  deliveryZipCode?: string;
  deliveryLatitude?: number;
  deliveryLongitude?: number;

  tableId?: number;
  tableCode?: string;

  pickupStoreId?: number;
  pickupStoreName?: string;
  pickupStoreAddress?: string;

  estimatedTime?: number;
  estimatedDistance?: string;
  estimatedDuration?: string;
  currentLatitude?: number;
  currentLongitude?: number;

  date: string;
  statusId: number;
  statusCode: string;
  statusName: string;

  typeId: number;
  typeName: string;

  total: number;

  details: OrderDetailInOrderResponse[];
  timelineSteps: OrderStatusStepResponse[];
}
