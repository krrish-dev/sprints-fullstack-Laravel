import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem, CartApiResponse } from '../../cart-item';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'price', 'quantity', 'total', 'actions'];
  cartItems: MatTableDataSource<CartItem> = new MatTableDataSource<CartItem>([]); // Initialize as an empty array
  subtotal: number = 0;

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef , private router: Router) {}

  ngOnInit(): void {
    // Initially fetch and display the products
    this.cartService.getCartItems().subscribe((response: CartApiResponse) => {
      console.log('Received initial items:', response.data);
      this.cartItems = new MatTableDataSource<CartItem>(response.data); // Create a new MatTableDataSource
      this.calculateSubtotal();

      // Manually trigger change detection
      this.cdr.detectChanges();
    });

    // Subscribe to changes in the cart items
    this.cartService.cartItems$.subscribe((cartItems) => {
      // Update the MatTableDataSource with the new cart items
      this.cartItems = new MatTableDataSource<CartItem>(cartItems);
      this.calculateSubtotal();

      // Manually trigger change detection
      this.cdr.detectChanges();
    });
  }

  calculateSubtotal(): number {
    let subtotal = 0;

    // Calculate the subtotal based on cart items
    for (const item of this.cartItems.data) {
      subtotal += item.product_price * item.product_quantity;
    }

    return subtotal;
  }


  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item.id);
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item.id);
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item.id);
  }

  emptyCart(): void {
    // Call the CartService method to clear the cart
    this.cartService.clearCart();
  }

  checkout() {

    this.router.navigate(['/checkout']);
  }

  
}
