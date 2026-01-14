/**
 * Token Storage Service
 * Manages authentication tokens using localStorage
 */

const TOKEN_KEY = "dccj_auth_token";
const REFRESH_TOKEN_KEY = "dccj_refresh_token";

/**
 * Token storage utilities
 */
export const tokenStorage = {
  /**
   * Get the access token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Set the access token
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Get the refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Set the refresh token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Set both tokens at once
   */
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Check if user is logged in (has a token)
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  /**
   * Check if the token is expired (JWT only)
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decode JWT payload (base64)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= exp;
    } catch {
      return true;
    }
  },

  /**
   * Get token expiration time in milliseconds
   */
  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000;
    } catch {
      return null;
    }
  },
};

export default tokenStorage;
