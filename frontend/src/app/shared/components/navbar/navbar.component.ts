import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from '../../../cart.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  authUser: boolean = false; // Variable to check if the user is authenticated
  cartItemCount: number | null = null;
  isAdmin: boolean = false;
  hideCartAndOrdersButtons: boolean = false;
  adminPage: boolean = false; // Variable to check if you're on an admin page

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userService.userData$.subscribe((userData) => {
      this.isLoggedIn = !!userData;
      this.authUser = this.isLoggedIn;

      // Check if userData contains a role property and if it equals 'admin'
      this.isAdmin = userData && userData.role === 'admin';
    });

    this.cartItemCount = 0;

    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });

  
 // Check the current route and set the adminPage flag
 this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    this.adminPage = this.activatedRoute.snapshot.children.some(
      (route) => route.routeConfig?.path === 'admin'
    );
  }
});

  }



  // ngOnInit() {
  //   this.userService.userData$.subscribe((userData) => {
  //     this.isLoggedIn = !!userData;
  //     this.authUser = this.isLoggedIn; // Set authUser based on isLoggedIn

  //     // Check if userData contains a role property and if it equals 'admin'
  //     this.isAdmin = userData && userData.role === 'admin';
  //   });

  //   this.cartItemCount = 0;

  //   this.cartService.cartItemCount$.subscribe((count) => {
  //     this.cartItemCount = count;
  //   });
  // }



  getUserDisplayName(): string {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData && userData.name ? `Welcome, ${userData.name}!` : '';
  }

  logout(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      // Send a POST request to the logout endpoint with the token
      this.http.post('http://localhost:8000/api/logout', null, { headers }).subscribe(
        () => {
          // Clear user data and token from localStorage
          this.userService.clearUserData();
          localStorage.removeItem('token');
          localStorage.removeItem('userData');

          // Set authUser and isAdmin to false
          this.authUser = false;
          this.isAdmin = false;

          // Navigate to the home page or any other page as needed
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error logging out:', error);
        }
      );
    } else {
      // If no token is found in localStorage, simply clear user data and navigate
      this.userService.clearUserData();
      this.authUser = false;
      this.isAdmin = false; // Set authUser and isAdmin to false
      this.router.navigate(['/']);
    }
  }


}
