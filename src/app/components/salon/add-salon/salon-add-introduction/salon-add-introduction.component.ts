import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Salon } from '../../../../model/salon';

@Component({
  selector: 'app-salon-add-introduction',
  templateUrl: './salon-add-introduction.component.html',
  styleUrls: ['./salon-add-introduction.component.scss'],
})
export class SalonAddIntroductionComponent implements OnInit {
  salonForm!: FormGroup;

  @Input() salonData!: Salon;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (!this.salonData) {
      this.salonData = new Salon();
    }
    this.initializeForm();
  }

  initializeForm(): void {
    // Use safe navigation operator to prevent undefined errors
    this.salonForm = this.formBuilder.group({
      short_description: [
        this.salonData?.short_description || '',
        Validators.required,
      ],
    });
  }
}
