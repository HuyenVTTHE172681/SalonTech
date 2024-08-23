import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../model/salon';

enum StatusSalon {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
}
@Component({
  selector: 'app-salon-content',
  templateUrl: './salon-content.component.html',
  styleUrls: ['./salon-content.component.scss'],
})
export class SalonContentComponent implements OnInit {
  page: number = 1;
  size: number = 1; // display 1 item per page
  status: number = StatusSalon.ALL;
  salons: Salon[] = [];
  filteredSalons: Salon[] = [];
  totalItems: number = 0;
  statuses = [
    { label: 'Tất cả', value: StatusSalon.ALL },
    { label: 'Đang hoạt động', value: StatusSalon.ACTIVE },
    { label: 'Dừng hoạt động', value: StatusSalon.INACTIVE },
  ];

  constructor(private salonSrv: SalonService) {}

  ngOnInit() {
    this.getAllSalon();
  }

  items: any[] = [
    {
      label: 'Xuất Excel',
      items: [
        {
          label: 'Import',
          icon: 'pi pi-cloud-download',
        },
        {
          label: 'Export',
          icon: 'pi pi-cloud-upload',
        },
      ],
    },
  ];

  checked: boolean = false;

  filterStatus(event: any) {
    this.status = this.statuses[event.index].value;
    this.getAllSalon();
  }

  // Get status
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
  // Get style for status
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

  // Get all salon
  getAllSalon() {
    this.salonSrv.getAllSalon(this.page, this.size, this.status).subscribe({
      next: (data) => {
        this.salons = data.items;
        this.totalItems = data.totalItems;
        this.filterSalons();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterSalons() {
    this.filteredSalons =
      this.status === -1
        ? this.salons
        : this.salons.filter((salon) => salon.status === this.status);
  }

  // Handle paginator
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllSalon(); // Fetch the salons for the new page and size
    console.log(this.page);
  }
}
