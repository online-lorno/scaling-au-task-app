export type AuthState = {
  isAuthenticated: boolean;
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

export type RegisterParams = {
  email: string;
  password: string;
};

export type CreateTaskParams = {
  title: string;
};

export type UpdateTaskParams = {
  title?: string;
  isCompleted?: boolean;
};

export type GetWeatherParams = {
  lat: number | null;
  lon: number | null;
};
