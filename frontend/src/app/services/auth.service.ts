import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:4000/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password })
      .pipe(
        map(response => {
          if (response.success && response.token) {
            // Store token and user info
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
            this.isAuthenticatedSubject.next(true);
          }
          return response;
        }),
        catchError(error => {
          throw { message: error.error?.message || 'Login failed' };
        })
      );
  }

  register(userData: { name: string; email: string; password: string; role?: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/register`, userData)
      .pipe(
        map(response => {
          if (response.success && response.token) {
            // Store token and user info
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
            this.isAuthenticatedSubject.next(true);
          }
          return response;
        }),
        catchError(error => {
          throw { message: error.error?.message || 'Registration failed' };
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private hasToken(): boolean {
    const token = this.getToken();
    return token !== null && token.length > 0;
  }

  // Method to check if token is expired (for future enhancement)
  isTokenExpired(): boolean {
    // In a real application, you would decode the JWT and check expiration
    // For now, we'll assume tokens don't expire in this demo
    return false;
  }
}