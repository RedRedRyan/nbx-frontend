// lib/api/api-service.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Service for communicating with the backend API
 */
class ApiService {
  private static instance: ApiService;
  private token: string | null = null;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Set the authentication token for API requests
   */
  public setToken(token: string): void {
    this.token = token;
  }

  /**
   * Clear the authentication token
   */
  public clearToken(): void {
    this.token = null;
  }

  /**
   * Get the authentication token
   */
  public getToken(): string | null {
    return this.token;
  }

  /**
   * Create a new user account
   */
  public async createUser(username: string, password: string, accountType?: string): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, {
        username,
        password,
        accountType,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Login a user
   */
  public async login(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  /**
   * Get user details
   */
  public async getUser(username: string): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  /**
   * Update user password
   */
  public async updateUser(username: string, password: string): Promise<any> {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${username}`, {
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Sign a transaction using the user's private key
   */
  public async signTransaction(
    username: string,
    transaction: string,
    password: string
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/${username}/sign-transaction`,
        {
          transaction,
          password,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }
}

export default ApiService;
