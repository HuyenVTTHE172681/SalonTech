import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { libraryService } from '../../services/library.service';
import { Customer } from '../../model/customer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss',
})
export class CustomerAddComponent {
  customerForm: any;
  cities: any[] = [];
  districts: any[] = [];
  communes: any[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commonSrv: CommonService,
    private customerSrv: CustomerService,
    private router: Router,
    private librarySrv: libraryService
  ) {}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      code: [''],
      status: [null],
      user: this.fb.group({
        name: [''],
        phone: [''],
        city: [''],
        district: [''],
        commune: [''],
        address: [''],
        email: [''],
        avatar: [''],
        password: [''],
      }),
    });

    this.getAllCity();
  }

  getAllCity() {
    this.loading = true;
    this.commonSrv.getAllCity().subscribe(
      (city) => {
        console.log(city);
        this.cities = city;
        this.loading = false;
      },
      (error) => {
        console.log('Something went wrong: ', error);
      }
    );
  }

  selectedCity(city: any) {
    if (!city) {
      this.customerForm.controls['district'].setValue('');
      this.customerForm.controls['commune'].setValue('');
      return;
    }

    this.loading = true;
    const city_code = city.code; // Chuyển đổi mã thành phố sang số
    this.getAllDistrict(city_code);
  }

  getAllDistrict(city_code: any) {
    this.districts = [];
    this.commonSrv.getAllDistricts(city_code).subscribe(
      (res) => {
        this.districts = res; // Sử dụng đúng dữ liệu trả về này API
        console.log('districts: ', this.districts);
      },
      (error) => {
        console.log('Something went wrong: ', error);
      }
    );
  }

  getAllCommunes(district_code: any) {
    this.communes = [];
    this.commonSrv.getAllCommunes(district_code).subscribe(
      (res) => {
        this.communes = res;
        console.log('communes: ', this.communes);
      },
      (error) => {
        console.log('Something went wrong: ', error);
      }
    );
  }

  selectedDistrict(district: any) {
    if (!district) {
      this.customerForm.controls['commune'].setValue('');
      return;
    }

    this.loading = true;
    const district_code = district.code;
    this.getAllCommunes(district_code);
  }

  onSubmitFormAddCustomer() {
    if (this.customerForm.valid) {
      // Tạo đối tượng formValue với cấu trúc phù hợp
      const formValue: Customer = {
        ...this.customerForm.value,
        status: Number(this.customerForm.value.status),
        user: {
          ...this.customerForm.value.user,
          city: this.customerForm.value.user.city,
          district: this.customerForm.value.user.district,
          commune: this.customerForm.value.user.commune,
          avatar: this.customerForm.value.user.avatar,
          password: this.customerForm.value.user.password,
          phone: this.customerForm.value.user.phone,
          email: this.customerForm.value.user.email,
          address: this.customerForm.value.user.address,
        },
      };

      // Gọi API để thêm mới Customer
      this.customerSrv.addCustomer(formValue).subscribe(
        (res) => {
          alert('Add successfully!');
          this.router.navigate(['/customer']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  onCancel() {
    this.customerForm.reset();
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
          this.customerForm.patchValue({ avatar: this.avatar }); // Cập nhật URL vào form
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
    this.customerForm.get('avatar')?.setValue(null); // Xóa giá trị trong form control
    if (this.avatarInputFile) {
      this.avatarInputFile.nativeElement.value = ''; // Đặt lại giá trị input file
    }
  }
}
