import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { CartService } from '../../cart.service';
import { CartItem, CartApiResponse } from '../../cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = []; // Use the appropriate type for cart items
  customerName = '';
  customerEmail = '';
  customerPhone = '';
  customerAddress = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch cart items from the CartService
    this.cartService.getCartItems().subscribe((response: CartApiResponse) => {
      console.log('Received initial items:', response.data);
      this.cartItems = response.data; // Assign cart items to the cartItems property
      this.calculateSubtotal();
      // Manually trigger change detection
      this.cdr.detectChanges();
    });
  }

  calculateSubtotal(): number {
    let subtotal = 0;

    // Calculate the subtotal based on cart items
    for (const item of this.cartItems) {
      subtotal += item.product_price * item.product_quantity;
    }

    return subtotal;
  }

  // Rest of your CheckoutComponent code...

  placeOrder() {
    // Prepare the data to send to the API
    const orderData = {
      customer_name: this.customerName,
      customer_email: this.customerEmail,
      customer_phone: this.customerPhone,
      customer_address: this.customerAddress,
      // Include any other relevant data such as cart items
    };

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create HttpHeaders with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Send a POST request to the API with the headers
    this.http
      .post('http://localhost:8000/api/place-order', orderData, { headers })
      .subscribe(
        (response) => {
          // Handle success response
          console.log('Order placed successfully:', response);
          // Optionally, clear the cart or perform other actions upon success
        },
        (error) => {
          // Handle error response
          console.error('Error placing order:', error);
        }
      );
  }
}

