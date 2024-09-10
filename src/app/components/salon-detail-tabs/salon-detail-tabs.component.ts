import { Component, ViewChild } from '@angular/core';
import { Salon } from '../../model/salon';
import { SalonService } from '../../services/salon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonDetailInformationComponent } from '../salon-detail-information/salon-detail-information.component';
import { SalonDetailAssignDataComponent } from '../salon-detail-assign-data/salon-detail-assign-data.component';
import { SalonDetailIntroductionComponent } from '../salon-detail-introduction/salon-detail-introduction.component';
import { SalonDetailManageWorkerComponent } from '../salon-detail-manage-worker/salon-detail-manage-worker.component';

@Component({
  selector: 'app-salon-detail-tabs',
  templateUrl: './salon-detail-tabs.component.html',
  styleUrl: './salon-detail-tabs.component.scss',
})
export class SalonDetailTabsComponent {
  salonId: string = '';
  currentTab: string = 'information'; // Default tab
  salonData: Salon = new Salon();

  salonTabs: any = {
    information: {},
    assignData: {},
    introduction: {},
    manageWorker: {},
  };

  @ViewChild(SalonDetailInformationComponent)
  SalonDetailInformationComponent!: SalonDetailInformationComponent;

  @ViewChild(SalonDetailAssignDataComponent)
  SalonDetailAssignDataComponent!: SalonDetailAssignDataComponent;

  @ViewChild(SalonDetailIntroductionComponent)
  SalonDetailIntroductionComponent!: SalonDetailIntroductionComponent;

  @ViewChild(SalonDetailManageWorkerComponent)
  SalonDetailManageWorkerComponent!: SalonDetailManageWorkerComponent;

  constructor(
    private salonSrv: SalonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.salonId = this.route.snapshot.paramMap.get('id')!;
  }

  switchTab(tab: string) {
    this.currentTab = tab;
  }

  ngOnInit(): void {
    if (this.salonId) {
      this.getSalonDetail();
    }
  }

  getSalonDetail(): void {
    console.log(this.salonId);
    this.salonSrv.getSalonDetail(this.salonId).subscribe({
      next: (res) => {
        this.salonData = res;
      },
    });
  }
  onUpdateSalonServices(selectedServices: string[]): void {
    // Xử lý danh sách dịch vụ đã chọn và cập nhật salon nếu cần
    this.salonData.service_ids = selectedServices;
    console.log('Updated Services:', selectedServices);
  }

  // saveSalon(): void {
  //   const informationFormValue =
  //     this.SalonDetailInformationComponent.salonForm.value;

  //   // Convert the status fields to numbers
  //   if (informationFormValue.status) {
  //     informationFormValue.status = Number(informationFormValue.status);
  //   }
  //   const assignDataFormValue =
  //     this.SalonDetailAssignDataComponent.salonForm.value;

  //   const salonData = {
  //     ...informationFormValue,
  //     ...assignDataFormValue,
  //     service_ids: this.salonData.service_ids, // Include updated services
  //   };

  //   this.salonSrv.updateSalon(this.salonId, { ...salonData }).subscribe({
  //     next: (res) => {
  //       this.getSalonDetail();
  //       console.log('Update: ', this.salonData);
  //       alert('Update successfully');
  //       this.router.navigate(['/salon']);
  //     },
  //   });
  // }

  saveSalon(): void {
    // Ensure that the child components and their forms are initialized
    console.log(this.SalonDetailIntroductionComponent.salonForm.value);

    const informationFormValue =
      this.SalonDetailInformationComponent.salonForm.value;

    // Convert the status fields to numbers
    if (informationFormValue.status) {
      informationFormValue.status = Number(informationFormValue.status);
    }

    this.salonSrv
      .updateSalon(this.salonId, {
        ...informationFormValue,
        ...this.SalonDetailIntroductionComponent.salonForm.value,
      })
      .subscribe({
        next: (res) => {
          this.getSalonDetail();
          console.log('Update: ', this.salonData);
          alert('Update successfully');
          this.router.navigate(['/salon']);
        },
      });
  }

  onDeleteSalon(): void {
    this.salonSrv.deleteSalon(this.salonId).subscribe({
      next: (res) => {
        console.log('Delete successfully');
        this.router.navigate(['/salon']);
      },
    });
  }
}
