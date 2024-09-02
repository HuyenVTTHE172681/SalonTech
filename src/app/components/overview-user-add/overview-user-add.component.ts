import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-overview-user-add',
  templateUrl: './overview-user-add.component.html',
  styleUrl: './overview-user-add.component.scss',
})
export class OverviewUserAddComponent implements OnInit {
  userForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userSrv: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: [null, Validators.required],
      phone: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmitFormAddUser(form: NgForm) {
    if (this.userForm.valid) {
      const formValue = {
        ...this.userForm.value,
        status: Number(this.userForm.value.status),
      };

      this.userSrv.addUser(formValue).subscribe(
        (res) => {
          console.log(res);
          alert('Thêm thành công');
          this.router.navigate(['/home/overview-user']);
        },
        (err) => {
          console.log(err);
          alert('Có lỗi xảy ra, vui lòng thử lại!');
        }
      );
    }
  }

  onCancel() {
    this.userForm.reset();
  }
}
