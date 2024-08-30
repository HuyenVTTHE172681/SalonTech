import { Component, OnInit } from '@angular/core';
import { Service } from '../../model/service';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { Sector } from '../../model/sector';
import { SectorService } from '../../services/sector.service';

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
  size: number = 5; // display 10 item per page
  status: number = StatusService.ALL;
  services: Service[] = [];
  sector_id: string = '';
  totalItems: number = 0;
  filterService: Service[] = [];
  sector: Sector[] = [];

  statusList = [
    { name: 'Tất cả', value: StatusService.ALL },
    { name: 'Đang hoạt động', value: StatusService.ACTIVE },
    { name: 'Dừng hoạt động', value: StatusService.INACTIVE },
  ];

  selectedStatus: any = this.statusList[0];

  constructor(
    private serviceSrv: ServiceService,
    private router: Router,
    private sectorSrv: SectorService
  ) {}

  ngOnInit(): void {
    this.selectedStatus =
      this.statusList.find((status) => status.value === this.status) ||
      this.statusList[0];
    this.getAllService();
  }

  // getStatus(status: number): string {
  //   switch (status) {
  //     case 1:
  //       return 'Đang hoạt động';
  //     case 0:
  //       return 'Dừng hoạt động';
  //     default:
  //       return 'Không xác định'; // Giá trị mặc định nếu không khớp với trạng thái
  //   }
  // }

  getStatus(status: number): string {
    return status === 1 ? 'Đang hoạt động' : 'Dừng hoạt động';
  }

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
    // this.status = Number(this.selectedStatus.value); // Chuyển đổi chuỗi thành số
    this.status = this.selectedStatus.value;
    this.getAllService();
  }

  filterServiceWithStatus() {
    console.log('Current Status:', this.status); // Debugging
    this.filterService =
      this.status === StatusService.ALL
        ? this.services
        : this.services.filter((service) => {
            console.log('Service Status:', service.status); // Debugging
            // Chuyển đổi trạng thái của dịch vụ thành số trước khi so sánh
            return service.status === this.status;
          });
  }
  getAllService() {
    this.serviceSrv
      .getAllService(this.page, this.size, this.status, this.sector_id)
      .subscribe({
        next: (data) => {
          this.services = data.items;
          this.totalItems = data.totalItems;
          console.log('Service: ', this.services);
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

  getAllSector() {
    this.sectorSrv.getAllSector(this.page, this.size, this.status).subscribe({
      next: (data) => {
        this.sector = data.items;
        console.log('Sector: ', this.sector);
        this.totalItems = data.totalItems;
      },
      error: (err) => {
        console.log(err);
        console.log('Ahuhu');
      },
    });
  }
}
