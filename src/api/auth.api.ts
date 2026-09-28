import apiClient from "./apiClient";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";

export async function login(
  credentials: LoginRequest
): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>(
    "/Users/login",
    credentials
  );

  return response.data;
}

export async function register(credentials: RegisterRequest): Promise<void> {
  await apiClient.post("/Users/register", credentials);
}
