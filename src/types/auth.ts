// src/types/auth.ts
export type LoginPayload = {
  email: string;
  password: string;
};

// tuỳ API của bạn, tạm để generic
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
