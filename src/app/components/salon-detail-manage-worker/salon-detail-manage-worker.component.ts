import { Component, Input } from '@angular/core';
import { Salon } from '../../model/salon';

@Component({
  selector: 'app-salon-detail-manage-worker',
  templateUrl: './salon-detail-manage-worker.component.html',
  styleUrl: './salon-detail-manage-worker.component.scss',
})
export class SalonDetailManageWorkerComponent {
  @Input() salonData!: Salon;
}
