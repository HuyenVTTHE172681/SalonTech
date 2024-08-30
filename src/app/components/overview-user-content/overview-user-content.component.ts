import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-user-content',
  templateUrl: './overview-user-content.component.html',
  styleUrl: './overview-user-content.component.scss',
})
export class OverviewUserContentComponent implements OnInit {
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
