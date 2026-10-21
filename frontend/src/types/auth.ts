export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  tokenType: string;
  user: User;
};

export type AuthContextType = {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};
