import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user: any; // Define a property to store the user data

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.user = userData;
  }
}
