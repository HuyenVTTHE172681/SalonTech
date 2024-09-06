import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Salon } from '../../model/salon';

@Component({
  selector: 'app-salon-add-information',
  templateUrl: './salon-add-information.component.html',
  styleUrls: ['./salon-add-information.component.scss'],
})
export class SalonAddInformationComponent implements OnInit {
  @Input() salonData!: Salon;
  @Output() formSubmitted = new EventEmitter<Salon>(); // Output to emit form data to parent

  salonForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.salonForm = this.fb.group({
      code: [this.salonData?.code || '', Validators.required],
      name: [this.salonData?.name || '', Validators.required],
      phone: [this.salonData?.phone || '', Validators.required],
      email: [this.salonData?.email || '', Validators.required],
      city: [this.salonData?.city || '', Validators.required],
      district: [this?.salonData?.district || '', Validators.required],
      commune: [this?.salonData?.commune || '', Validators.required],
      opening_from_date: [
        this.salonData?.opening_from_date || '',
        Validators.required,
      ],
      opening_to_date: [
        this.salonData?.opening_to_date || '',
        Validators.required,
      ],
      rate_average: [this.salonData?.rate_average || '', Validators.required],
      status: [this.salonData?.status || '', Validators.required],
    });
  }

  onSubmitForm() {
    if (this.salonForm.valid) {
      // Ensure the status is converted to a number
      const formData = {
        ...this.salonForm.value,
        status: Number(this.salonForm.value.status),
      };
      this.formSubmitted.emit(formData); // Emit the form data to parent
    } else {
      console.error('Form is invalid');
    }
  }
}
