import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../../services/salon.service';
import { Salon } from '../../../model/salon';
import { Sector } from '../../../model/sector';
import { FormGroup } from '@angular/forms';

enum StatusSalon {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
  PENDING = 2,
}
@Component({
  selector: 'app-salon-content',
  templateUrl: './salon-content.component.html',
  styleUrls: ['./salon-content.component.scss'],
})
export class SalonContentComponent implements OnInit {
  page: number = 1;
  size: number = 4; // display 1 item per page
  status: number = StatusSalon.ALL;
  salons: Salon[] = [];
  filteredSalons: Salon[] = [];
  totalItems: number = 0;
  searchText: string = '';
  statuses = [
    { label: 'Tất cả', value: StatusSalon.ALL },
    { label: 'Đang hoạt động', value: StatusSalon.ACTIVE },
    { label: 'Dừng hoạt động', value: StatusSalon.INACTIVE },
    { label: 'Đang chờ duyệt', value: StatusSalon.PENDING },
  ];

  constructor(private salonSrv: SalonService) {}

  ngOnInit() {
    this.getAllSalon();
  }

  onSearchChange() {
    this.page = 1;
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
      case 2:
        return 'Đang chờ duyệt';
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
      case 2:
        return 'warning';
      default:
        return 'warning';
    }
  }

  // Get all salon
  // Get all salons, including search
  getAllSalon() {
    this.salonSrv
      .getAllSalon(this.page, this.size, this.status, this.searchText)
      .subscribe({
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

  approveSalon(salon: any) {
    const confirmApproval = confirm('Bạn muốn duyệt salon vào hệ thống không?');

    if (confirmApproval) {
      salon.status = 1; // Set the status to approved (1)
      console.log(
        'Updating salon with ID:',
        salon._id,
        'to status:',
        salon.status
      ); // Debugging

      console.log('Approving salon...', salon);
      this.salonSrv.updateSalonStatus(salon._id, salon.status).subscribe(
        (response) => {
          console.log('Salon approved successfully', response);
          this.getAllSalon(); // Refresh list
        },
        (error) => {
          console.error('Error approving salon', error);
        }
      );
    } else {
      console.log('Approval canceled');
    }
  }
}
