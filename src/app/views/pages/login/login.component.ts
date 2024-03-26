import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/login-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(username: string, password: string): void {

    console.log('Login', username, password);
    const loginRequest: LoginRequest = { username, password };
    const response = this.authService.login(loginRequest);
    console.log("Response ",response);

      if(response){
        this.router.navigate(['/dashboard']);
      } else {
        alert("Login failed");
        console.log("Login failed");
      }
  }
}

