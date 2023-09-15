import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { CartService } from '../../../cart.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userService.userData$.subscribe((userData) => {
      this.isLoggedIn = !!userData;
    });

    this.cartItemCount = 0;

    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });

    // If you want to check the admin role only when the user is logged in, you can add this condition
    if (this.isLoggedIn) {
      this.checkAdminRole();
    }
  }

  getUserDisplayName(): string {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData && userData.name ? `Welcome, ${userData.name}!` : '';
  }

  logout(): void {
    this.userService.clearUserData();
    this.router.navigate(['/']);
  }

  checkAdminRole() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      this.http
        .get('http://localhost:8000/api/admin-panel', { headers })
        .subscribe(
          (response: any) => {
            if (response.status_code === 200) {
              this.isAdmin = true;
            }
          },
          (error) => {
            console.error('Error checking admin role:', error);
          }
        );
    }
  }

}
