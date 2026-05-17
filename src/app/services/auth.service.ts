import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Backend API Base URLm
  apiUrl = 'https://expense-backend-m5ff.onrender.com/api/auth';

  constructor(private http: HttpClient) { }

  // Register API
  register(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );
  }

  // Login API
  login(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }

  // Save Login Session
  saveUser(data: any) {

    localStorage.setItem(
      'expenseUser',
      JSON.stringify(data)
    );

    localStorage.setItem(
      'token',
      data.token
    );
  }

  // Check Login Status
  isLoggedIn(): boolean {
    return localStorage.getItem('expenseUser') != null;
  }

  // Logout
  logout() {

    localStorage.removeItem('expenseUser');
    localStorage.removeItem('token');
  }

  // Get Logged User
  getUser() {
    return JSON.parse(
      localStorage.getItem('expenseUser') || '{}'
    );
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
