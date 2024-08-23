import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from '../model/booking';
import { IResponeList } from '../model/common.model';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  getAllCustomer(
    page: number,
    size: number,
    status: number,
    customerType: number
  ): Observable<IResponeList<Customer>> {
    // Construct the query parameters string
    let queryParams = `?page=${page}&size=${size}&customerType=${customerType}&status=${status}`;

    return this.http
      .get<IResponeList<Customer>>(`${this.baseUrl}/customer${queryParams}`)
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
