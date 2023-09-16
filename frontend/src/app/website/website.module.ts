import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MaterialModule } from '../shared/material/material.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
 




@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    CartSummaryComponent,
    MyOrdersComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,

  ]
})
export class WebsiteModule { }
