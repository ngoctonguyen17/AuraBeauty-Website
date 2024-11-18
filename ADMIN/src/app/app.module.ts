import { NgModule} from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { HeaderComponent } from './header/header.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AdminProfileComponent } from './manage-profile/admin-profile/admin-profile.component';
import { UserProfileComponent } from './manage-profile/user-profile/user-profile.component';
import { ViewComponent } from './manage-profile/user-profile/view/view.component';
import { AddAdminComponent } from './manage-profile/admin-profile/add-admin/add-admin.component';
import { ProductComponent } from './product/product.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    LeftmenuComponent,
    HeaderComponent,
    AdminNavbarComponent,
    AdminLoginComponent,
    DashboardComponent,
    ManageProfileComponent,
    AdminProfileComponent,
    UserProfileComponent,
    ViewComponent,
    AddAdminComponent,
    ProductComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    // CKEditorModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
