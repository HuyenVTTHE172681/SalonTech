import { Component, Input } from '@angular/core';
import { Salon } from '../../model/salon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salon-detail-information',
  templateUrl: './salon-detail-information.component.html',
  styleUrl: './salon-detail-information.component.scss',
})
export class SalonDetailInformationComponent {
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
    });
  }
}
