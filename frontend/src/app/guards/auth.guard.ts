import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      // Token is present, consider user as authenticated
      return true;
    } else if (!this.userService.isAuthenticated()) {
      // If UserService isAuthenticated method also returns false (no UserData)
      // Redirect to login page or handle unauthorized access
      this.router.navigate(['/login']);
      return false;
    }

    // User is authenticated according to UserService
    return true;
  }
}
