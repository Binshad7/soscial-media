import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, 10);
export const comparePassowrd = async (plainPassword: string, hasePassowrd: string): Promise<boolean> => await bcrypt.compare(plainPassword, hasePassowrd);