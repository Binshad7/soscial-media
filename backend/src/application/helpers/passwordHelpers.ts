import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, 10);
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => await bcrypt.compare(plainPassword, hashedPassword);