import { Component, Input } from '@angular/core';
import { Salon } from '../../model/salon';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-salon-detail-introduction',
  templateUrl: './salon-detail-introduction.component.html',
  styleUrl: './salon-detail-introduction.component.scss',
})
export class SalonDetailIntroductionComponent {
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
      short_description: [this.salonData?.short_description],
    });
  }
}
