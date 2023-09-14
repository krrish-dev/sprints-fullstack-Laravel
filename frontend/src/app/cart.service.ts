import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartApiResponse} from './cart-item';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Create a subject for cart items
  // cartItems$ = this.cartItemsSubject.asObservable();
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  constructor(private http: HttpClient) {
     // Initialize cart item count by fetching data from the API
    //this.getCartItems();
    

  }


  getCartItems(): Observable<CartApiResponse> {
    // Fetch cart items from the backend and return the observable
    return this.http.get<CartApiResponse>('http://localhost:8000/view-cart-items', { headers: this.getHeaders() })
      .pipe(
        tap((response: CartApiResponse) => {
          console.log('API Response:', response); // Log the entire API response for inspection
          if (response && response.data && Array.isArray(response.data)) {
            // Handle the response data as needed
            this.cartItems = response.data;
            const cartCount = this.cartItems.reduce((total, item) => total + item.product_quantity, 0);
            this.cartItemCountSubject.next(cartCount);
            this.cartItemsSubject.next([...this.cartItems]);
          } else {
            console.error('Invalid response format for cart items:', response);
          }
        }),
        catchError((error) => {
          console.error('Error fetching cart items:', error);
          throw error;
        })
      );
  }



  // Helper function to create headers with authorization
  private getHeaders() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token as a bearer token
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }



addToCart(productId: number) {
  // Send a request to add a product to the cart to the backend
  this.http
    .post('http://localhost:8000/cart/add/' + productId, {}, { headers: this.getHeaders() }) // Include headers with the token
    .subscribe(
      (data: any) => {
        this.cartItems.push(data); // Add the product to the cartItems array
        this.cartItemCountSubject.next(this.cartItems.length); // Update cart item count
        this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart items
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    );
}

// increaseQuantity(cartItemId: number) {
//   // Send a request to increase quantity to the backend
//   this.http
//     .post('http://localhost:8000/cart/increase/' + cartItemId, {}, { headers: this.getHeaders() }) // Include headers with the token
//     .subscribe(
//       (data: any) => {
//         console.log('Increased quantity data:', data); // Log the data
//         // Update the quantity in the cartItems array
//         const itemIndex = this.cartItems.findIndex((item) => item.id === cartItemId);
//         if (itemIndex !== -1) {
//           this.cartItems[itemIndex].quantity = data.newQuantity;
//           this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart items
//         }
//       },
//       (error) => {
//         console.error('Error increasing quantity:', error);
//       }
//     );
// }

// decreaseQuantity(cartItemId: number) {
//   // Send a request to decrease quantity to the backend
//   this.http
//     .post('http://localhost:8000/cart/decrease/' + cartItemId, {}, { headers: this.getHeaders() }) // Include headers with the token
//     .subscribe(
//       (data: any) => {
//         console.log('Decreased quantity data:', data); // Log the data
//         // Update the quantity in the cartItems array
//         const itemIndex = this.cartItems.findIndex((item) => item.id === cartItemId);
//         if (itemIndex !== -1) {
//           this.cartItems[itemIndex].quantity = data.newQuantity;
//           this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart items
//         }
//       },
//       (error) => {
//         console.error('Error decreasing quantity:', error);
//       }
//     );
// }

increaseQuantity(cartItemId: number) {
  // Send a request to increase quantity to the backend
  this.http
    .post('http://localhost:8000/cart/increase/' + cartItemId, {}, { headers: this.getHeaders() }) // Include headers with the token
    .subscribe(
      (data: any) => {
        console.log('Increased quantity data:', data); // Log the data
        // Update the quantity in the cartItems array
        const itemIndex = this.cartItems.findIndex((item) => item.id === cartItemId);
        if (itemIndex !== -1) {
          this.cartItems[itemIndex].quantity = data.newQuantity;
          this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart items
        }
        // Call getCartItems to refresh the cart items after the increase
        this.getCartItems().subscribe(() => {
          console.log('Cart items refreshed after increase');
        });
      },
      (error) => {
        console.error('Error increasing quantity:', error);
      }
    );
}

decreaseQuantity(cartItemId: number) {
  // Send a request to decrease quantity to the backend
  this.http
    .post('http://localhost:8000/cart/decrease/' + cartItemId, {}, { headers: this.getHeaders() }) // Include headers with the token
    .subscribe(
      (data: any) => {
        console.log('Decreased quantity data:', data); // Log the data
        // Update the quantity in the cartItems array
        const itemIndex = this.cartItems.findIndex((item) => item.id === cartItemId);
        if (itemIndex !== -1) {
          this.cartItems[itemIndex].quantity = data.newQuantity;
          this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart items
        }
        // Call getCartItems to refresh the cart items after the decrease
        this.getCartItems().subscribe(() => {
          console.log('Cart items refreshed after decrease');
        });
      },
      (error) => {
        console.error('Error decreasing quantity:', error);
      }
    );
}

removeCartItem(cartItemId: number) {
  // Send a request to remove the item from the cart to the backend
  this.http
    .delete('http://localhost:8000/remove-cart-item/' + cartItemId, { headers: this.getHeaders() }) // Include headers with the token
    .subscribe(
      () => {
        // Remove the item from the cartItems array
        const itemIndex = this.cartItems.findIndex((item) => item.id === cartItemId);
        if (itemIndex !== -1) {
          this.cartItems.splice(itemIndex, 1);
          this.cartItemCountSubject.next(this.cartItems.length);
          this.cartItemsSubject.next([...this.cartItems]); // Emit updated cart items
        }
        // Call getCartItems to refresh the cart items after the remove
        this.getCartItems().subscribe(() => {
          console.log('Cart items refreshed after remove');
        });
      },
      (error) => {
        console.error('Error removing item:', error);
      }
    );
}


  clearCart() {
    // Send a request to clear the cart to the backend
    this.http
      .delete('http://localhost:8000/cart/empty', { headers: this.getHeaders() }) // Include headers with the token
      .subscribe(
        () => {
          this.cartItems = [];
          this.cartItemCountSubject.next(0);
          this.cartItemsSubject.next([]); // Emit empty cart items
        },
        (error) => {
          console.error('Error clearing cart:', error);
        }
      );
  }
}
