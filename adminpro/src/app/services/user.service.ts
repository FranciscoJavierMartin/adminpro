import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterFormData } from '../interfaces/forms';
import { environment } from 'src/environments/environment';
import { RegisterResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public register(registerFormData: RegisterFormData): Observable<Object> {
    return this.http.post(`${environment.base_url}users`, registerFormData);
  }
}
