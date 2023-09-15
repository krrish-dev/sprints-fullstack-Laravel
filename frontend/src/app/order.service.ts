import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {}

  private getHeadersWithToken() {
    // Get the user token from local storage
    const token = localStorage.getItem('token');

    // Set up the headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    });

    return headers;
  }

  getOrders(): Observable<any[]> {
    // Include the headers in the request
    const headers = this.getHeadersWithToken();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getOrderById(orderId: number): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.get<any>(url);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/update-status`;
    const body = { order_status: newStatus };

    // Include the headers with the token in the request
    const headers = this.getHeadersWithToken();

    return this.http.put<any>(url, body, { headers });
  }
}
