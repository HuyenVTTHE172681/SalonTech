import { Component, Input } from '@angular/core';
import { Salon } from '../../model/salon';
import { SectorService } from '../../services/sector.service';

@Component({
  selector: 'app-salon-detail-assign-data',
  templateUrl: './salon-detail-assign-data.component.html',
  styleUrl: './salon-detail-assign-data.component.scss',
})
export class SalonDetailAssignDataComponent {
  @Input() salonData!: Salon;

  sectors: any[] = [];

  constructor(private sectorSrv: SectorService) {}

  ngOnInit(): void {
    this.getAllSectorTree();
  }

  getAllSectorTree() {
    this.sectorSrv.getSectorTree().subscribe({
      next: (data) => {
        this.sectors = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
