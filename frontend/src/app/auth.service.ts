// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  private authenticated = false;
  constructor(private http: HttpClient) {
    this.checkAdminRole();
  }

  isAuthenticated(): boolean {
    return this.authenticated;
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
            console.log('Response from checkAdminRole:', response); // Log the response
            if (response.status_code === 200) {
              this.isAdminSubject.next(true);
            } else {
              this.isAdminSubject.next(false);
            }
          },
          (error) => {
            console.error('Error checking admin role:', error);
            this.isAdminSubject.next(false);
          }
        );
    }
  }
}
