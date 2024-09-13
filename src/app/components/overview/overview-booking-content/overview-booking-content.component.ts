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
  selector: 'app-overview-booking-content',
  templateUrl: './overview-booking-content.component.html',
  styleUrls: ['./overview-booking-content.component.scss'],
})
export class OverviewBookingContentComponent implements OnInit {
  fromDate: string = '2024-04-01';
  toDate: string = '2024-04-30';
  booking_type: number = BookingType.ALL;
  status: number = StatusBooking.ALL;
  page: number = 1;
  pageSize: number = 5;
  bookingData: any[] = []; // Ensure this is an array
  filterBookingData: any[] = [];
  totalItems: number = 0;

  bookingTypeList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Online', value: 0 },
    { name: 'Offline', value: 1 },
  ];

  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Hoàn thành', value: 1 },
    { name: 'Đã hủy', value: 2 },
  ];

  dateList = [
    { name: 'Tuần này', value: -1 },
    { name: 'Tháng này', value: 0 },
    { name: '3 tháng gần đây', value: 1 },
  ];

  selectedStatus: any = this.statusList[0];
  selectedBookingType: any = this.bookingTypeList[0];
  selectedDate: any = this.dateList[0];

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

  getBookingType(status: number) {
    switch (status) {
      case 1:
        return 'Hoàn thành';
      case 2:
        return 'Đã hủy';
      default:
        return 'Nothing';
    }
  }

  constructor(private bookingDashboardsrv: DashboardService) {}

  ngOnInit(): void {
    this.getBookingDashboard();
  }

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

  getBookingDashboard() {
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
        this.bookingData = data; // Ensure this is the correct structure
        console.log('Booking Data:', this.bookingData);
        this.totalItems = data.totalItems;
        this.filterBookingWithStatusAndType();
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

  filterStatus(event: any) {
    this.page = 1;
    this.status = this.selectedStatus.value;
    this.filterBookingWithStatusAndType(); // Filter based on new status
  }

  filterBookingType(event: any) {
    this.page = 1;
    this.booking_type = this.selectedBookingType.value;
    this.filterBookingWithStatusAndType(); // Filter based on new booking type
  }

  filterBookingWithStatusAndType() {
    console.log('Current Status:', this.status); // Debugging
    console.log('Current Booking Type:', this.booking_type); // Debugging

    this.filterBookingData = this.bookingData.filter((booking: any) => {
      // Ensure booking.status and booking.bookingType exist and are numbers
      const matchesStatus =
        this.status === StatusBooking.ALL || booking.status === this.status;
      const matchesType =
        this.booking_type === BookingType.ALL ||
        booking.bookingType === this.booking_type;

      return matchesStatus && matchesType;
    });

    console.log('Filtered Booking Data:', this.filterBookingData); // Debugging
  }

  // Handel paginator
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.pageSize = event.rows;
    this.getBookingDashboard();
  }
}
