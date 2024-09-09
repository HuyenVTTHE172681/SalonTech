import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../services/sector.service';

@Component({
  selector: 'app-salon-add-assign-data',
  templateUrl: './salon-add-assign-data.component.html',
  styleUrl: './salon-add-assign-data.component.scss',
})
export class SalonAddAssignDataComponent implements OnInit {
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
