export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
