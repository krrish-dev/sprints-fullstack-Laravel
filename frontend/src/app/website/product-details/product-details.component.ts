import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ProductService } from '../../product.service'; // Create this service to fetch product data
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService , // Inject the product service
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the product ID from the route parameter
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // Convert to number

      // Fetch product details using the productId
      this.productService.getProductById(this.productId).subscribe((response) => {
        this.product = response.data;
      });
    });
  }


  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }


  navigateBack() {
    this.router.navigate(['/']);
  }

  getProductImageUrl(imageName: string): string {
    return `http://localhost:8000/images/products/${imageName}`;
  }
}
