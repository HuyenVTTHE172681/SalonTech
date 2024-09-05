import { Component, ViewChild } from '@angular/core';
import { SalonAddInformationComponent } from '../salon-add-information/salon-add-information.component';
import { SalonAddAssignDataComponent } from '../salon-add-assign-data/salon-add-assign-data.component';
import { SalonAddIntroductionComponent } from '../salon-add-introduction/salon-add-introduction.component';
import { SalonAddManageWorkerComponent } from '../salon-add-manage-worker/salon-add-manage-worker.component';

@Component({
  selector: 'app-salon-tabs',
  templateUrl: './salon-tabs.component.html',
  styleUrl: './salon-tabs.component.scss',
})
export class SalonTabsComponent {
  salonTabs: any = {
    information: {},
    assignData: {},
    introduction: {},
    manageWorker: {},
  };

  currentTab: string = 'information'; // Tab mặc định

  // Sử dụng ViewChild để lấy dữ liệu từ component con
  @ViewChild(SalonAddInformationComponent)
  SalonAddInformationComponent!: SalonAddInformationComponent;

  @ViewChild(SalonAddAssignDataComponent)
  SalonAddAssignDataComponent!: SalonAddAssignDataComponent;

  @ViewChild(SalonAddIntroductionComponent)
  SalonAddIntroductionComponent!: SalonAddIntroductionComponent;

  @ViewChild(SalonAddManageWorkerComponent)
  SalonAddManageWorkerComponent!: SalonAddManageWorkerComponent;

  switchTab(tab: string) {
    this.currentTab = tab;
  }

  saveData() {
    // Lấy dữ liệu từ component con
    // this.salonTabs.information = this.SalonAddInformationComponent.getData();
    this.salonTabs.assignData =
      this.SalonAddAssignDataComponent.getAllSectorTree();
    // this.salonTabs.gioiThieu = this.gioiThieuComponent.getData();
    // this.salonTabs.quanLyTho = this.quanLyThoComponent.getData();
  }
}
