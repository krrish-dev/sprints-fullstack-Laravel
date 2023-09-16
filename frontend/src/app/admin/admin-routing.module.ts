import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuard, AdminGuard], 
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard, AdminGuard], // Protect the route with both AuthGuard and AdminGuard
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard, AdminGuard], // Protect the route with both AuthGuard and AdminGuard
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard, AdminGuard], // Protect the route with both AuthGuard and AdminGuard
  },
  // Add additional routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
