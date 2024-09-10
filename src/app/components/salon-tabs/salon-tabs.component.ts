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
  salonData: Salon = new Salon();
  salonTabs: any = {
    information: {},
    assignData: {},
    introduction: {},
    manageWorker: {},
  };
  selectedServiceIds: string[] = [];

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

  // addSalon(): void {
  //   const informationFormValue =
  //     this.SalonAddInformationComponent.salonForm.value;

  //   if (informationFormValue.status) {
  //     informationFormValue.status = Number(informationFormValue.status);
  //   }

  //   this.salonSrv
  //     .addSalon({
  //       ...informationFormValue,
  //       ...this.SalonAddIntroductionComponent.salonForm.value,
  //     })
  //     .subscribe({
  //       next: (res) => {
  //         console.log('Add successfully');
  //         this.router.navigate(['/salon']);
  //       },
  //     });
  // }

  addSalon(): void {
    const informationFormValue =
      this.SalonAddInformationComponent.salonForm.value;

    if (informationFormValue.status) {
      informationFormValue.status = Number(informationFormValue.status);
    }

    // const assignData = this.SalonAddAssignDataComponent.salonForm.value;
    // if(assignData.) {

    // }

    const salonData = {
      ...informationFormValue,
      ...this.SalonAddIntroductionComponent.salonForm.value,
      service_ids: this.selectedServiceIds, // Include selected services
    };

    this.salonSrv.addSalon(salonData).subscribe({
      next: (res) => {
        console.log('Add successfully');
        console.log(salonData);
        this.router.navigate(['/salon']);
      },
      error: (err) => {
        console.error('Error adding salon:', err);
      },
    });
  }

  handleUpdateSalonServices(serviceIds: string[]) {
    console.log('Selected services:', serviceIds);
    this.selectedServiceIds = serviceIds; // Update selected services
  }
}
