// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private userDataSubject = new BehaviorSubject<any>(this.getUserData()); // Initialize with local storage data
//   userData$ = this.userDataSubject.asObservable();

//   constructor() {}

//   setUserData(userData: any) {
//     localStorage.setItem('userData', JSON.stringify(userData));
//     this.userDataSubject.next(userData);
//     localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn to true in localStorage

//   }

//   getUserData(): any {
//     const userData = localStorage.getItem('userData');
//     return userData ? JSON.parse(userData) : null;
//   }


//   clearUserData() {
//     localStorage.removeItem('userData');
//     this.userDataSubject.next(null);
//     localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
//   }

//   isLoggedIn(): boolean {
//     return localStorage.getItem('isLoggedIn') === 'true';
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(this.getUserData());
  userData$ = this.userDataSubject.asObservable();

  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
    localStorage.setItem('isLoggedIn', 'true');
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearUserData() {
    localStorage.removeItem('userData');
    this.userDataSubject.next(null);
    localStorage.removeItem('isLoggedIn');
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
}
