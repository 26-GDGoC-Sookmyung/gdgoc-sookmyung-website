export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
};

export class ApiError extends Error {
  code: string;
  status: number;
  data: unknown;

  constructor({
    code,
    data = null,
    message,
    status,
  }: {
    code: string;
    data?: unknown;
    message: string;
    status: number;
  }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.data = data;
  }
}
