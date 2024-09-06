import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SalonAddInformationComponent } from '../salon-add-information/salon-add-information.component';
import { SalonAddAssignDataComponent } from '../salon-add-assign-data/salon-add-assign-data.component';
import { SalonAddIntroductionComponent } from '../salon-add-introduction/salon-add-introduction.component';
import { SalonAddManageWorkerComponent } from '../salon-add-manage-worker/salon-add-manage-worker.component';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../model/salon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salon-tabs',
  templateUrl: './salon-tabs.component.html',
  styleUrls: ['./salon-tabs.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
})
export class SalonTabsComponent {
  currentTab: string = 'information'; // Default tab
  salonData: Salon | null = null;
  salonTabs: any = {
    information: {},
    assignData: {},
    introduction: {},
    manageWorker: {},
  };

  constructor(private salonSrv: SalonService, private router: Router) {}

  @ViewChild(SalonAddInformationComponent)
  SalonAddInformationComponent!: SalonAddInformationComponent;

  @ViewChild(SalonAddAssignDataComponent)
  SalonAddAssignDataComponent!: SalonAddAssignDataComponent;

  @ViewChild(SalonAddIntroductionComponent)
  SalonAddIntroductionComponent!: SalonAddIntroductionComponent;

  @ViewChild(SalonAddManageWorkerComponent)
  SalonAddManageWorkerComponent!: SalonAddManageWorkerComponent;

  ngAfterViewInit(): void {
    // After the view has been initialized
    console.log('Child components initialized.');
  }

  switchTab(tab: string) {
    this.currentTab = tab;
  }

  saveData() {
    // Add salon data
    this.salonSrv.addSalon(this.salonData).subscribe({
      next: (res) => {
        console.log('Thêm thành công', res);
        this.router.navigate(['/salon']);
      },
      error: (err) => {
        console.error('Lỗi khi thêm salon:', err);
      },
    });
  }
}
