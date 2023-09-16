import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './website/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './website/cart/cart.component'; // Import the CartComponent
import { CheckoutComponent } from './website/checkout/checkout.component';
import { ProductDetailsComponent } from './website/product-details/product-details.component';
import { MyOrdersComponent } from './website/my-orders/my-orders.component';
import { AuthGuard } from './guards/auth.guard';
import { MyProfileComponent } from './website/my-profile/my-profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route to HomeComponent
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
