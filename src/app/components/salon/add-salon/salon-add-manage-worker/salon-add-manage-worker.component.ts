import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-salon-add-manage-worker',
  templateUrl: './salon-add-manage-worker.component.html',
  styleUrl: './salon-add-manage-worker.component.scss',
})
export class SalonAddManageWorkerComponent implements OnInit {
  page: number = 1;
  size: number = 1; // display 1 item per page
  status: number = 1;
  employees: any[] = [];
  selectedEmployee: any = null;

  constructor(private employeeSrv: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeSrv
      .getAllEmployee(this.page, this.size, this.status)
      .subscribe({
        next: (data) => {
          console.log('Employee: ', data);
          this.employees = data.items;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  showEmployeeById(employeeId: string) {
    this.employeeSrv.getEmployeeById(employeeId).subscribe({
      next: (data) => {
        console.log('Employee: ', data);
        this.selectedEmployee = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
