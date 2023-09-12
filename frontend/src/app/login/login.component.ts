//

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import the UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService // Inject the UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.http.post('http://localhost:8000/api/login', credentials).subscribe(
      (response: any) => {
        this.userService.setUserData(response.user); // Update user data using the service
        this.router.navigateByUrl('/'); // Navigate to home page
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
