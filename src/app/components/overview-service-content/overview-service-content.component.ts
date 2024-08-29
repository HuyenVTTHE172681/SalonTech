import { Component, OnInit } from '@angular/core';
import { Sector } from '../../model/sector';
import { SectorService } from '../../services/sector.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  size: number = 5; // display 10 item per page
  status: number = StatusSector.ALL;
  sectors: Sector[] = [];
  filteredSectors: Sector[] = [];
  totalItems: number = 0;
  activeIndex: number = 0;

  statusList = [
    { name: 'Tất cả', value: StatusSector.ALL },
    { name: 'Đang hoạt động', value: StatusSector.ACTIVE },
    { name: 'Dừng hoạt động', value: StatusSector.INACTIVE },
  ];

  selectedStatus: any = this.statusList[0];

  constructor(
    private sectorSrv: SectorService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.selectedStatus =
      this.statusList.find((status) => status.value === this.status) ||
      this.statusList[0];
    this.getAllSector();
  }

  getStatus(status: number): string {
    return status === 1 ? 'Đang hoạt động' : 'Dừng hoạt động';
  }

  // getStyle(status: number) {
  //   switch (status) {
  //     case 1:
  //       return 'success';
  //     case 0:
  //       return 'danger';
  //     default:
  //       return 'warning';
  //   }
  // }

  getStyle(status: number) {
    switch (status) {
      case 1:
        return 'success';
      default:
        return 'danger';
    }
  }

  filterStatus(event: any) {
    this.page = 1;
    this.status = this.selectedStatus.value; // Cập nhật giá trị status
    this.getAllSector();
  }

  filterSectorWithStatus() {
    this.filteredSectors =
      this.status === StatusSector.ALL
        ? this.sectors
        : this.sectors.filter((sector) => sector.status === this.status);
  }

  getAllSector() {
    this.sectorSrv.getAllSector(this.page, this.size, this.status).subscribe({
      next: (data) => {
        this.sectors = data.items;
        console.log(data);
        this.totalItems = data.totalItems;
        this.filterSectorWithStatus();
      },
      error: (err) => {
        console.log(err);
        console.log('Ahuhu');
      },
    });
  }

  deleteSector(id: string) {
    console.log(id);
    this.sectorSrv.deleteSector(id).subscribe((response) => {
      this.sectors = this.sectors.filter((sector) => sector._id !== id);
      this.filterSectorWithStatus();
    });
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllSector();
  }
}
