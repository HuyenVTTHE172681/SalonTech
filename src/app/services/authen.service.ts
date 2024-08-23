import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để post dữ liệu đến API
  login(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/user/login`, data)
      .pipe(catchError(this.handleError));
  }

  register(userDetails: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/user/register`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
