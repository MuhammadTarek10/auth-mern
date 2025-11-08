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
}

export const authService = AuthService.getInstance();
