import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerContentComponent } from './components/customer/customer-content/customer-content.component';
import { EmployeeContentComponent } from './components/employee/employee-content/employee-content.component';
import { SalonContentComponent } from './components/salon/salon-content/salon-content.component';
import { NotificationContentComponent } from './components/notification/notification-content/notification-content.component';
import { SalonTabsComponent } from './components/salon/add-salon/salon-tabs/salon-tabs.component';
import { SalonDetailTabsComponent } from './components/salon/edit-salon/salon-detail-tabs/salon-detail-tabs.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { OverviewUserTabsComponent } from './components/overview/user/overview-user-tabs/overview-user-tabs.component';
import { OverviewContentComponent } from './components/overview/overview-content/overview-content.component';
import { OverviewServiceContentComponent } from './components/overview/service/overview-service-content/overview-service-content.component';
import { OverviewServiceAddComponent } from './components/overview/service/overview-service-add/overview-service-add.component';
import { OverviewServiceEditComponent } from './components/overview/service/overview-service-edit/overview-service-edit.component';
import { OverviewSectorContentComponent } from './components/overview/sector/overview-sector-content/overview-sector-content.component';
import { OverviewSectorAddComponent } from './components/overview/sector/overview-sector-add/overview-sector-add.component';
import { OverviewSectorEditComponent } from './components/overview/sector/overview-sector-edit/overview-sector-edit.component';
import { OverviewUserContentComponent } from './components/overview/user/overview-user-content/overview-user-content.component';
import { OverviewUserAddComponent } from './components/overview/user/overview-user-add/overview-user-add.component';
import { OverviewBookingContentComponent } from './components/overview/overview-booking-content/overview-booking-content.component';
import { OverviewRevenueContentComponent } from './components/overview/overview-revenue-content/overview-revenue-content.component';
import { LoginComponent } from './components/page/login/login.component';
import { RegisterComponent } from './components/page/register/register.component';
import { BookingContentComponent } from './components/booking/booking-content/booking-content.component';
import { VoucherContentComponent } from './components/voucher/voucher-content/voucher-content.component';
import { RateContentComponent } from './components/rating/rate-content/rate-content.component';
import { ForumContentComponent } from './components/forum/forum-content/forum-content.component';

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
    path: 'customer/add-customer',
    component: CustomerAddComponent,
  },
  {
    path: 'customer/edit-customer', // customer/edit-customer/:id
    component: CustomerEditComponent,
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
    component: ForumContentComponent,
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
    component: OverviewUserTabsComponent,
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
    component: SalonTabsComponent,
  },
  {
    path: 'salon/salon-detail/:id', // salon/salon-detail/:id
    component: SalonDetailTabsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
