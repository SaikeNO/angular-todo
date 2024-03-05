import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  public apiUrl = '';

  public fetchNewApiUrl() {
    return this.http
      .get('https://crudcrud.com/', { responseType: 'text' })
      .pipe(
        tap((response) => {
          const regex = /https:\/\/crudcrud\.com\/api\/([0-9a-fA-F]{32})/;
          const match = response.match(regex);
          if (match) {
            this.apiUrl = `https://crudcrud.com/api/${match[1]}/todo`;
          } else {
            console.log('No URL found');
          }
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
