import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Salon } from '../model/salon';

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

  // updateSalonStatus(id: number, salon: Salon): Observable<Salon> {
  //   return this.http
  //     .put<Salon>(`${this.baseUrl}/salon/${id}`, salon)
  //     .pipe(catchError(this.handleError));
  // }

  updateSalonStatus(id: number, status: number): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/salon/${id}`, { status: status })
      .pipe(
        catchError((error) => {
          console.error('Update Salon Status Error: ', error);
          return throwError(() => error); // Return the error to be handled
        })
      );
  }

  addSalon(salon: Salon): Observable<Salon> {
    return this.http
      .post<Salon>(`${this.baseUrl}/salon`, salon)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
