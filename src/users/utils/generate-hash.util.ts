import { hash, compare } from 'bcrypt';

export const generateHash = (password: string): Promise<string> => {
  return hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
