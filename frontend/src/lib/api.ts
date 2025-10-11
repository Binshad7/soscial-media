import userAxios from "@/api/userAxios";
import { LoginPayload, RegisterPayload, AuthResponse } from './types';

async function postAuth<T extends LoginPayload | RegisterPayload>(
  url: string,
  payload: T
): Promise<AuthResponse> {
  const { data } = await userAxios.post<AuthResponse>(url, payload);
  console.log(data)
  return data;
}

export const login = (payload: LoginPayload): Promise<AuthResponse> => postAuth("/login", payload);

export const register = (payload: RegisterPayload): Promise<AuthResponse> => postAuth("/register", payload);
