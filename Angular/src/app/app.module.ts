import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {  } from 'angular-datatables';

import {FlashMessagesModule} from 'angular2-flash-messages';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { AdminLayoutComponent } from './containers';
import { FrontendLayoutComponent } from './containers';
import { AdminLoginComponent } from './admin/views/login/login.component';


//Frontend
import { P404Component } from './admin/views/error/404.component';
import { P500Component } from './admin/views/error/500.component';
import { LoginComponent } from './frontend/views/users/login/login.component';
import { IndexComponent } from './frontend/views/home/index.component';
import { RegisterComponent } from './frontend/views/users/register/register.component';
import { ProfileComponent } from './frontend/views/users/profile/profile.component';
import { ForgotpasswordComponent } from './frontend/views/users/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './frontend/views/users/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './frontend/views/users/changepassword/changepassword.component';
import { VerifyComponent } from './frontend/views/users/register/verify.component';
import { CreateJobComponent } from './frontend/views/jobs/createjob/createjob.component';
import { EditJobComponent } from './frontend/views/jobs/editjob/editjob.component';
import { ListingJobComponent } from './frontend/views/jobs/joblisting/joblisting.component';
import { DetailsJobComponent } from './frontend/views/jobs/jobdetails/jobdetails.component';
import { DialogOverviewExampleDialog } from './frontend/views/jobs/joblisting/joblisting.component';

//import { HeaderComponent } from './frontend/views/header/header.component';
//import { FooterComponent } from './frontend/views/footer/footer.component';


const APP_CONTAINERS = [
  AdminLayoutComponent,
  FrontendLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { routes } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Services
import { UserService } from './services/user.service';
import { JobService } from './services/job.service';
import { AdminService } from './services/backend/admin.service';

@NgModule({
  imports: [
    BrowserModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
	FlashMessagesModule.forRoot(), 
	RouterModule.forRoot(routes),
	ReactiveFormsModule,
	HttpClientModule,
	FormsModule,
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    AdminLoginComponent,
    LoginComponent,
    RegisterComponent,
	ProfileComponent,
	ForgotpasswordComponent,
	ResetpasswordComponent,
	ChangepasswordComponent,
	VerifyComponent,
	CreateJobComponent,
	EditJobComponent,
	ListingJobComponent,
	DialogOverviewExampleDialog,
	DetailsJobComponent,
	IndexComponent
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy 
  },UserService,JobService,AdminService],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
