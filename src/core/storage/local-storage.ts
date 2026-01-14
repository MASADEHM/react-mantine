/**
 * Local Storage Utilities
 * Type-safe localStorage wrapper with JSON support
 */

const STORAGE_PREFIX = "dccj_";

/**
 * Local storage utilities with type safety
 */
export const storage = {
  /**
   * Get an item from localStorage
   * @param key - Storage key
   * @returns Parsed value or null
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  },

  /**
   * Set an item in localStorage
   * @param key - Storage key
   * @param value - Value to store (will be JSON stringified)
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  /**
   * Remove an item from localStorage
   * @param key - Storage key
   */
  remove(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  /**
   * Clear all items with the app prefix
   */
  clearAll(): void {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  },

  /**
   * Check if a key exists
   * @param key - Storage key
   */
  has(key: string): boolean {
    return localStorage.getItem(STORAGE_PREFIX + key) !== null;
  },

  /**
   * Get raw string value (without JSON parsing)
   * @param key - Storage key
   */
  getRaw(key: string): string | null {
    return localStorage.getItem(STORAGE_PREFIX + key);
  },

  /**
   * Set raw string value (without JSON stringifying)
   * @param key - Storage key
   * @param value - String value
   */
  setRaw(key: string, value: string): void {
    localStorage.setItem(STORAGE_PREFIX + key, value);
  },
};

export default storage;
