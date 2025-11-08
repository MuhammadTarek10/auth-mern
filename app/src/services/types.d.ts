export class ApiResponse<T> {
  data: T;
  message: string;
  error: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
