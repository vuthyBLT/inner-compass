import type { User, UserCredential } from "firebase/auth";

export type LoginCredentials = {
  email: string;
  password?: string;
};

export type SignUpCredentials = {
  email: string;
  password?: string;
  confirmPassword?: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (credentials: SignUpCredentials) => Promise<UserCredential>;
  logIn: (credentials: LoginCredentials) => Promise<UserCredential>;
  logOut: () => Promise<void>;
};

export type EnneagramType = {
  id: string;
  name: string;
  description: string;
};
