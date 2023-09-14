import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CartService } from '../../../cart.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  // cartItemCount: number = 0; // Initialize with 0
  cartItemCount: number | null = null; // Initialize with null

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService // Inject the CartService
  ) {}

  // ngOnInit() {
  //   this.userService.userData$.subscribe((userData) => {
  //     this.isLoggedIn = !!userData; // Set isLoggedIn to true if userData is available
  //   });

  //   // Subscribe to cartItemCount$ to get cart item count updates
  //   this.cartService.cartItemCount$.subscribe((count) => {
  //     this.cartItemCount = count;
  //   });
  // }
  ngOnInit() {
    this.userService.userData$.subscribe((userData) => {
      this.isLoggedIn = !!userData; // Set isLoggedIn to true if userData is available
    });

    // Initialize cartItemCount to 0
    this.cartItemCount = 0;

    // Subscribe to cartItemCount$ to get cart item count updates
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
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
