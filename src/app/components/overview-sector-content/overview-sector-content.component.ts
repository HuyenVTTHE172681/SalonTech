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
  service: Service[] = [];
  sector_id: string = '';
  totalItems: number = 0;

  statusList = [
    { name: 'Tất cả', value: StatusService.ALL },
    { name: 'Đang hoạt động', value: StatusService.ACTIVE },
    { name: 'Dừng hoạt động', value: StatusService.INACTIVE },
  ];

  selectedStatus: any = this.statusList[0];

  constructor(private serviceSrv: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllService();
  }

  filterStatus(event: any) {
    this.page = 1;
    this.status = this.selectedStatus.value;
    this.getAllService();
  }

  getStatus(status: number): string {
    return status === 1 ? 'Đang hoạt động' : 'Dừng hoạt động';
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

  getAllService() {
    this.serviceSrv
      .getAllService(this.page, this.size, this.status, this.sector_id)
      .subscribe({
        next: (data) => {
          this.service = data.items;
          this.totalItems = data.totalItems;
        },
        error: (error) => {
          console.log(error);
          console.log('Ahuhu');
        },
      });
  }

  deleteService(id: string) {
    this.serviceSrv.deleteService(id).subscribe((res) => {
      this.service = this.service.filter((service) => service._id !== id);
    });
  }

  // Handel paginator
  onPageChange(event: any) {
    this.page = event.first / event.rows + 1;
    this.getAllService();
  }
}
