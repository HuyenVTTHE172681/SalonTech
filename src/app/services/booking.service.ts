import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from '../model/booking';
import { IResponeList } from '../model/common.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  getAllBooking(
    page: number,
    size: number,
    status: number,
    fromDate: string | null,
    toDate: string | null,
    bookingType: number
  ): Observable<IResponeList<Booking>> {
    // Construct the query parameters string
    let queryParams = `?page=${page}&size=${size}&status=${status}&bookingType=${bookingType}`;

    // Conditionally add fromDate and toDate if they are not null
    if (fromDate) {
      queryParams += `&fromDate=${fromDate}`;
    }

    if (toDate) {
      queryParams += `&toDate=${toDate}`;
    }

    return this.http
      .get<IResponeList<Booking>>(`${this.baseUrl}/booking${queryParams}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error.message);
    } else {
      console.log(error.status);
    }
    return throwError(console.log('Something is wrong!'));
  }
}
