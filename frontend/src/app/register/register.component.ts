import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import UserService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService // Inject UserService
  ) { }

  onSubmit() {
    if (this.formData.password.length < 8) {
      this.snackBar.open('Password must be at least 8 characters', 'Close', {
        duration: 5000
      });
      return;
    }

    const apiUrl = 'http://localhost:8000/api/register';

    this.http.post(apiUrl, this.formData)
      .subscribe(
        (response: any) => {
          console.log('Registration successful', response);

          // Store registration data in UserService
          this.userService.setUserData(this.formData);

          // Redirect to the login page
          this.router.navigate(['/login']);

          // Optionally, you can reset the form after successful registration
          this.resetForm();
        },
        (error) => {
          console.error('Registration failed', error);
          this.snackBar.open('Registration failed. Please try again later.', 'Close', {
            duration: 5000
          });
        }
      );
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  }
}
