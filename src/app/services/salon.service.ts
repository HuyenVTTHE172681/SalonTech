import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SalonService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getAllSalon(page: number, size: number, status: number): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/salon?filter=&page=${page}&size=${size}&status=${status}`
      )
      .pipe(catchError(this.handleError));
  }

  updateSalonStatus(id: number, status: number): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/salon/${id}`, { status: status })
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
