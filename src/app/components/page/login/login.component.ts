import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { AuthenService } from '../../../services/authen.service';
import { NgToastService } from 'ng-angular-popup';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginObj: any;
  isLoading: boolean = false;
  error: string = '';
  showIcon: boolean = false;
  passwordType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authenticationSrv: AuthenService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginObj = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginObj.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.authenticationSrv.login(this.loginObj.value).subscribe(
          (res) => {
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('refresh_token', res.refresh_token);
            // Show success toast
            // this.toast.success('Success Message', res.message, { timeOut: 3000 });
            this.toast.success('Success Message', res.message, 3000);
            alert('Đăng nhập hợp lệ.');
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          (err) => {
            console.log(err);
            console.log(Token);
            alert('Đăng nhập không hợp lệ. Vui long thử lại.');
            // this.toast.error({ detail: "Error Mesage", summary: "Login Failed, try again later!!", duration: 3000 });
            this.toast.warning(
              'This is new Warning message',
              'Login Failed, try again later!!',
              3000
            );
            this.isLoading = false;
          }
        );
      }, 1000);
    } else {
      this.loginObj.markAllAsTouched(); // Đánh dấu tất cả các control để hiển thị lỗi
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ.');
    }
  }

  onChange() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showIcon = true;
      console.log(this.showIcon);
    } else {
      this.passwordType = 'password';
      this.showIcon = false;
      console.log(this.showIcon, this.passwordType);
    }
  }
}
