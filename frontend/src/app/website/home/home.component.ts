// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service'; // Import the CartService
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Define an array to store product data
  filteredProducts: any[] = []; // Array to store filtered products
  searchQuery: string = ''; // Initialize search query

  constructor(private http: HttpClient, private cartService: CartService ,  private router: Router) {} // Inject the CartService

  ngOnInit() {
    // Fetch product data from your API
    this.http.get('http://localhost:8000/api/products').subscribe(
      (data: any) => {
        this.products = data; // Assign the fetched data to the products array
        this.filteredProducts = data; // Initialize filteredProducts with all products
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }


      viewProduct(productId: number) {
        // Navigate to the product details route with the product ID as a parameter
        this.router.navigate(['/product', productId]);
      }


  getProductImageUrl(imageName: string): string {
    return `http://localhost:8000/images/products/${imageName}`;
  }

  // Function to filter products based on search query
  filterProducts() {
    if (this.searchQuery.trim() === '') {
      // If the search query is empty, show all products
      this.filteredProducts = this.products;
    } else {
      // If the search query is not empty, filter products based on query
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  handleSearch(query: string) {
    this.searchQuery = query; // Update the searchQuery property with the query from app-header
    this.filterProducts(); // Call the filterProducts method to perform the search/filtering
  }

  // Function to add a product to the cart
  addToCart(product: any) {
    // Add the product to the cart using the CartService
    this.cartService.addToCart(product);
  }
}
