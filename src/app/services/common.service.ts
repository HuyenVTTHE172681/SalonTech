import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getAllCity(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/common/cities`)
      .pipe(catchError(this.handleError));
  }

  //   getAllDistricts(city_code: string): Observable<any> {
  //     return this.http
  //       .get(`${this.baseUrl}/common/districts?city_code=${city_code}`)
  //       .pipe(catchError(this.handleError));
  //   }

  //   getAllCommunes(district_code: string): Observable<any> {
  //     return this.http
  //       .get(`${this.baseUrl}/common/communes?district_code=${district_code}`)
  //       .pipe(catchError(this.handleError));
  //   }

  getAllDistricts(city_code: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/common/districts?city_code=${city_code}`)
      .pipe(
        tap((response) => console.log('Districts response:', response)), // Log response to debug
        catchError(this.handleError)
      );
  }

  getAllCommunes(district_code: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/common/communes?district_code=${district_code}`)
      .pipe(
        tap((response) => console.log('Communes response:', response)), // Log response to debug
        catchError(this.handleError)
      );
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
