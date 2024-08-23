import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../model/customer';

enum StatusCustomer {
  All = -1,
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
  size: number = 3;
  customerType: number = -1;
  status: number = StatusCustomer.All;
  totalItems: number = 0;
  customers: Customer[] = [];
  filterCustomers: Customer[] = [];

  statusList = [
    { label: 'Tất cả', value: StatusCustomer.All },
    { label: 'Online', value: StatusCustomer.ACTIVE },
    { label: 'Offline', value: StatusCustomer.INACTIVE },
  ];
  constructor(private customerSrv: CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomer();
  }

  checked: boolean = false;
  date1: Date | undefined;
  date2: Date | undefined;

  getStatus(status: number) {
    switch (status) {
      case 1:
        return 'Online';
      case 0:
        return 'Offline';
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
    this.status = this.statusList[event.index].value;
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerSrv
      .getAllCustomer(this.page, this.size, this.status, this.customerType)
      .subscribe({
        next: (data) => {
          this.customers = data.items;
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
      this.status === -1
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
