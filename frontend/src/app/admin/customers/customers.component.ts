import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  users: any[] = [];
  columns: string[] = ['id', 'name', 'email', 'phone', 'address', 'role']; // Define columns

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      // Filter out admin users
      this.users = data.data.filter((user: any) => user.role !== 'admin');
    });
  }
}
