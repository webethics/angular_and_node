import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { AdminLayoutComponent } from './containers';
import { FrontendLayoutComponent } from './containers';
import { AdminLoginComponent } from './admin/views/login/login.component';


import { P404Component } from './admin/views/error/404.component';
import { P500Component } from './admin/views/error/500.component';

// Front end 
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

export const routes: Routes = [
     //{ path: '', component: IndexComponent}, 
    { 
        path: '', 
        component: FrontendLayoutComponent,
		
        children: [
		  { path: '', component: IndexComponent},
          { path: 'login', component: LoginComponent},
          { path: 'register', component: RegisterComponent},
		  { path: 'profile', component: ProfileComponent},
		  { path: 'verify/:verifycode', component: VerifyComponent},
		  { path: 'forgotpassword', component: ForgotpasswordComponent},
		  { path: 'create-job', component: CreateJobComponent},
		  { path: 'edit-job/:jobid', component: EditJobComponent},
		  { path: 'detail-job/:jobid', component: DetailsJobComponent},
		  { path: 'jobs', component: ListingJobComponent},
		  { path: 'resetpassword/:verifycode', component: ResetpasswordComponent},
          { path: 'changepassword', component: ChangepasswordComponent}
        

        ]
    },
    /* {
		path: '404',
		component: P404Component,
		data: {
		  title: 'Page 404'
		}
   },
   {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
   }, */

  //  Admin Routing 
 
  {
    path: 'admin',
    component: AdminLoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: AdminLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin/users',
        loadChildren: './admin/views/users/users.module#UsersModule'
      }, 
	  {
        path: 'admin/partner',
        loadChildren: './admin/views/partner/users.module#UsersModule'
      },
	  {
        path: 'admin/plan',
        loadChildren: './admin/views/plans/plan.module#PlanModule'
      },
      {
        path: 'admin/dashboard',
        loadChildren: './admin/views/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule]
})
export class AppRoutingModule {}
