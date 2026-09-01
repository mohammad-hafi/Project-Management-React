const ACCESS_TOKEN_KEY = "accessToken";

export function getAccessToken(): string | null {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken(): void {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  
}

export function logout(): void {
  removeAccessToken();
}