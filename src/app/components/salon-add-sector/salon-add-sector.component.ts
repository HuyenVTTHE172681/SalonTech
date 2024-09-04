import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../services/sector.service';
import { Sector } from '../../model/sector';

@Component({
  selector: 'app-salon-add-sector',
  templateUrl: './salon-add-sector.component.html',
  styleUrl: './salon-add-sector.component.scss',
})
export class SalonAddSectorComponent implements OnInit {
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
