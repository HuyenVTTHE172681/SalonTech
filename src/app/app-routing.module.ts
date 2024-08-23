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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
