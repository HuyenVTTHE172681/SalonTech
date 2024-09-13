import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../model/employee';

enum StatusEmployee {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
}
@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrl: './employee-content.component.scss',
})
export class EmployeeContentComponent implements OnInit {
  page: number = 1;
  size: number = 1; // display 1 item per page
  status: number = StatusEmployee.ALL;
  employees: Employee[] = [];
  totalItems: number = 0;
  filteredEmployees: Employee[] = [];

  statuses = [
    { label: 'Tất cả', value: StatusEmployee.ALL },
    { label: 'Đang hoạt động', value: StatusEmployee.ACTIVE },
    { label: 'Dừng hoạt động', value: StatusEmployee.INACTIVE },
  ];

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

  constructor(private employeeSrv: EmployeeService) {}

  checked: boolean = false;

  // Handle status
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
    this.status = this.statuses[event.index].value;
    this.getAllEmployee();
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeSrv
      .getAllEmployee(this.page, this.size, this.status)
      .subscribe({
        next: (data) => {
          this.employees = data.items;
          this.totalItems = data.totalItems;
          this.filterEmployeesWithStatus();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  filterEmployeesWithStatus() {
    this.filteredEmployees =
      this.status === -1
        ? this.employees
        : this.employees.filter((employee) => employee.status === this.status);
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllEmployee();
    console.log(this.page);
  }
}
