import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BookingComponent } from './components/booking/booking.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SalonComponent } from './components/salon/salon.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { VoucherComponent } from './components/voucher/voucher.component';
import { RateComponent } from './components/rate/rate.component';
import { ForumComponent } from './components/forum/forum.component';
import { NotificationComponent } from './components/notification/notification.component';
import { OverviewServiceComponent } from './components/overview-service/overview-service.component';
import { OverviewServiceAddComponent } from './components/overview-service-add/overview-service-add.component';
import { OverviewServiceEditComponent } from './components/overview-service-edit/overview-service-edit.component';
import { OverviewSectorContentComponent } from './components/overview-sector-content/overview-sector-content.component';
import { OverviewSectorAddComponent } from './components/overview-sector-add/overview-sector-add.component';
import { OverviewSectorEditComponent } from './components/overview-sector-edit/overview-sector-edit.component';
import { OverviewUserContentComponent } from './components/overview-user-content/overview-user-content.component';

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
    component: OverviewComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'salon',
    component: SalonComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'voucher',
    component: VoucherComponent,
  },
  {
    path: 'rate',
    component: RateComponent,
  },
  {
    path: 'forum',
    component: ForumComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'home/overview-service',
    component: OverviewServiceComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
