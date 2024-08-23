import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Tạo headers mặc định
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Thay đổi token nếu cần
    });

    console.log('Header:', headers);
    // Clone request để thêm headers
    const authReq = request.clone({ headers });

    // Tiếp tục với yêu cầu đã được thêm headers
    return next.handle(authReq);
  }
}
