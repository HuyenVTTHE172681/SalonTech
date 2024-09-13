import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

enum BookingType {
  ALL = -1,
  ONLINE = 0,
  OFFLINE = 1,
}

enum StatusBooking {
  ALL = -1,
  COMPLETED = 1,
  CANCELED = 2,
}

@Component({
  selector: 'app-overview-revenue-content',
  templateUrl: './overview-revenue-content.component.html',
  styleUrl: './overview-revenue-content.component.scss',
})
export class OverviewRevenueContentComponent implements OnInit {
  fromDate: string = '2024-04-01';
  toDate: string = '2024-04-30';
  booking_type: number = BookingType.ALL;
  status: number = StatusBooking.ALL;
  page: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  revenueData: any[] = []; // Ensure this is an array

  dateList = [
    { name: 'Tuần này', value: -1 },
    { name: 'Tháng này', value: 0 },
    { name: '3 tháng gần đây', value: 1 },
  ];

  selectedDate: any = this.dateList[0];

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

  getStatus(status: number) {
    switch (status) {
      case 0:
        return 'Online';
      case 1:
        return 'Offline';
      default:
        return 'Nothing';
    }
  }

  getStyle(status: number) {
    switch (status) {
      case 0:
        return 'success';
      case 1:
        return 'danger';
      default:
        return 'warning';
    }
  }

  constructor(private bookingDashboardsrv: DashboardService) {}

  ngOnInit(): void {
    this.getRevenueDashboard();
  }

  getRevenueDashboard() {
    this.bookingDashboardsrv
      .getBookingDashboard(
        this.fromDate,
        this.toDate,
        this.booking_type,
        this.status,
        this.page,
        this.pageSize
      )
      .subscribe((data) => {
        this.revenueData = data; // Ensure this is the correct structure
        console.log('Booking Data:', this.revenueData);
        this.totalItems = data.totalItems;
      });
  }

  formatDate(date: string | null) {
    if (date) {
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      return day + '/' + month + '/' + year;
    }
    return date;
  }

  // Handel paginator
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.pageSize = event.rows;
    this.getRevenueDashboard();
  }
}
