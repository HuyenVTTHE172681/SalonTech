import { Component, OnInit } from '@angular/core';
import { Rate } from '../../../model/rate';
import { RateService } from '../../../services/rate.service';
@Component({
  selector: 'app-rate-content',
  templateUrl: './rate-content.component.html',
  styleUrl: './rate-content.component.scss',
})
export class RateContentComponent implements OnInit {
  fromDate: string | null = null;
  toDate: string | null = null;
  page: number = 1;
  size: number = 2; // Display 2 items per page
  status: number = -1;
  totalItems: number = 0;
  rates: Rate[] = [];

  constructor(private rateSrv: RateService) {}

  ngOnInit(): void {
    this.getAllRating();
  }

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

  getAllRating() {
    this.rateSrv.getAllRating(this.page, this.size, this.status).subscribe(
      (data) => {
        console.log('Rate:', data);
        this.rates = data.items;

        this.rates = data.items.map((item) => ({
          ...item,
          showComment: false,
        }));

        this.totalItems = data.totalItems;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Check box
  checked: boolean = false;

  // Pagination
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.getAllRating();
  }

  toggleComment(rate: any) {
    rate.showComment = !rate.showComment;
  }
}
