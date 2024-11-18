import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PolicyComponent } from './policy/policy.component';
<<<<<<< HEAD
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
=======
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
<<<<<<< HEAD
>>>>>>> 71a25a2b1a7ef31880c7128ba1b362c9c323a2e4
=======
import { PromotionComponent } from './promotion/promotion.component';
>>>>>>> 3b3158dd4f5efb54f8fbfebda4daff428364a1f4

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    FooterComponent,
    AboutusComponent,
    ContactusComponent,
    PolicyComponent,
<<<<<<< HEAD
    CartComponent,
    PaymentComponent,
    LoginComponent
=======
    LoginComponent,
    AccountComponent,
    PromotionComponent,

>>>>>>> 71a25a2b1a7ef31880c7128ba1b362c9c323a2e4
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HeaderComponent }, // Example route
    ]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
