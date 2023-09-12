import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.userData$.subscribe(userData => {
      this.isLoggedIn = !!userData; // Set isLoggedIn to true if userData is available
    });
  }

  getUserDisplayName(): string {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData && userData.name ? `Welcome, ${userData.name}!` : '';
  }

  logout(): void {
    this.userService.clearUserData(); // Clear user data
    // Perform logout actions (e.g., clear user data)
    // Then navigate to the logout route
    this.router.navigate(['/']);
  }
}
