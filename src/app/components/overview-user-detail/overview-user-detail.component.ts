// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../services/user.service';
// import { User } from '../../model/user';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-overview-user-detail',
//   templateUrl: './overview-user-detail.component.html',
//   styleUrl: './overview-user-detail.component.scss',
// })
// export class OverviewUserDetailComponent implements OnInit {
//   userForm: FormGroup;
//   editMode: boolean = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private userSrv: UserService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     this.userForm = this.formBuilder.group({
//       _id: [{ value: '', disabled: true }],
//       name: [{ value: '', disabled: true }, [Validators.required]],
//       email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
//       status: [{ value: null, disabled: true }, Validators.required],
//       phone: [{ value: '', disabled: true }, [Validators.required]],
//       modified_by: [{ value: '', disabled: true }],
//       modified_date: [{ value: '', disabled: true }],
//     });
//   }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((param) => {
//       const id = param.get('id');
//       if (id) {
//         this.getUserById(id);
//       }
//     });
//   }

//   getUserById(id: string): void {
//     this.userSrv.getUserById(id).subscribe(
//       (data) => {
//         console.log('User data fetched from API:', data);
//         this.userForm.patchValue(data);
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   }

//   toggleEditMode(): void {
//     this.editMode = !this.editMode;
//     if (this.editMode) {
//       this.userForm.enable();
//     } else {
//       this.userForm.disable();
//     }
//   }

//   onSubmitFormEditUser(): void {
//     if (this.userForm.valid) {
//       const updatedUser: User = this.userForm.getRawValue(); // Use getRawValue() to get values of disabled controls as well

//       // Convert status from string to number
//       updatedUser.status = Number(updatedUser.status);

//       console.log('Update User data: ', updatedUser);

//       this.userSrv.updateUser(updatedUser._id, updatedUser).subscribe(
//         (res) => {
//           this.toggleEditMode();
//         },
//         (err) => {
//           console.log(err);
//         }
//       );
//     }
//   }

//   onCancel(): void {
//     this.router.navigate(['/home/overview-user']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-overview-user-detail',
  templateUrl: './overview-user-detail.component.html',
  styleUrls: ['./overview-user-detail.component.scss'], // Đã sửa lại styleUrl thành styleUrls
})
export class OverviewUserDetailComponent implements OnInit {
  userForm: FormGroup;
  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userSrv: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      _id: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Thêm validator email để xác thực email
      status: [null, Validators.required],
      phone: ['', [Validators.required]],
      modified_by: [{ value: '', disabled: true }],
      modified_date: [{ value: '', disabled: true }],
    });

    this.userForm.disable(); // Bắt đầu với form bị vô hiệu hóa
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getUserById(id);
      }
    });
  }

  getUserById(id: string): void {
    this.userSrv.getUserById(id).subscribe(
      (data: User) => {
        console.log('User data fetched from API:', data);
        this.userForm.patchValue(data);
      },
      (err) => {
        console.error('Error fetching user data:', err); // Đã cải thiện thông báo lỗi
      }
    );
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.editMode ? this.userForm.enable() : this.userForm.disable(); // Bật/tắt chế độ chỉnh sửa cho form
    // Không cho phép chỉnh sửa các trường bị disable
    this.userForm.get('_id')?.disable();
    this.userForm.get('modified_by')?.disable();
    this.userForm.get('modified_date')?.disable();
  }

  onSubmitFormEditUser(): void {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.getRawValue(); // Lấy giá trị bao gồm các trường bị vô hiệu hóa

      // Chuyển đổi status từ string sang number nếu cần thiết
      updatedUser.status = Number(updatedUser.status);

      console.log('Update User data: ', updatedUser);

      this.userSrv.updateUser(updatedUser).subscribe(
        (res) => {
          console.log('User updated successfully:', res);
          this.toggleEditMode();
        },
        (err) => {
          console.error('Error updating user:', err);
        }
      );
    } else {
      console.warn('Form is invalid, please check the inputs.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/overview-user']);
  }

  onDelete(): void {
    this.userSrv.deleteUser(this.userForm.get('_id')?.value).subscribe(
      (res) => {
        alert('User deleted successfully');
        console.log('User deleted successfully:', res);
        this.router.navigate(['/home/overview-user']);
      },
      (err) => {
        console.error('Error deleting user:', err);
      }
    );
  }
}
