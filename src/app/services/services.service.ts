import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Sector } from '../model/sector';
import { IResponeList } from '../model/common.model';
import { Service } from '../model/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getAllService(
    page: number,
    size: number,
    status: number,
    sector_id: string
  ): Observable<IResponeList<Service>> {
    // Construct the query parameters string
    let queryParams = `?page=${page}&size=${size}&status=${status}&sector_id=${sector_id}`;

    return this.http
      .get<IResponeList<Service>>(`${this.baseUrl}/service${queryParams}`)
      .pipe(catchError(this.handleError));
  }
  // Hàm xóa service
  deleteService(id: string) {
    return this.http
      .delete(`${this.baseUrl}/service/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý với phương thức thêm service có url là {{baseUrl}}/service
  addService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}/service`, service).pipe(
      tap((service: Service) =>
        console.log(`Added service with id=${service._id}`)
      ),
      catchError(this.handleError)
    );
  }

  // Hàm edit
  editService(id: string) {
    return this.http
      .get(`${this.baseUrl}/service/${id}`)
      .pipe(catchError(this.handleError));
  }

  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/service/${id}`).pipe(
      tap((_) => console.log(`Fetched service id=${id}`)),
      catchError(this.handleError)
    );
  }

  updateService(id: string, service: Service): Observable<Service> {
    return this.http
      .put<Service>(`${this.baseUrl}/service/${id}`, service)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
