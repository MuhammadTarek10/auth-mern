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

  private constructor() {
    // Create an Axios instance for use as the client
    this.client = axios.create({
      baseURL: `${Constants.API_URL}/api/${Constants.API_VERSION}`,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en-US",
      },
    });
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

      // Extract error message from backend response
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

    // Handle non-axios errors
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

  public async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
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
