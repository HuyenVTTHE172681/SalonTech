import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

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
    private bookingSrv: BookingService
  ) {
    this.customerForm = this.fb.group({
      code: [''],
      status: [null],
      user: this.fb.group({
        name: [''],
        phone: [''],
        city: [''],
        district: [''],
        commune: [''],
        email: [''],
        address: [''],
        avatar: [''],
        password: [''],
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

  onSubmitFormEditSector(): void {
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
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

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

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllBookingHistoryById(this.bookingHistories[0].customer._id);
    console.log(this.page);
  }
}
