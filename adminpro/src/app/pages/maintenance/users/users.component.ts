import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  users: User[];
  total: number;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers().subscribe(({ total, users }) => {
      this.users = users;
      this.total = total;
    });
  }
}
