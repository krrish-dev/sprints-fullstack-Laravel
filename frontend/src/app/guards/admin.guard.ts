// admin.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators'; // Import the 'take' operator

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let isAdmin = false;

    this.authService.isAdmin$
      .pipe(take(1)) // Take one value and unsubscribe
      .subscribe((value) => {
        isAdmin = value;
      });

    if (isAdmin) {
      return true; // User has admin privileges, allow access
    } else {
      this.router.navigate(['/home']); // Redirect to the home page if not an admin
      return false;
    }
  }
}
