export interface TokenPayload {
  id: string;
  email: string;
  sessionId: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}
