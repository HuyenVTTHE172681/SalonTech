import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForumComponent } from './components/forum/forum.component';
import { OverviewServiceAddComponent } from './components/overview-service-add/overview-service-add.component';
import { OverviewServiceEditComponent } from './components/overview-service-edit/overview-service-edit.component';
import { OverviewSectorContentComponent } from './components/overview-sector-content/overview-sector-content.component';
import { OverviewSectorAddComponent } from './components/overview-sector-add/overview-sector-add.component';
import { OverviewSectorEditComponent } from './components/overview-sector-edit/overview-sector-edit.component';
import { OverviewUserContentComponent } from './components/overview-user-content/overview-user-content.component';
import { OverviewUserDetailComponent } from './components/overview-user-detail/overview-user-detail.component';
import { OverviewUserAddComponent } from './components/overview-user-add/overview-user-add.component';
import { OverviewContentComponent } from './components/overview-content/overview-content.component';
import { OverviewServiceContentComponent } from './components/overview-service-content/overview-service-content.component';
import { BookingContentComponent } from './components/booking-content/booking-content.component';
import { CustomerContentComponent } from './components/customer-content/customer-content.component';
import { EmployeeContentComponent } from './components/employee-content/employee-content.component';
import { SalonContentComponent } from './components/salon-content/salon-content.component';
import { VoucherContentComponent } from './components/voucher-content/voucher-content.component';
import { RateContentComponent } from './components/rate-content/rate-content.component';
import { NotificationContentComponent } from './components/notification-content/notification-content.component';
import { OverviewBookingContentComponent } from './components/overview-booking-content/overview-booking-content.component';
import { OverviewRevenueContentComponent } from './components/overview-revenue-content/overview-revenue-content.component';
import { SalonAddComponent } from './components/salon-add/salon-add.component';
import { SalonAddSectorComponent } from './components/salon-add-sector/salon-add-sector.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: OverviewContentComponent,
  },
  {
    path: 'booking',
    component: BookingContentComponent,
  },
  {
    path: 'customer',
    component: CustomerContentComponent,
  },
  {
    path: 'salon',
    component: SalonContentComponent,
  },
  {
    path: 'employee',
    component: EmployeeContentComponent,
  },
  {
    path: 'voucher',
    component: VoucherContentComponent,
  },
  {
    path: 'rate',
    component: RateContentComponent,
  },
  {
    path: 'forum',
    component: ForumComponent,
  },
  {
    path: 'notification',
    component: NotificationContentComponent,
  },
  {
    path: 'home/overview-service',
    component: OverviewServiceContentComponent,
  },
  {
    path: 'home/overview-service/add-service',
    component: OverviewServiceAddComponent,
  },
  {
    path: 'home/overview-service/edit-service/:id',
    component: OverviewServiceEditComponent,
  },
  {
    path: 'home/overview-sector',
    component: OverviewSectorContentComponent,
  },
  {
    path: 'home/overview-sector/add-sector',
    component: OverviewSectorAddComponent,
  },
  {
    path: 'home/overview-sector/edit-sector/:id',
    component: OverviewSectorEditComponent,
  },
  {
    path: 'home/overview-user',
    component: OverviewUserContentComponent,
  },
  {
    path: 'home/overview-user/edit-user/:id',
    component: OverviewUserDetailComponent,
  },
  {
    path: 'home/overview-user/add-user',
    component: OverviewUserAddComponent,
  },
  {
    path: 'home/overview-booking',
    component: OverviewBookingContentComponent,
  },
  {
    path: 'home/overview-revenue',
    component: OverviewRevenueContentComponent,
  },
  {
    path: 'salon/add-salon',
    component: SalonAddComponent,
  },
  {
    path: 'salon/add-salon/sector',
    component: SalonAddSectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
