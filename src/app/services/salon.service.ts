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

  updateSalonStatus(id: string, status: number): Observable<Salon> {
    return this.http
      .put<Salon>(`${this.baseUrl}/salon/${id}`, { status }) // Send status as an object
      .pipe(catchError(this.handleError));
  }

  updateSalon(id: string, salonData: Salon): Observable<Salon> {
    return this.http.put<Salon>(`${this.baseUrl}/salon/${id}`, salonData);
  }

  addSalon(salon: Salon): Observable<Salon> {
    return this.http
      .post<Salon>(`${this.baseUrl}/salon`, salon)
      .pipe(catchError(this.handleError));
  }

  getSalonById(id: string): Observable<Salon> {
    return this.http
      .get<Salon>(`${this.baseUrl}/salon/${id}`)
      .pipe(catchError(this.handleError));
  }

  getSalonDetail(id: string): Observable<Salon> {
    return this.http.get<Salon>(`${this.baseUrl}/salon/${id}`);
  }

  deleteSalon(id: string) {
    return this.http
      .delete(`${this.baseUrl}/salon/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
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
