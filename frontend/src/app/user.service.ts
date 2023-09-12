import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Angular will create a single instance of this service for the entire application
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor() {}

  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
  }

  clearUserData() {
    localStorage.removeItem('userData');
    this.userDataSubject.next(null);
  }
}
