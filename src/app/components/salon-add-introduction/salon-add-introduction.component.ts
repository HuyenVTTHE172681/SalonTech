import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalonService } from '../../services/salon.service';
import { Router } from '@angular/router';
import { Salon } from '../../model/salon';

@Component({
  selector: 'app-salon-add-introduction',
  templateUrl: './salon-add-introduction.component.html',
  styleUrls: ['./salon-add-introduction.component.scss'],
})
export class SalonAddIntroductionComponent {
  salonForm!: FormGroup;

  @Input() salonData!: Salon;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    if (this.salonData) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.salonForm = this.formBuilder.group({
      short_description: [this.salonData.short_description],
    });
  }
}
