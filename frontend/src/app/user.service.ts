import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor() {}

  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearUserData() {
    localStorage.removeItem('userData');
    this.userDataSubject.next(null);
  }
}
