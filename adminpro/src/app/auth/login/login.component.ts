import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LOCALSTORAGE_EMAIL_KEY,
  LOCALSTORAGE_TOKEN_KEY,
} from 'src/app/constants/localStorage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem(LOCALSTORAGE_EMAIL_KEY) || '',
      Validators.required,
    ],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  login() {
    if (this.loginForm.valid) {
      const { rememberMe, ...others } = this.loginForm.value;
      this.userService.login(others).subscribe((resp: any) => {
        if (this.loginForm.get('rememberMe')) {
          localStorage.setItem(
            LOCALSTORAGE_EMAIL_KEY,
            this.loginForm.get('email').value
          );
        } else {
          localStorage.removeItem(LOCALSTORAGE_EMAIL_KEY);
        }
        this.router.navigateByUrl('/');
      });
    }
  }
}
