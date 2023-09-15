import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service'; // Import ProductService
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component'; // Import the AddProductDialogComponent
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component'; // Import the EditProductDialogComponent

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  columns: string[] = ['name', 'description', 'price', 'stock', 'actions']; // Define the columns for your MatTable
  products: any[] = []; // Initialize with an empty array or fetch products from the API

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch products when the component initializes
    this.fetchProducts();
  }

  fetchProducts() {
    // Call ProductService to get the list of products from your API
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addProduct() {
    // Open a dialog for adding a new product
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call ProductService to add the new product to your API
        this.productService.addProduct(result).subscribe(() => {
          this.fetchProducts(); // Refresh the product list
        });
      }
    });
  }

  editProduct(product: any) {
    // Open a dialog for editing the selected product
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: product, // Pass the product data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call ProductService to update the product in your API
        this.productService.updateProduct(product.product_id, result).subscribe(() => {
          this.fetchProducts(); // Refresh the product list
        });
      }
    });
  }


  deleteProduct(product: any) {
    // Call ProductService to delete the selected product from your API
    this.productService.deleteProduct(product.product_id).subscribe(() => {
      this.fetchProducts(); // Refresh the product list
    });
  }
}
