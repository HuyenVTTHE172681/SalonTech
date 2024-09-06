import { Component, Input } from '@angular/core';
import { Salon } from '../../model/salon';

@Component({
  selector: 'app-salon-detail-assign-data',
  templateUrl: './salon-detail-assign-data.component.html',
  styleUrl: './salon-detail-assign-data.component.scss',
})
export class SalonDetailAssignDataComponent {
  @Input() salonData!: Salon;
}
