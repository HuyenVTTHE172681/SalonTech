import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { plugins } from 'chart.js';

@Component({
  selector: 'app-overview-content',
  templateUrl: './overview-content.component.html',
  styleUrl: './overview-content.component.scss',
})
export class OverviewContentComponent implements OnInit {
  fromDate: string = '2024-01-18';
  toDate: string = '2024-05-21';
  bookingTotal: string | null = null;

  constructor(
    private dashboard: DashboardService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.getDashboard();
    this.getChart();
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

  // dashboarData: any = null;

  options: any;
  data: any;
  // dashboarData: any = null;

  getChart(): void {
    this.dashboard.getDashboardChart('2024-04-10', '2024-05-20').subscribe(
      (response) => {
        console.log('Chart:', response);
        this.processChartData(response);
      },
      (error) => {
        console.error('Failed to get chart data:', error);
      }
    );
  }

  processChartData(dashboarData: any): void {
    const documentStyle = getComputedStyle(document.documentElement);

    // Extracting and formatting months from labels (assuming labels are dates in 'YYYY-MM-DD' format)
    const labels = dashboarData.chartData.labels.map((label: string) => {
      const date = new Date(label);
      return date.toLocaleString('default', { month: 'long' }); // 'long' gives full month names (e.g., April)
    });

    // Removing duplicate months
    const uniqueLabels = Array.from(new Set(labels));

    // Assuming the data for "Số đơn" and "Doanh thu" are at index 0 and 1 respectively in the datasets array
    const ordersData = dashboarData.chartData.datasets[0].data;
    const revenueData = dashboarData.chartData.datasets[1].data;

    console.log('Unique Labels:', uniqueLabels); // Check if labels are correctly retrieved
    console.log('Orders Data:', ordersData); // Check if data is properly retrieved
    console.log('Revenue Data:', revenueData);

    this.data = {
      labels: uniqueLabels,
      datasets: [
        {
          type: 'line',
          label: 'Số đơn',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: ordersData,
        },
        {
          type: 'bar',
          label: 'Doanh thu',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: revenueData, // Example static data
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: documentStyle.getPropertyValue('--text-color'),
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: documentStyle.getPropertyValue('--text-color-secondary'),
          },
          grid: {
            color: documentStyle.getPropertyValue('--surface-border'),
          },
        },
        y: {
          ticks: {
            color: documentStyle.getPropertyValue('--text-color-secondary'),
          },
          grid: {
            color: documentStyle.getPropertyValue('--surface-border'),
          },
        },
      },
    };
  }
}
