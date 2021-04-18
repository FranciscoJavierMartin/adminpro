import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public user: User;

  constructor(private router: Router, private userService: UserService) {
    this.user = userService.getUser;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}
