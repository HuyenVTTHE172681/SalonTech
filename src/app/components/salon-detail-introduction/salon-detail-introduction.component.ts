import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Salon } from '../../model/salon';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-salon-detail-introduction',
  templateUrl: './salon-detail-introduction.component.html',
  styleUrls: ['./salon-detail-introduction.component.scss'], // Corrected `styleUrl` to `styleUrls`
})
export class SalonDetailIntroductionComponent {
  @Input() salonData!: Salon;

  salonForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.salonForm = this.fb.group({
      short_description: [''], // Fallback to an empty string if undefined
    });
  }

  ngOnChanges(salon: SimpleChanges): void {
    if (salon['salonData']) {
      this.salonForm.patchValue({
        short_description: this.salonData.short_description,
      });
    }
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data']) {
  //     // Nếu object data thay đổi, cập nhật lại giá trị description trong form
  //     this.myForm.patchValue({
  //       description: this.data.description,
  //     });
  //   }
  // }
}
