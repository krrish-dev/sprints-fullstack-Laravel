import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { CartItem, CartApiResponse } from '../../cart-item';
import { Router } from '@angular/router'; // Step 1

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  customerName = '';
  customerEmail = '';
  customerPhone = '';
  customerAddress = '';
  orderPlaced = false; // Step 2: Initialize to false

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router // Step 1
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((response: CartApiResponse) => {
      console.log('Received initial items:', response.data);
      this.cartItems = response.data;
      this.calculateSubtotal();
      this.cdr.detectChanges();
    });
  }

  calculateSubtotal(): number {
    let subtotal = 0;
    for (const item of this.cartItems) {
      subtotal += item.product_price * item.product_quantity;
    }
    return subtotal;
  }

  placeOrder() {
    const orderData = {
      customer_name: this.customerName,
      customer_email: this.customerEmail,
      customer_phone: this.customerPhone,
      customer_address: this.customerAddress,
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post('http://localhost:8000/api/place-order', orderData, { headers })
      .subscribe(
        (response) => {
          console.log('Order placed successfully:', response);
          this.orderPlaced = true; // Step 4: Order placed successfully
          // Optionally, clear the cart or perform other actions upon success
          // Step 5: Redirect to "My Orders" page
          this.router.navigate(['/my-orders']);
        },
        (error) => {
          console.error('Error placing order:', error);
        }
      );
  }
}
