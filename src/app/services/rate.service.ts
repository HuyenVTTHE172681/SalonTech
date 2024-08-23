import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IResponeList } from '../model/common.model';
import { Rate } from '../model/rate';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getAllRating(
    page: number,
    size: number,
    status: number
  ): Observable<IResponeList<Rate>> {
    return this.http
      .get<IResponeList<Rate>>(
        `${this.baseUrl}/rate?filter=&page=${page}&size=${size}&status=${status}`
      )
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
