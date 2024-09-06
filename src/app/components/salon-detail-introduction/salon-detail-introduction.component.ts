import { Component, Input } from '@angular/core';
import { Salon } from '../../model/salon';

@Component({
  selector: 'app-salon-detail-introduction',
  templateUrl: './salon-detail-introduction.component.html',
  styleUrl: './salon-detail-introduction.component.scss',
})
export class SalonDetailIntroductionComponent {
  @Input() salonData!: Salon;
}
