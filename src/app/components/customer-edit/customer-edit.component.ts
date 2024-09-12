import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
})
export class CustomerEditComponent implements OnInit {
  customerForm: any;

  constructor(
    private fb: FormBuilder,
    private customerSrv: CustomerService,
    private route: ActivatedRoute,
    private router: Router
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
}
