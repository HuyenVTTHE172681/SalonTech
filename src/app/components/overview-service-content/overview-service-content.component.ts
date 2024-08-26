import { Component, OnInit } from '@angular/core';
import { Sector } from '../../model/sector';
import { SectorService } from '../../services/sector.service';

enum StatusSector {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
}

@Component({
  selector: 'app-overview-service-content',
  templateUrl: './overview-service-content.component.html',
  styleUrl: './overview-service-content.component.scss',
})
export class OverviewServiceContentComponent implements OnInit {
  page: number = 1;
  size: number = 10; // display 10 item per page
  status: number = StatusSector.ALL;
  sectors: Sector[] = [];
  filteredSectors: Sector[] = [];

  statusList = [
    { name: 'Tất cả', value: StatusSector.ALL },
    { name: 'Đang hoạt động', value: StatusSector.ACTIVE },
    { name: 'Dừng hoạt động', value: StatusSector.INACTIVE },
  ];

  selectedStatus: any = this.statusList[0];

  constructor(private sectorSrv: SectorService) {}

  ngOnInit(): void {
    this.getAllSector();
  }

  getStatus(status: number) {
    switch (status) {
      case 1:
        return 'Đang hoạt động';
      case 0:
        return 'Dừng hoạt động';
      default:
        return 'Nothing';
    }
  }

  getStyle(status: number) {
    switch (status) {
      case 1:
        return 'success';
      case 0:
        return 'danger';
      default:
        return 'warning';
    }
  }

  filterStatus(event: any) {
    this.getAllSector();
  }

  filterSectorWWithStatus() {
    this.filteredSectors =
      this.status === -1
        ? this.sectors
        : this.sectors.filter((sector) => sector.status === this.status);
  }
  getAllSector() {
    this.sectorSrv
      .getAllSector(this.page, this.size, this.selectedStatus.value)
      .subscribe(
        (data) => {
          this.sectors = data.items;
          this.filterSectorWWithStatus();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteSector(id: string) {
    console.log(id);
    this.sectorSrv.deleteSector(id).subscribe(
      (response) => {
        this.sectors = this.sectors.filter((sector) => sector._id !== id);
        this.filterSectorWWithStatus();
      }
    )
  }
}
