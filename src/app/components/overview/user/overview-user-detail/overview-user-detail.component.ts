import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../model/user';
import { libraryService } from '../../../../services/library.service';

@Component({
  selector: 'app-overview-user-detail',
  templateUrl: './overview-user-detail.component.html',
  styleUrl: './overview-user-detail.component.scss',
})
export class OverviewUserDetailComponent {
  @Input() newUserData!: User;

  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private librarySrv: libraryService
  ) {}

  initForm(): void {
    this.userForm = this.formBuilder.group({
      _id: [this.newUserData?._id],
      name: [this.newUserData?.name],
      email: [this.newUserData?.email],
      status: [this.newUserData?.status],
      phone: [this.newUserData?.phone],
      modified_by: [this.newUserData?.modified_by],
      modified_date: [this.newUserData?.modified_date],
      avatar: [this.newUserData?.avatar],
    });
  }

  ngOnChanges(): void {
    if (this.newUserData) {
      this.initForm();
    }
  }

  avatar: string | ArrayBuffer | null = null;

  // Avatar picture
  onSelectedFileAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Sử dụng service để upload file
      this.librarySrv.uploadImage(file).subscribe({
        next: (response: any) => {
          this.avatar = response.secure_url; // Giả sử server trả về secure_url là URL của ảnh
          this.userForm.patchValue({ avatar: this.avatar }); // Cập nhật URL vào form
        },
        error: (err) => {
          console.error('Lỗi khi tải lên avatar:', err);
        },
      });

      // Xem trước ảnh
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.avatar = event.target.result;
      };
    }
  }

  @ViewChild('avatarInputFile') avatarInputFile!: ElementRef<HTMLInputElement>;
  onDeleteAvatar(): void {
    this.avatar = null; // Xóa ảnh bìa hiển thị
    this.userForm.get('avatar')?.setValue(null); // Xóa giá trị trong form control
    if (this.avatarInputFile) {
      this.avatarInputFile.nativeElement.value = ''; // Đặt lại giá trị input file
    }
  }
}
