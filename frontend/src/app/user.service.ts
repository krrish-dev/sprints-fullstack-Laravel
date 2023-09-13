import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(this.getUserData()); // Initialize with local storage data
  userData$ = this.userDataSubject.asObservable();

  constructor() {}

  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
    localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn to true in localStorage
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearUserData() {
    localStorage.removeItem('userData');
    this.userDataSubject.next(null);
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
