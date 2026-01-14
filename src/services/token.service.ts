/**
 * Token Service
 * Manages authentication tokens using localStorage
 */

const TOKEN_KEY = "dubai_portal_auth_token";
const REFRESH_TOKEN_KEY = "dubai_portal_refresh_token";

class TokenService {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  LoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decode JWT to check expiration (simplified - doesn't verify signature)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= exp;
    } catch {
      return true;
    }
  }
}

export default new TokenService();
