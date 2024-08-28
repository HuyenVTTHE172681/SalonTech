import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { RatingModule } from 'primeng/rating';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';


import { HeaderComponent } from './components/header/header.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OverviewContentComponent } from './components/overview-content/overview-content.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingContentComponent } from './components/booking-content/booking-content.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerContentComponent } from './components/customer-content/customer-content.component';
import { SalonComponent } from './components/salon/salon.component';
import { SalonContentComponent } from './components/salon-content/salon-content.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeContentComponent } from './components/employee-content/employee-content.component';
import { VoucherComponent } from './components/voucher/voucher.component';
import { VoucherContentComponent } from './components/voucher-content/voucher-content.component';
import { RateComponent } from './components/rate/rate.component';
import { RateContentComponent } from './components/rate-content/rate-content.component';
import { ForumComponent } from './components/forum/forum.component';
import { ForumContentComponent } from './components/forum-content/forum-content.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationContentComponent } from './components/notification-content/notification-content.component';
import { OverviewServiceComponent } from './components/overview-service/overview-service.component';
import { OverviewServiceContentComponent } from './components/overview-service-content/overview-service-content.component';
import { OverviewAccountComponent } from './components/overview-account/overview-account.component';
import { OverviewServiceAddComponent } from './components/overview-service-add/overview-service-add.component';
import { ChildComponent } from './components/child/child.component';
import { OverviewServiceEditComponent } from './components/overview-service-edit/overview-service-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    OverviewComponent,
    OverviewContentComponent,
    BookingComponent,
    BookingContentComponent,
    CustomerComponent,
    CustomerContentComponent,
    SalonComponent,
    SalonContentComponent,
    EmployeeComponent,
    EmployeeContentComponent,
    VoucherComponent,
    VoucherContentComponent,
    RateComponent,
    RateContentComponent,
    ForumComponent,
    ForumContentComponent,
    NotificationComponent,
    NotificationContentComponent,
    OverviewServiceComponent,
    OverviewServiceContentComponent,
    OverviewAccountComponent,
    OverviewServiceAddComponent,
    ChildComponent,
    OverviewServiceEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    MegaMenuModule,
    AvatarModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    MenuModule,
    CalendarModule,
    TableModule,
    CheckboxModule,
    PaginatorModule,
    TagModule,
    TabViewModule,
    InputGroupModule,
    InputGroupAddonModule,
    RatingModule,
    MenubarModule,
    ToastModule,
    HttpClientModule,
    MessagesModule,
    RouterModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    OverlayPanelModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
