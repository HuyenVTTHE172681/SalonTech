import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getDashboard(fromDate: string, toDate: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/dashboard?fromDate=${fromDate}&toDate=${toDate}`)
      .pipe(catchError(this.handleError));
  }

  getBookingDashboard(
    fromDate: string,
    toDate: string,
    booking_type: number,
    status: number,
    page: number,
    pageSize: number
  ): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/dashboard/booking?fromDate=${fromDate}&toDate=${toDate}&booking_type=${booking_type}&status=${status}&page=${page}&pageSize=${pageSize}`
      )
      .pipe(catchError(this.handleError));
  }

  getRevenueDashboard(
    fromDate: string,
    toDate: string,
    booking_type: number,
    status: number,
    page: number,
    pageSize: number
  ): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/dashboard/revenue?fromDate=${fromDate}&toDate=${toDate}&booking_type=${booking_type}&status=${status}&page=${page}&pageSize=${pageSize}`
      )
      .pipe(catchError(this.handleError));
  }

  getDashboardChart(fromDate: string, toData: string): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}/dashboard/chart?fromDate=${fromDate}&toDate=${toData}`
      )
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
