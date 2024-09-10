import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class libraryService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  uploadPicture(file: File): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/library/upload/`)
      .pipe(catchError(this.handleError));
  }

//   upload(file: File): Observable<HttpEvent<any>> {
//     const formData: FormData = new FormData();

//     formData.append('file', file);

//     const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
//       reportProgress: true,
//       responseType: 'json',
//     });

//     return this.http.request(req);
//   }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
