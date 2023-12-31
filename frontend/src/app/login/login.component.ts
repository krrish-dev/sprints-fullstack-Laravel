import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import UserService
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
    private userService: UserService // Inject UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Pre-fill the login form with registration data if available
    const registrationData = this.userService.getUserData();
    if (registrationData) {
      this.loginForm.patchValue({
        email: registrationData.email,
        password: registrationData.password
      });
    }
  }

  login() {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.http.post('http://localhost:8000/api/login', credentials).subscribe(
      (response: any) => {
        this.userService.setUserData(response.user);
        localStorage.setItem('token', response.token);

        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error('Login error:', error);
        this.snackBar.open('Invalid email or password. Please try again.', 'Close', {
          duration: 5000
        });
      }
    );
  }
}
