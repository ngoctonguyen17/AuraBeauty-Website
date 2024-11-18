import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HeaderComponent } from './header/header.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

const routes: Routes = [
  { path: 'admin', component: DashboardComponent},
  { path: 'profile', component: ManageProfileComponent},
  { path: 'login', component: AdminLoginComponent},
  // { path: 'admin', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
