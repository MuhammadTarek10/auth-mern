import { Constants } from "@/common/constants";
import axios, { AxiosError, type AxiosInstance } from "axios";
import type { ApiResponse } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiService {
  private static instance: ApiService;
  private readonly client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  private constructor() {
    this.client = axios.create({
      baseURL: `${Constants.API_URL}/api/${Constants.API_VERSION}`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en-US",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        const isRefreshEndpoint = originalRequest.url?.includes(
          Constants.AUTH_ENDPOINTS.REFRESH_TOKEN
        );

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isRefreshEndpoint
        ) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push(() => {
                resolve(this.client(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            await this.client.post(Constants.AUTH_ENDPOINTS.REFRESH_TOKEN);

            this.isRefreshing = false;
            this.onRefreshSuccess();

            return this.client(originalRequest);
          } catch (refreshError) {
            this.isRefreshing = false;
            this.refreshSubscribers = [];

            window.dispatchEvent(new CustomEvent("auth:logout"));

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private onRefreshSuccess() {
    this.refreshSubscribers.forEach((callback) => callback("refreshed"));
    this.refreshSubscribers = [];
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;

      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "An unexpected error occurred";

      throw new ApiError(
        errorMessage,
        axiosError.response?.status,
        axiosError.response?.data
      );
    }

    if (error instanceof Error) {
      throw new ApiError(error.message);
    }

    throw new ApiError("An unexpected error occurred");
  }

  public async get<T>(
    url: string,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url, { params: queryParams });
      return response.data as ApiResponse<T>;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data as ApiResponse<T>;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async put<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data);
      return response.data as ApiResponse<T>;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url);
      return response.data as ApiResponse<T>;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async patch<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(url, data);
      return response.data as ApiResponse<T>;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const apiService = ApiService.getInstance();
