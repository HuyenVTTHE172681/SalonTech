import { Component, ViewChild } from '@angular/core';
import { User } from '../../model/user';
import { OverviewUserDetailComponent } from '../overview-user-detail/overview-user-detail.component';
import { OverviewUserAssignDataComponent } from '../overview-user-assign-data/overview-user-assign-data.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-overview-user-tabs',
  templateUrl: './overview-user-tabs.component.html',
  styleUrl: './overview-user-tabs.component.scss',
})
export class OverviewUserTabsComponent {
  currentTab: string = 'information'; // Default tab
  newUserData: User = new User();
  userId: string = '';

  salonTabs: any = {
    information: {},
    assignData: {},
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSrv: UserService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }

  @ViewChild(OverviewUserDetailComponent)
  OverviewUserDetailComponent!: OverviewUserDetailComponent;

  @ViewChild(OverviewUserAssignDataComponent)
  OverviewUserAssignDataComponent!: OverviewUserAssignDataComponent;

  switchTab(tab: string) {
    this.currentTab = tab;
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getUserDetail();
    }
  }

  ngAfterViewInit(): void {
    // After the view has been initialized
    console.log('Child components initialized.');
  }

  onCancel(): void {
    this.router.navigate(['/home/overview-user']);
  }

  onDeleteUser(): void {
    this.userSrv.deleteUser(this.userId).subscribe({
      next: (res) => {
        alert('Delete successfully');
        this.router.navigate(['/home/overview-user']);
      },
    });
  }

  getUserDetail(): void {
    console.log(this.userId);
    this.userSrv.getUserById(this.userId).subscribe({
      next: (res) => {
        this.newUserData = res;
        console.log(this.newUserData);
      },
    });
  }

  onUpdateUserMenu(selectedMenu: string[]): void {
    this.newUserData.menu_ids = selectedMenu;
    console.log('Updated Menu:', selectedMenu);
  }

  saveUser(): void {
    // Ensure that the child components and their forms are initialized
    console.log(this.OverviewUserDetailComponent.userForm.value);

    const informationFormValue =
      this.OverviewUserDetailComponent.userForm.value;

    // Convert the status fields to numbers
    if (informationFormValue.status) {
      informationFormValue.status = Number(informationFormValue.status);
    }

    this.userSrv.updateUser(informationFormValue).subscribe({
      next: (res) => {
        this.getUserDetail();
        console.log('Update: ', this.newUserData);
        alert('Update successfully');
        this.router.navigate(['/home/overview-user']);
      },
    });
  }
}
