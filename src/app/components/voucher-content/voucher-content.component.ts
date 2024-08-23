import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../services/voucher.service';
import { Voucher } from '../../model/voucher';
import { IResponeList } from '../../model/common.model';

enum StatusVoucher {
  ALL = -1,
  HOME = 0,
  SALON = 1,
}

@Component({
  selector: 'app-voucher-content',
  templateUrl: './voucher-content.component.html',
  styleUrls: ['./voucher-content.component.scss'],
})
export class VoucherContentComponent implements OnInit {
  fromDate: string | null = null;
  toDate: string | null = null;
  page: number = 1;
  size: number = 5; // Display 5 items per page
  status: number = StatusVoucher.ALL;
  totalItems: number = 0;
  vouchers: Voucher[] = [];
  filteredVouchers: Voucher[] = [];

  checked: boolean = false;

  // Danh sách voucher
  statusVoucherList = [
    { name: 'Tất cả', value: StatusVoucher.ALL },
    { name: 'HOME', value: StatusVoucher.HOME },
    { name: 'SALON', value: StatusVoucher.SALON },
  ];
  selectedStatus: any = this.statusVoucherList[0];

  constructor(private voucherSrv: VoucherService) {}

  ngOnInit(): void {
    this.getAllVoucher();
  }

  // Handle status
  getStatus(status: number) {
    switch (status) {
      case 0:
        return 'Home';
      case 1:
        return 'Salon';
      default:
        return 'Nothing';
    }
  }

  filterStatus(event: any) {
    this.selectedStatus = this.statusVoucherList[event.index];
    this.getAllVoucher();
  }

  filterVouchersWithStatus() {
    this.filteredVouchers =
      this.status === -1
        ? this.vouchers
        : this.vouchers.filter((voucher) => voucher.status === this.status);
  }

  getAllVoucher() {
    this.voucherSrv
      .getAllVoucher(
        this.page,
        this.size,
        this.selectedStatus.value,
        this.fromDate,
        this.toDate
      )
      .subscribe({
        next: (data: IResponeList<Voucher>) => {
          this.vouchers = data.items;
          this.totalItems = data.totalItems;
          this.filterVouchersWithStatus();

          this.vouchers.forEach((voucher) => {
            if (voucher.salons && Array.isArray(voucher.salons)) {
              voucher.salonNames = voucher.salons
                .map((salon) => salon.name)
                .join('\r\n');
            } else {
              // voucher.salonNames = voucher.salons?.name || '';
              voucher.salonNames = '';
            }
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // Slice description
  sliceDescription(description: string) {
    if (description.length > 10) {
      return description.slice(0, 40) + '...';
    }
    return description;
  }

  // Format date dd/mm/yyyy
  formatDate(date: string | null) {
    if (date) {
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      return day + '/' + month + '/' + year;
    }
    return date;
  }

  // formatSalonNames(voucher: Voucher): string {
  //   if (voucher.salons && Array.isArray(voucher.salons)) {
  //     return voucher.salons.map((salon) => salon.name).join('\n');
  //   }
  //   return voucher.salons?.name || '';
  // }

  // Handle paginator

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllVoucher();
  }
}
