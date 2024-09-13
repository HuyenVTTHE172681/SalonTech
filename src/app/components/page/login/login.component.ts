import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { AuthenService } from '../../../services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginObj: any;

  constructor(
    private fb: FormBuilder,
    private authenticationSrv: AuthenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginObj = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginObj.valid) {
      this.authenticationSrv.login(this.loginObj.value).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('refresh_token', res.refresh_token);
          this.router.navigate(['/home']);
        },
        (err) => {
          console.log(err);
          console.log(Token);
          alert('Đăng nhap khong hop le. Vui long thu lai.');
        }
      );
    } else {
      this.loginObj.markAllAsTouched(); // Đánh dấu tất cả các control để hiển thị lỗi
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ.');
    }
  }
}
