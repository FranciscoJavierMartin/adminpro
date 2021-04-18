import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  LoginFormData,
  RegisterFormData,
  UpdateProfileFormData,
} from '../interfaces/forms';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/localStorage';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;

  constructor(private http: HttpClient) {}

  public get getUser(): User {
    return this.user;
  }

  private get token() {
    return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || '';
  }

  public register(registerFormData: RegisterFormData): Observable<Object> {
    return this.http
      .post(`${environment.base_url}users`, registerFormData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, resp.token);
        })
      );
  }

  public login(loginFormData: LoginFormData): Observable<Object> {
    return this.http
      .post(`${environment.base_url}auth/login`, loginFormData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, resp.token);
        })
      );
  }

  public validateToken(): Observable<boolean> {
    return this.http
      .get(`${environment.base_url}auth/renew`, {
        headers: {
          'X-Token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { name, email, img, google, role, id } = resp.user;
          this.user = new User(name, email, '', img, google, role, id);
          localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  public logout(): void {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
  }

  public updateProfile(updateProfileFormData: UpdateProfileFormData) {
    return this.http
      .put(
        `${environment.base_url}users/${this.user.id}`,
        { ...updateProfileFormData, role: this.user.role },
        {
          headers: {
            'X-Token': this.token,
          },
        }
      )
      .pipe(
        tap((res: any) => {
          const { email, name } = res.user;
          this.user.name = name;
          this.user.email = email;
        })
      );
  }
}
