import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IResponeList } from '../model/common.model';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://hair-salon-api.vercel.app';

  constructor(private http: HttpClient) {}

  // Hàm để lấy dữ liệu từ API
  getAllUser(
    page: number,
    size: number,
    status: number
  ): Observable<IResponeList<User>> {
    let queryParams = `?page=${page}&size=${size}&status=${status}`;
    return this.http
      .get<IResponeList<User>>(`${this.baseUrl}/user${queryParams}`)
      .pipe(catchError(this.handleError));
  }

  // Hàm xóa user
  deleteUser(id: string) {
    return this.http
      .delete(`${this.baseUrl}/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Hàm edit
  editUser(id: string) {
    return this.http
      .get(`${this.baseUrl}/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get User by Id
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`).pipe(
      tap((_) => console.log(`fetched user id=${id}`)),
      catchError(this.handleError)
    );
  }

  // Update user
  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/user/update-user`, user)
      .pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/register`, user).pipe(
      tap((user: User) => console.log(`added user witth id=${user._id}`)),
      catchError(this.handleError)
    );
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
