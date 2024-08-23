import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IResponeList } from '../model/common.model';
import { Voucher } from '../model/voucher';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  getAllVoucher(
    page: number,
    size: number,
    status: number,
    fromDate: string | null,
    toDate: string | null
  ): Observable<IResponeList<Voucher>> {
    // Construct the query parameters string
    let queryParams = `?page=${page}&size=${size}&status=${status}`;

    // Conditionally add fromDate and toDate if they are not null
    if (fromDate) {
      queryParams += `&fromDate=${fromDate}`;
    }

    if (toDate) {
      queryParams += `&toDate=${toDate}`;
    }

    return this.http
      .get<IResponeList<Voucher>>(`${this.baseUrl}/voucher${queryParams}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client-side error:', error.error.message);
    } else {
      console.log(`Server-side error: ${error.status} - ${error.message}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
