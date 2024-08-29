import { Component, OnInit } from '@angular/core';
import { Service } from '../../model/service';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

enum StatusService {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
}

@Component({
  selector: 'app-overview-sector-content',
  templateUrl: './overview-sector-content.component.html',
  styleUrl: './overview-sector-content.component.scss',
})
export class OverviewSectorContentComponent implements OnInit {
  page: number = 1;
  size: number = 3; // display 10 item per page
  status: number = StatusService.ALL;
  services: Service[] = [];
  sector_id: string = '';
  totalItems: number = 0;
  filterService: Service[] = [];

  statusList = [
    { name: 'Tất cả', value: StatusService.ALL },
    { name: 'Đang hoạt động', value: StatusService.ACTIVE },
    { name: 'Dừng hoạt động', value: StatusService.INACTIVE },
  ];

  selectedStatus: any = this.statusList[0];

  constructor(private serviceSrv: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.selectedStatus =
      this.statusList.find((status) => status.value === this.status) ||
      this.statusList[0];
    this.getAllService();
  }

  getStatus(status: number): string {
    return status === StatusService.ACTIVE ? 'Đang hoạt động' : 'Dừng hoạt động';
  }

  getStyle(status: number) {
    switch (status) {
      case StatusService.ACTIVE:
        return 'success';
      default:
        return 'danger';
    }
  }

  filterStatus(event: any) {
    this.page = 1;
    this.status = this.selectedStatus.value; // Cập nhật giá trị status
    this.getAllService();
  }

  filterServiceWithStatus() {
    this.filterService =
      this.status === StatusService.ALL
        ? this.services
        : this.services.filter((service) => service.status === this.status);
  }

  getAllService() {
    this.serviceSrv
      .getAllService(this.page, this.size, this.status, this.sector_id)
      .subscribe({
        next: (data) => {
          this.services = data.items;
          this.totalItems = data.totalItems;
          this.filterServiceWithStatus();
        },
        error: (error) => {
          console.log(error);
          console.log('Ahuhu');
        },
      });
  }

  deleteService(id: string) {
    this.serviceSrv.deleteService(id).subscribe((res) => {
      this.services = this.services.filter((service) => service._id !== id);
      this.filterServiceWithStatus();
    });
  }

  // Handel paginator
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllService();
  }
}
