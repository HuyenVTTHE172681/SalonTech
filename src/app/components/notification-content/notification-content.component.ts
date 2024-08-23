import { Component, OnInit } from '@angular/core';

interface Notification {
  title: string;
  description: string;
  createdAt: Date;
  applyAt: Date;
  status: number; // 1: Khách hàng, 2: Thợ, 3: Salon
}

@Component({
  selector: 'app-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrl: './notification-content.component.scss',
})
export class NotificationContentComponent implements OnInit {
  page: number = 1;
  size: number = 2; // Display 2 items per page
  status: number = -1;
  fromDate: string | null = null;
  toDate: string | null = null;
  totalItems: number = 0;
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];

  checked: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.notifications = this.createNotifications();
    this.totalItems = this.notifications.length;
    this.filterNotificationsWithStatus();
  }

  // Danh sách status notification
  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Khách hàng', value: 1 },
    { name: 'Thợ', value: 2 },
    { name: 'Salon', value: 3 },
  ];

  selectedStatus: any = this.statusList[0];

  getStatus(status: number) {
    switch (status) {
      case 1:
        return 'Khách hàng';
      case 2:
        return 'Thợ';
      case 3:
        return 'Salon';
      default:
        return 'Nothing';
    }
  }

  onStatusChange(event: any) {
    this.selectedStatus = this.statusList[event.index];
    this.filterNotificationsWithStatus();
  }

  filterNotificationsWithStatus() {
    this.filteredNotifications =
      this.status === -1
        ? this.notifications
        : this.notifications.filter(
            (notification) => notification.status === this.status
          );

    this.totalItems = this.filteredNotifications.length;
    this.updateNotifications();
  }

  sliceDescription(description: string) {
    if (description.length > 10) {
      return description.slice(0, 40) + '...';
    }
    return description;
  }

  formatDate(date: Date | null): string {
    if (date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return '';
  }

  // Data notification
  createNotifications(): Notification[] {
    return [
      {
        title: 'Thông báo bảo trì hệ thống',
        description:
          'Hệ thống sẽ được bảo trì vào lúc 2:00 AM ngày 25/08/2024. Vui lòng lưu ý.',
        createdAt: new Date('2024-08-23T10:30:00'),
        applyAt: new Date('2024-08-25T02:00:00'),
        status: 1, // Khách hàng
      },
      {
        title: 'Khuyến mãi đặc biệt mùa hè',
        description:
          'Giảm giá 20% cho tất cả dịch vụ từ ngày 01/09/2024 đến 10/09/2024.',
        createdAt: new Date('2024-08-22T14:45:00'),
        applyAt: new Date('2024-09-01T00:00:00'),
        status: 2, // Thợ
      },
      {
        title: 'Thông báo cập nhật ứng dụng',
        description:
          'Ứng dụng sẽ có phiên bản mới vào ngày 30/08/2024 với nhiều tính năng hấp dẫn.',
        createdAt: new Date('2024-08-20T16:00:00'),
        applyAt: new Date('2024-08-30T00:00:00'),
        status: 3, // Salon
      },
    ];
  }

  updateNotifications() {
    const start = (this.page - 1) * this.size;
    const end = start + this.size;
    this.filteredNotifications = this.notifications.slice(start, end);
  }
  // Handle paginator
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.updateNotifications(); // Fetch the salons for the new page and size
    console.log(this.page);
  }
}
