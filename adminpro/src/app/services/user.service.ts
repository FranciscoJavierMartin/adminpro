import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginFormData, RegisterFormData } from '../interfaces/forms';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
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
}
