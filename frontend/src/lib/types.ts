export type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
};

export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
  userId: number;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};
