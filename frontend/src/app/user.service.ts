import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(this.getUserData());
  userData$ = this.userDataSubject.asObservable();
  private authenticated = false;
  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}



  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
    localStorage.setItem('isLoggedIn', 'true');
    this.authenticated = true; // Set authenticated to true when setting user data
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearUserData() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.userDataSubject.next(null);
    localStorage.removeItem('isLoggedIn');
    this.authenticated = false; // Set authenticated to false when clearing user data
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUsers() {
    // Get the user token from local storage
    const token = localStorage.getItem('token');

    // Set up the headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
    });

    // Include the headers in the request
    return this.http.get<any>(this.apiUrl, { headers });
  }


  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authenticated; // Use the authenticated flag
  }


    // Check if the user has the 'admin' role
    isAdmin(): boolean {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      return userData && userData.role === 'admin';
    }
}
