import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { EditorModule } from 'primeng/editor';
import { QRCodeModule } from 'angularx-qrcode';

// Custom Components
import { CustomerContentComponent } from './components/customer/customer-content/customer-content.component';
import { SalonContentComponent } from './components/salon/salon-content/salon-content.component';
import { EmployeeContentComponent } from './components/employee/employee-content/employee-content.component';
import { ForumContentComponent } from './components/forum/forum-content/forum-content.component';
import { NotificationContentComponent } from './components/notification/notification-content/notification-content.component';

// Services and Interceptors
import { AuthInterceptor } from './auth.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SalonTabsComponent } from './components/salon/add-salon/salon-tabs/salon-tabs.component';
import { SalonAddInformationComponent } from './components/salon/add-salon/salon-add-information/salon-add-information.component';
import { SalonAddAssignDataComponent } from './components/salon/add-salon/salon-add-assign-data/salon-add-assign-data.component';
import { SalonAddIntroductionComponent } from './components/salon/add-salon/salon-add-introduction/salon-add-introduction.component';
import { SalonAddManageWorkerComponent } from './components/salon/add-salon/salon-add-manage-worker/salon-add-manage-worker.component';
import { SalonDetailTabsComponent } from './components/salon/edit-salon/salon-detail-tabs/salon-detail-tabs.component';
import { SalonDetailInformationComponent } from './components/salon/edit-salon/salon-detail-information/salon-detail-information.component';
import { SalonDetailAssignDataComponent } from './components/salon/edit-salon/salon-detail-assign-data/salon-detail-assign-data.component';
import { SalonDetailIntroductionComponent } from './components/salon/edit-salon/salon-detail-introduction/salon-detail-introduction.component';
import { SalonDetailManageWorkerComponent } from './components/salon/edit-salon/salon-detail-manage-worker/salon-detail-manage-worker.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { OverviewUserTabsComponent } from './components/overview/user/overview-user-tabs/overview-user-tabs.component';
import { OverviewUserAssignDataComponent } from './components/overview/user/overview-user-assign-data/overview-user-assign-data.component';
import { OverviewContentComponent } from './components/overview/overview-content/overview-content.component';
import { OverviewServiceContentComponent } from './components/overview/service/overview-service-content/overview-service-content.component';
import { OverviewServiceAddComponent } from './components/overview/service/overview-service-add/overview-service-add.component';
import { OverviewServiceEditComponent } from './components/overview/service/overview-service-edit/overview-service-edit.component';
import { OverviewSectorContentComponent } from './components/overview/sector/overview-sector-content/overview-sector-content.component';
import { OverviewSectorAddComponent } from './components/overview/sector/overview-sector-add/overview-sector-add.component';
import { OverviewSectorEditComponent } from './components/overview/sector/overview-sector-edit/overview-sector-edit.component';
import { OverviewUserContentComponent } from './components/overview/user/overview-user-content/overview-user-content.component';
import { OverviewUserDetailComponent } from './components/overview/user/overview-user-detail/overview-user-detail.component';
import { OverviewUserAddComponent } from './components/overview/user/overview-user-add/overview-user-add.component';
import { OverviewBookingContentComponent } from './components/overview/overview-booking-content/overview-booking-content.component';
import { OverviewRevenueContentComponent } from './components/overview/overview-revenue-content/overview-revenue-content.component';
import { LoginComponent } from './components/page/login/login.component';
import { RegisterComponent } from './components/page/register/register.component';
import { HeaderComponent } from './components/page/header/header.component';
import { BookingContentComponent } from './components/booking/booking-content/booking-content.component';
import { VoucherContentComponent } from './components/voucher/voucher-content/voucher-content.component';
import { RateContentComponent } from './components/rating/rate-content/rate-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    OverviewContentComponent,
    BookingContentComponent,
    CustomerContentComponent,
    SalonContentComponent,
    EmployeeContentComponent,
    VoucherContentComponent,
    RateContentComponent,
    ForumContentComponent,
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
    SalonTabsComponent,
    SalonAddInformationComponent,
    SalonAddAssignDataComponent,
    SalonAddIntroductionComponent,
    SalonAddManageWorkerComponent,
    SalonDetailTabsComponent,
    SalonDetailInformationComponent,
    SalonDetailAssignDataComponent,
    SalonDetailIntroductionComponent,
    SalonDetailManageWorkerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    OverviewUserTabsComponent,
    OverviewUserAssignDataComponent,
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
    EditorModule,
    TagModule,
    QRCodeModule,
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
