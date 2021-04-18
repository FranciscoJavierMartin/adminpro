import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginFormData, RegisterFormData } from '../interfaces/forms';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/localStorage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
    return this.http.post(`${environment.base_url}auth/login`, loginFormData);
  }

  public validateToken(): Observable<boolean> {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || '';

    return this.http
      .get(`${environment.base_url}auth/renew`, {
        headers: {
          'X-Token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, resp.token);
        }),
        map((res) => true),
        catchError((error) => of(false))
      );
  }

  public logout(): void {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
  }
}
