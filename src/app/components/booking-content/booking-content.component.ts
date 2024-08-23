import { Component, OnInit } from '@angular/core';
import { Booking } from '../../model/booking';
import { IResponeList } from '../../model/common.model';
import { BookingService } from '../../services/booking.service';

enum StatusBooking {
  ALL = -1,
  CHECK_IN = 0,
  COMPLETED = 1,
  PENDING = 2,
  CANCELED = 3,
}

@Component({
  selector: 'app-booking-content',
  templateUrl: './booking-content.component.html',
  styleUrls: ['./booking-content.component.scss'],
})
export class BookingContentComponent implements OnInit {
  fromDate: string | null = null;
  toDate: string | null = null;
  page: number = 1;
  size: number = 2; // Display 2 items per page
  status: number = StatusBooking.ALL;
  bookingType: number = -1;

  bookings: Booking[] = [];
  totalItems: number = 0;

  // Danh sách trạng thái
  statusList = [
    { name: 'Tất cả', value: StatusBooking.ALL },
    { name: 'CHECK_IN', value: StatusBooking.CHECK_IN },
    { name: 'Hoàn thành', value: StatusBooking.COMPLETED },
    { name: 'Chờ duyệt', value: StatusBooking.PENDING },
    { name: 'Hủy', value: StatusBooking.CANCELED },
  ];

  selectedStatus: any = this.statusList[0];

  constructor(private bookingSrv: BookingService) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.getAllBooking();
  }

  // Status in table
  onStatusChange(event: any) {
    this.page = 1;
    console.log('Trạng thái đã được chọn: ', this.selectedStatus);
    this.getAllBooking();
  }

  // Get Booking call API
  getAllBooking() {
    this.bookingSrv
      .getAllBooking(
        this.page,
        this.size,
        this.selectedStatus.value,
        this.fromDate,
        this.toDate,
        this.bookingType
      )
      .subscribe({
        next: (data: IResponeList<Booking>) => {
          console.log('Booking:', data);
          this.bookings = data.items;
          this.totalItems = data.totalItems;

          // Print list services
          // this.bookings.forEach((booking) => {
          //   console.log(`Booking ID: ${booking._id}`);
          //   if (booking.services && booking.services.length > 0) {
          //     booking.services.map((service) => {
          //       console.log(`  - Dịch vụ: ${service.name}`);
          //     });
          //   } else {
          //     console.log('  - Không có dịch vụ nào.');
          //   }
          // });

          // Convert services to comma-separated string
          // Gọi list service name dự trên list id
          this.bookings.forEach((booking) => {
            booking.serviceNames = booking.services
              ?.map((service) => service.name)
              .join(', ');
          });

          // Print list sectors code
          this.bookings.forEach((booking) => {
            booking.services?.forEach((service) => {
              console.log(
                `  - Service: ${service.name}, Sector code: ${service.sector.code}`
              );
            });
          });

          // Convert sector code to comma-separated string
          // Gọi list sector code dự trên list id
          this.bookings.forEach((booking) => {
            booking.sectorCodes = booking.services
              ?.map((service) => service.sector.code.toUpperCase())
              .join(', ');
          });
        },

        error: (error) => {
          console.log(error);
          console.log('Ahuhu');
        },
      });
  }

  // Check box
  checked: boolean = false;

  // Handle paginator
  onPageChange(event: any) {
    this.page = event.first / event.rows + 1;
    this.getAllBooking();
    console.log(this.page);
  }
}
