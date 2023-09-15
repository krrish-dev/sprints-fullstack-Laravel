import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { MaterialModule } from '../shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { FormsModule } from '@angular/forms';
import { OrderDetailsDialogComponent } from './orders/order-details-dialog/order-details-dialog.component';
import { UpdateOrderStatusDialogComponent } from './orders/update-order-status-dialog/update-order-status-dialog.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    ProductsComponent,
    OrdersComponent,
    CustomersComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,
    OrderDetailsDialogComponent,
    UpdateOrderStatusDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    FormsModule,
    MatDividerModule,
  ]
})
export class AdminModule { }
