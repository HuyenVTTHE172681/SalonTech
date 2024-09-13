import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../model/customer';

enum StatusSector {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
}
@Component({
  selector: 'app-customer-content',
  templateUrl: './customer-content.component.html',
  styleUrl: './customer-content.component.scss',
})
export class CustomerContentComponent implements OnInit {
  page: number = 1;
  size: number = 5;
  customerType: number = -1;
  status: number = StatusSector.ALL;
  totalItems: number = 0;
  customers: Customer[] = [];
  filterCustomers: Customer[] = [];

  statusList = [
    { name: 'Tất cả', value: StatusSector.ALL },
    { name: 'Đang hoạt động', value: StatusSector.ACTIVE },
    { name: 'Dừng hoạt động', value: StatusSector.INACTIVE },
  ];

  selectedStatus: any = this.statusList[0];

  constructor(private customerSrv: CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomer();
  }

  checked: boolean = false;
  date1: Date | undefined;
  date2: Date | undefined;

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
    this.status = this.selectedStatus.value;
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerSrv
      .getAllCustomer(this.page, this.size, this.status, this.customerType)
      .subscribe({
        next: (data) => {
          this.customers = data.items;
          console.log('Customer: ', this.customers);
          this.totalItems = data.totalItems;
          this.filteredCustomersWithStatus();
        },
        error: (err) => {
          console.log(err);
          console.log('Ahuhu');
        },
      });
  }

  filteredCustomersWithStatus() {
    this.filterCustomers =
      this.status === StatusSector.ALL
        ? this.customers
        : this.customers.filter((customer) => customer.status === this.status);
  }

  // Handle paginator
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllCustomer();
  }
}
