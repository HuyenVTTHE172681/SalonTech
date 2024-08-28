import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Sector } from '../model/sector';
import { IResponeList } from '../model/common.model';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getAllSector(
    page: number,
    size: number,
    status: number,
  ): Observable<IResponeList<Sector>> {
    // Construct the query parameters string
    let queryParams = `?page=${page}&size=${size}&status=${status}`;

    return this.http
      .get<IResponeList<Sector>>(`${this.baseUrl}/sector${queryParams}`)
      .pipe(catchError(this.handleError));
  }

  // Hàm xóa sector
  deleteSector(id: string) {
    return this.http
      .delete(`${this.baseUrl}/sector/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý với phương thức thêm sector có url là {{baseUrl}}/sector
  addSector(sector: Sector): Observable<Sector> {
    return this.http.post<Sector>(`${this.baseUrl}/sector`, sector).pipe(
      tap((sector: Sector) =>
        console.log(`Added sector with id=${sector._id}`)
      ),
      catchError(this.handleError)
    );
  }

  // Hàm edit
  editSector(id: string) {
    return this.http
      .get(`${this.baseUrl}/sector/${id}`)
      .pipe(catchError(this.handleError));
  }

  getSectorById(id: string): Observable<Sector> {
    return this.http.get<Sector>(`${this.baseUrl}/sector/${id}`).pipe(
      tap((_) => console.log(`fetched sector id=${id}`)),
      catchError(this.handleError)
    );
  }

  updateSector(id: string, sector: Sector): Observable<Sector> {
    return this.http
      .put<Sector>(`${this.baseUrl}/sector/${id}`, sector)
      .pipe(catchError(this.handleError));
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
