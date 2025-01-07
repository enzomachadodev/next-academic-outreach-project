export interface ActionResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}
