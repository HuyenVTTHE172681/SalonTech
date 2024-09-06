import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Salon } from '../../model/salon';

@Component({
  selector: 'app-salon-add-information',
  templateUrl: './salon-add-information.component.html',
  styleUrls: ['./salon-add-information.component.scss'],
})
export class SalonAddInformationComponent {
  @Input() salonData!: Salon;

  salonForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    if (this.salonData) {
      this.initForm();
    }
  }

  initForm(): void {
    this.salonForm = this.fb.group({
      code: [this.salonData.code],
      name: [this.salonData.name],
      phone: [this.salonData.phone],
      email: [this.salonData.email],
      city: [this.salonData.city],
      district: [this.salonData.district],
      commune: [this.salonData.commune],
      opening_from_date: [this.salonData.opening_from_date],
      opening_to_date: [this.salonData.opening_to_date],
      rate_average: [this.salonData.rate_average],
      status: [this.salonData.status],
    });
  }
}
