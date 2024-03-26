import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { JwtAuthenticationResponse } from '../models/jwt-authentication-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private apiUrl = 'http://localhost:8080';
  private authSecretKey = 'Bearer Token';

  constructor(private http: HttpClient) { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }
  
  login(loginRequest: LoginRequest): boolean {
    const formData = new FormData();
    formData.append('username', loginRequest.username);
    formData.append('password', loginRequest.password);
    const response = this.http.post<JwtAuthenticationResponse>(`${this.apiUrl}/login`, formData);
    if(response){
      console.log("Setting session storage");
    response.subscribe(response => {
    sessionStorage.setItem(this.authSecretKey, response.token);
    sessionStorage.setItem('refreshToken', response.refreshToken);
    this.isAuthenticated = true;
    });
  }
    return true;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    sessionStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    console.log("User logged out");
    window.location.reload();
  }
}
