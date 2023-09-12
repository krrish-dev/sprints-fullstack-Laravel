import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [
    ProductsComponent,
    OrdersComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class AdminModule { }
