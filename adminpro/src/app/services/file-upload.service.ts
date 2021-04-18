import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/localStorage';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  async updatePhoto(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      console.log(file);
      const url = `${environment.base_url}upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'X-Token': localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || '',
        },
        body: formData,
      });
      return await resp.json();
    } catch (error) {
      console.log(error);
    }
  }
}
