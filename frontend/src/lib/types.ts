// lib/types.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface userPayload {
  name?: string,
  email?: string
}
export interface AuthResponse {
  message: string;
  user: userPayload
}