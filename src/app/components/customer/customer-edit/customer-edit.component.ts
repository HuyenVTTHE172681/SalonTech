import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../model/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { CommonService } from '../../../services/common.service';
import { libraryService } from '../../../services/library.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent implements OnInit {
  customerForm: any;
  page: number = 1;
  size: number = 3; // Display 3 items per page
  bookingHistories: any[] = [];
  totalItems: number = 0;

  constructor(
    private fb: FormBuilder,
    private customerSrv: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private bookingSrv: BookingService,
    private commonSrv: CommonService,
    private librarySrv: libraryService
  ) {
    this.customerForm = this.fb.group({
      _id: [''],
      code: [''],
      status: [null],
      user: this.fb.group({
        name: [''],
        city: [''],
        district: [''],
        commune: [''],
        avatar: [''],
        password: [''],
        phone: [''],
        email: [''],
        address: [''],
        birthday: [''],
        userName: [''],
      }),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getCustomerById(id);
        this.getAllBookingHistoryById(id);
      }
    });
  }

  getCustomerById(id: string): void {
    this.customerSrv.getCustomerById(id).subscribe((data) => {
      this.customerForm.patchValue(data);
    });
  }

  onSubmitFormEditCustomer(): void {
    if (this.customerForm.valid) {
      const updatedCustomer: Customer = this.customerForm.value;
      updatedCustomer.status = Number(updatedCustomer.status);

      console.log('Update Customer data: ', updatedCustomer);

      this.customerSrv
        .updateCustomer(updatedCustomer._id, updatedCustomer)
        .subscribe(
          (res) => {
            console.log(this.customerForm.value);
            alert('Update Customer successfully!');
            this.router.navigate(['/customer']);
            this.customerForm.reset();
            console.log(this.customerForm.value._id);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  // ====================== Booking History
  getAllBookingHistoryById(customerId: string): void {
    this.bookingSrv
      .getBookingHistoryByCustomerId(customerId, this.page, this.size)
      .subscribe(
        (data) => {
          console.log('Booking history: ', data);
          this.bookingHistories = data.items;
          this.totalItems = data.totalItems;
          console.log(this.bookingHistories);
          console.log(customerId);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  formatDate(date: string | null) {
    if (date) {
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      return day + '/' + month + '/' + year;
    }
    return date;
  }

  // ====================== Pagination
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllBookingHistoryById(this.bookingHistories[0].customer._id);
    console.log(this.page);
  }

  deleteCustomer() {
    this.customerSrv
      .deleteCustomer(this.customerForm.value._id)
      .subscribe((res) => {
        alert('Delete customer successfully!');
        this.router.navigate(['/customer']);
      });
  }

  // ====================== GET CITY, COMMUNE, DISTRICT
  cities: any[] = [];
  districts: any[] = [];
  communes: any[] = [];
  loading: boolean = false;
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
      this.customerForm.get('user.district')?.setValue(''); // Corrected access to nested controls
      this.customerForm.get('user.commune')?.setValue('');
      return;
    }

    this.loading = true;
    const city_code = city.code;
    this.getAllDistrict(city_code);
  }

  getAllDistrict(city_code: any) {
    this.districts = [];
    this.commonSrv.getAllDistricts(city_code).subscribe(
      (res) => {
        this.districts = res;
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
      this.customerForm.get('user.commune')?.setValue('');
      return;
    }

    this.loading = true;
    const district_code = district.code;
    this.getAllCommunes(district_code);
  }

  // ====================== EDIT IMGAGE
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
