import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-booking-content',
  templateUrl: './overview-booking-content.component.html',
  styleUrl: './overview-booking-content.component.scss',
})
export class OverviewBookingContentComponent implements OnInit {
  fromDate: string = '2024-04-01';
  toDate: string = '2024-04-31';

  constructor() {}

  ngOnInit(): void {}

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
}
