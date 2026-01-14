import type { ILoginRequest, ILoginResponse } from "@/interfaces/login.interface";
import tokenService from "./token.service";

/**
 * Login Service
 * Handles authentication API calls
 */
class LoginService {
  async login(credentials: ILoginRequest): Promise<ILoginResponse> {
    // For mock/development - replace with actual API call
    // const response = await axios.post(`${API_URL}/auth/login`, credentials);
    // return response.data;

    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "user-001",
            email: credentials.email,
            firstName: "Ahmed",
            lastName: "Al Rashid",
            phone: "+971501234567",
            role: "consultant",
            isVerified: true,
          },
          accessToken: "mock-jwt-token-" + Date.now(),
          refreshToken: "mock-refresh-token-" + Date.now(),
          expiresIn: 3600,
        });
      }, 1000);
    });
  }

  setToken(token: string): void {
    tokenService.setToken(token);
  }

  logout(): void {
    tokenService.removeToken();
  }

  isLoggedIn(): boolean {
    return tokenService.LoggedIn();
  }
}

export const Loginservice = new LoginService();
export default Loginservice;
