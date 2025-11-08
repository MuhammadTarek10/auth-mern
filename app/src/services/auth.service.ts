import { Constants } from "@/common/constants";
import { ApiService } from "./api.service";
import type { ApiResponse, TokenResponse } from "./types";

export class AuthService {
  private static instance: AuthService;
  private readonly apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<ApiResponse<TokenResponse>> {
    const response = await this.apiService.post<TokenResponse>(
      Constants.AUTH_ENDPOINTS.SIGN_IN,
      {
        email,
        password,
      }
    );

    return response;
  }

  public async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse<TokenResponse>> {
    const response = await this.apiService.post<TokenResponse>(
      Constants.AUTH_ENDPOINTS.SIGN_UP,
      { name, email, password }
    );

    return response;
  }

  public async refreshToken(): Promise<ApiResponse<TokenResponse>> {
    const response = await this.apiService.post<TokenResponse>(
      Constants.AUTH_ENDPOINTS.REFRESH_TOKEN
    );

    return response;
  }

  public async signOut(): Promise<ApiResponse<void>> {
    const response = await this.apiService.post<void>(
      Constants.AUTH_ENDPOINTS.SIGN_OUT
    );

    return response;
  }
}

export const authService = AuthService.getInstance();
