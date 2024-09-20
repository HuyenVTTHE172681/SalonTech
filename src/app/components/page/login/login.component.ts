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
  isLoading: boolean = false;
  error: string = '';
  showIcon: boolean = false;
  passwordType: string = 'password';

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
      this.isLoading = true;
      setTimeout(() => {
        this.authenticationSrv.login(this.loginObj.value).subscribe(
          (res) => {
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('refresh_token', res.refresh_token);
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          (err) => {
            console.log(err);
            console.log(Token);
            alert('Đăng nhập không hợp lệ. Vui long thử lại.');
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
