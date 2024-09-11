import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Salon } from '../../model/salon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { libraryService } from '../../services/library.service';

@Component({
  selector: 'app-salon-detail-information',
  templateUrl: './salon-detail-information.component.html',
  styleUrl: './salon-detail-information.component.scss',
})
export class SalonDetailInformationComponent {
  @Input() salonData!: Salon;

  salonForm!: FormGroup;

  constructor(private fb: FormBuilder, private librarySrv: libraryService) {}

  ngOnChanges(): void {
    if (this.salonData) {
      this.initForm();
    }
  }

  initForm(): void {
    this.salonForm = this.fb.group({
      code: [this.salonData?.code],
      name: [this.salonData?.name],
      phone: [this.salonData?.phone],
      email: [this.salonData?.email],
      city: [this.salonData?.city],
      district: [this?.salonData?.district],
      commune: [this?.salonData?.commune],
      opening_from_date: [this.salonData?.opening_from_date],
      opening_to_date: [this.salonData?.opening_to_date],
      rate_average: [this.salonData?.rate_average],
      status: [this.salonData?.status],
      avatar: [this.salonData?.avatar],
      cover: [this.salonData?.cover],
    });
  }

  cover: string | ArrayBuffer | null = null;
  avatar: string | ArrayBuffer | null = null;

  // Avatar picture
  onSelectedFileAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Sử dụng service để upload file
      this.librarySrv.uploadImage(file).subscribe({
        next: (response: any) => {
          this.avatar = response.secure_url; // Giả sử server trả về secure_url là URL của ảnh
          this.salonForm.patchValue({ avatar: this.avatar }); // Cập nhật URL vào form
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

  // Cover picture
  onSelectedFileCover(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Sử dụng service để upload file
      this.librarySrv.uploadImage(file).subscribe({
        next: (response: any) => {
          this.cover = response.secure_url; // Giả sử server trả về secure_url là URL của ảnh
          this.salonForm.patchValue({ cover: this.cover }); // Cập nhật URL vào form
        },
        error: (err) => {
          console.error('Lỗi khi tải lên cover:', err);
        },
      });

      // Xem trước ảnh
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.cover = event.target.result;
      };
    }
  }
  @ViewChild('coverInputFile') coverInputFile!: ElementRef<HTMLInputElement>;

  onDeleteCover(): void {
    this.cover = null; // Xóa ảnh bìa hiển thị
    this.salonForm.get('cover')?.setValue(null); // Xóa giá trị trong form control
    if (this.coverInputFile) {
      this.coverInputFile.nativeElement.value = ''; // Đặt lại giá trị input file
    }
  }

  @ViewChild('avatarInputFile') avatarInputFile!: ElementRef<HTMLInputElement>;
  onDeleteAvatar(): void {
    this.avatar = null; // Xóa ảnh bìa hiển thị
    this.salonForm.get('avatar')?.setValue(null); // Xóa giá trị trong form control
    if (this.avatarInputFile) {
      this.avatarInputFile.nativeElement.value = ''; // Đặt lại giá trị input file
    }
  }
}
