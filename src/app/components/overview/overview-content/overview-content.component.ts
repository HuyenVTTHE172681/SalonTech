import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-overview-content',
  templateUrl: './overview-content.component.html',
  styleUrl: './overview-content.component.scss',
})
export class OverviewContentComponent implements OnInit {
  data: any;
  fromDate: string = '2024-01-18';
  toDate: string = '2024-05-21';
  bookingTotal: string | null = null;

  options: any;

  constructor(
    private dashboard: DashboardService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    this.getDashboard();
  }

  // Phương thức format revenue
  formatRevenue(revenue: number): string {
    return revenue.toLocaleString('vi-VN');
  }

  getDashboard() {
    this.spinner.show();
    this.dashboard
      .getDashboard(this.fromDate, this.toDate)
      .subscribe((data) => {
        console.log('Date:', data);
        this.data = data;
        this.spinner.hide();
      });
  }
}
