import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
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
import { PromotionComponent } from './promotion/promotion.component';
import { QAComponent } from './qa/qa.component';
>>>>>>> 71a25a2b1a7ef31880c7128ba1b362c9c323a2e4

const routes: Routes = [
  { path: 'promotion', component: PromotionComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'home', component: HomepageComponent},
  { path: 'policy', component: PolicyComponent },
  { path: 'aboutus', component: AboutusComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'cart', component: CartComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
