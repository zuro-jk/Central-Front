export interface BaseApiResponse {
  success: boolean;
  message: string;
}

export interface ApiResponse<T> extends BaseApiResponse {
  data: T;
}

export interface ValidationError {
  defaultMessage: string;
  field?: string;
  objectName?: string;
  code?: string;
}

export interface ApiError extends BaseApiResponse {
  status?: number;
  data?: null;
  errors?: ValidationError[];
}
