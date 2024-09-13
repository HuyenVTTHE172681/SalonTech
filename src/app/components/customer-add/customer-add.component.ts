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
      status: [1], // Set default status value
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
        role: ['customer'],
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

  onSubmitFormAddCustomer() {
    if (this.customerForm.valid) {
      const formValue: Customer = {
        ...this.customerForm.value,
        user: {
          ...this.customerForm.value.user,
          status: 0, // Set status here if needed
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

  onSelectedFileAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.librarySrv.uploadImage(file).subscribe({
        next: (response: any) => {
          this.avatar = response.secure_url;
          this.customerForm.get('user.avatar')?.setValue(this.avatar);
        },
        error: (err) => {
          console.error('Lỗi khi tải lên avatar:', err);
        },
      });

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.avatar = event.target.result;
      };
    }
  }

  @ViewChild('avatarInputFile') avatarInputFile!: ElementRef<HTMLInputElement>;
  onDeleteAvatar(): void {
    this.avatar = null;
    this.customerForm.get('user.avatar')?.setValue(null);
    if (this.avatarInputFile) {
      this.avatarInputFile.nativeElement.value = '';
    }
  }
}
