// lib/types.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface userPayload {
  username?: string,
  email?: string
}
export interface AuthResponse {
  message: string;
  user: userPayload
}