import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { libraryService } from '../../services/library.service';

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
      name: [''],
      city: [''],
      district: [''],
      commune: [''],
      address: [''],
      email: [''],
      phone: [''],
      avatar: [''],
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

      this.districts = [];
      this.communes = [];
      return;
    }

    this.loading = true;
    const city_code = city.code; // Chuyển đổi mã thành phố sang số
    this.commonSrv.getAllDistricts(city_code).subscribe(
      (res) => {
        console.log('districts: ', res);
        this.districts = res.data; // Sử dụng đúng dữ liệu trả về từ API
        this.loading = false;
      },
      (error) => {
        console.log('Something went wrong: ', error);
        this.loading = false;
      }
    );
  }

  selectedDistrict(district: any) {
    if (!district) {
      this.customerForm.controls['commune'].setValue('');
      this.communes = [];
      return;
    }

    this.loading = true;
    const district_code = district.code; // Use correct district code
    this.commonSrv.getAllCommunes(district_code).subscribe(
      (res) => {
        console.log('communes: ', res);
        this.communes = res; // Use the correct data
        this.loading = false;
      },
      (error) => {
        console.log('Something went wrong: ', error);
        this.loading = false;
      }
    );
  }

  onSubmitFormAddCustomer(form: NgForm) {
    if (this.customerForm.valid) {
      const formValue = {
        ...this.customerForm.value,
        // Chuyển đổi dữ liệu nếu cần thiết
        city: this.customerForm.value.city
          ? this.customerForm.value.city.code
          : null,
        district: this.customerForm.value.district
          ? this.customerForm.value.district.code
          : null,
        commune: this.customerForm.value.commune
          ? this.customerForm.value.commune.code
          : null,
      };

      this.customerSrv.addCustomer(formValue).subscribe(
        (res) => {
          alert('Add successfully!');
          console.log('Customer:', formValue);
          this.router.navigate(['/customer']);
        },
        (error) => {
          console.log('Error:', error);
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
