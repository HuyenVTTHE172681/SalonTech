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

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(`${this.baseUrl}/customer`, customer)
      .pipe(catchError(this.handleError));
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http
      .get<Customer>(`${this.baseUrl}/customer/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.baseUrl}/customer/${id}`, customer)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error message in detail
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
