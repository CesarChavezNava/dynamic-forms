import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProduct(): Observable<any> {
    return this.http
      .get(
        'https://us-central1-shimenu-binaryfractal-dev.cloudfunctions.net//customer/api/products/ZjVP9oB760bykzRPmJkc'
      )
      .pipe(
        map((product) => product),
        catchError((error) => error)
      );
  }
}
