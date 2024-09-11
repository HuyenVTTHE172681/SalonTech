import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss',
})
export class CustomerAddComponent {
  customerForm: any;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      commune: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }
}
