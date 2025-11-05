import userAxios from "@/api/userAxios";
import { LoginPayload, RegisterPayload, AuthResponse } from './types';

async function postAuth<T extends LoginPayload | RegisterPayload>(
  url: string,
  payload: T
): Promise<AuthResponse> {
  const response = await userAxios.post<AuthResponse>(url, payload);
  console.log('log from the api lib', response)
  return response.data;
}

export const login = (payload: LoginPayload): Promise<AuthResponse> => postAuth("/login", payload);

export const register = (payload: RegisterPayload): Promise<AuthResponse> => postAuth("/register", payload);
