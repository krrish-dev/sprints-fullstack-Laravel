// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Define an array to store product data

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch product data from your API
    this.http.get('http://localhost:8000/api/products').subscribe(
      (data: any) => {
        this.products = data; // Assign the fetched data to the products array
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }
  getProductImageUrl(imageName: string): string {
    return `http://localhost:8000/images/products/${imageName}`;
  }
}
