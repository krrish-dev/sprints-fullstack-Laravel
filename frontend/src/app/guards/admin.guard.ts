import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isAuthenticated() && this.userService.isAdmin()) {
      return true;
    } else {
      // Redirect to a restricted access page or the home page
      this.router.navigate(['/']);
      return false;
    }
  }
}
