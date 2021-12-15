export interface GenericAPIResponse<T> {
  error: boolean;
  success: boolean;
  data: T;
  message?: string;
}
