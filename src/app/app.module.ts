import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { InputGroupModule } from 'primeng/inputgroup';
import { RatingModule } from 'primeng/rating';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';

// Custom Components
import { HeaderComponent } from './components/header/header.component';
import { OverviewContentComponent } from './components/overview-content/overview-content.component';
import { BookingContentComponent } from './components/booking-content/booking-content.component';
import { CustomerContentComponent } from './components/customer-content/customer-content.component';
import { SalonComponent } from './components/salon/salon.component';
import { SalonContentComponent } from './components/salon-content/salon-content.component';
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
import { OverviewServiceContentComponent } from './components/overview-service-content/overview-service-content.component';
import { OverviewServiceAddComponent } from './components/overview-service-add/overview-service-add.component';
import { OverviewServiceEditComponent } from './components/overview-service-edit/overview-service-edit.component';

// Services and Interceptors
import { AuthInterceptor } from './auth.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverviewSectorContentComponent } from './components/overview-sector-content/overview-sector-content.component';
import { OverviewSectorAddComponent } from './components/overview-sector-add/overview-sector-add.component';
import { OverviewSectorEditComponent } from './components/overview-sector-edit/overview-sector-edit.component';
import { OverviewUserContentComponent } from './components/overview-user-content/overview-user-content.component';
import { OverviewUserDetailComponent } from './components/overview-user-detail/overview-user-detail.component';
import { OverviewUserAddComponent } from './components/overview-user-add/overview-user-add.component';
import { OverviewBookingContentComponent } from './components/overview-booking-content/overview-booking-content.component';
import { OverviewRevenueContentComponent } from './components/overview-revenue-content/overview-revenue-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    OverviewContentComponent,
    BookingContentComponent,
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
    OverviewServiceContentComponent,
    OverviewServiceAddComponent,
    OverviewServiceEditComponent,
    OverviewSectorContentComponent,
    OverviewSectorAddComponent,
    OverviewSectorEditComponent,
    OverviewUserContentComponent,
    OverviewUserDetailComponent,
    OverviewUserAddComponent,
    OverviewBookingContentComponent,
    OverviewRevenueContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MegaMenuModule,
    AvatarModule,
    DropdownModule,
    MenuModule,
    CalendarModule,
    TableModule,
    CheckboxModule,
    PaginatorModule,
    TagModule,
    TabViewModule,
    InputGroupModule,
    RatingModule,
    MenubarModule,
    ToastModule,
    MessagesModule,
    RadioButtonModule,
    OverlayPanelModule,
    ChartModule,
    ConfirmDialogModule,
    RippleModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA here
})
export class AppModule {}
