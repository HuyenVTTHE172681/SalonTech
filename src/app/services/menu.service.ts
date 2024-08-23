import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getAllMenu(page: number, size: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/menu?filter=&page=${page}&size=${size}`)
      .pipe(catchError(this.handleError));
  }

  getPutMenu(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/menu/6623461a2d6b9027a7397573`)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
