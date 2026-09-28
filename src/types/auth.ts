export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  description: string;
  email: string;
  department: string;
  password: string;
  jobTitle: string;
  statusId: number;
}
