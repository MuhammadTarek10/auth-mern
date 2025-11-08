export interface TokenPayload {
  id: string;
  email: string;
  sessionId?: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  sessionId: string;
  refreshToken: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export interface UserWithSession extends User {
  sessionId: string;
}
