import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  // Get a list of all products
  getProducts(): Observable<any[]> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Add headers to the HTTP request
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Get a product by its ID
  getProductById(productId: number): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/${productId}`;
    // Add headers to the HTTP request
    return this.http.get<any>(url, { headers });
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Add headers to the HTTP request
    return this.http.post<any>(this.apiUrl, product, { headers });
  }

  // Update an existing product by ID
  updateProduct(productId: number, updatedProduct: any): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/${productId}`;
    // Add headers to the HTTP request
    return this.http.put<any>(url, updatedProduct, { headers });
  }

  // Delete a product by ID
  deleteProduct(productId: number): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.apiUrl}/${productId}`;
    // Add headers to the HTTP request
    return this.http.delete<any>(url, { headers });
  }
}
