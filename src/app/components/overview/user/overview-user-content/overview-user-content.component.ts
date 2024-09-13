import { Component, OnInit } from '@angular/core';
import { User } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';

enum StatusUser {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
  KEYWORD = 2,
}

@Component({
  selector: 'app-overview-user-content',
  templateUrl: './overview-user-content.component.html',
  styleUrl: './overview-user-content.component.scss',
})
export class OverviewUserContentComponent implements OnInit {
  page: number = 1;
  size: number = 5; // display 10 item per page
  status: number = StatusUser.ALL;
  users: User[] = [];
  totalItems: number = 0;
  filterUser: User[] = [];

  statusList = [
    { name: 'Tất cả', value: StatusUser.ALL },
    { name: 'Đang hoạt động', value: StatusUser.ACTIVE },
    { name: 'Dừng hoạt động', value: StatusUser.INACTIVE },
    { name: 'Khóa', value: StatusUser.KEYWORD },
  ];

  selectedStatus: any = this.statusList[0];

  checked: boolean = false;

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

  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Đang hoạt động';
      case 0:
        return 'Dừng hoạt động';
      default:
        return 'Khóa';
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
    this.page = 1;
    this.status = this.selectedStatus.value; // Cập nhật giá trị status
    this.getAllUser();
  }

  filterUserWithStatus() {
    this.filterUser =
      this.status === StatusUser.ALL
        ? this.users
        : this.users.filter((user) => user.status === this.status);
  }

  // Get All User
  getAllUser() {
    this.userSrv.getAllUser(this.page, this.size, this.status).subscribe({
      next: (data) => {
        this.users = data.items;
        console.log('User: ', this.users);
        this.totalItems = data.totalItems;
        this.filterUserWithStatus();
      },
      error: (err) => {
        console.log(err);
        console.log('Ahuhu');
      },
    });
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllUser();
  }
}
