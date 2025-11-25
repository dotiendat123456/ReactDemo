// src/types/auth.ts
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message?: string;
  token?: string;
  access_token?: string;
  data?: {
    token?: string;
    user?: any;
  };
  user?: any;
};
