import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = ['order_number', 'customer_name', 'customer_phone' ,'order_date', 'order_status' , 'order_items', 'order_total'];
  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchMyOrders();
  }

  fetchMyOrders() {

    this.orderService.getMyOrders().subscribe((response: any) => {
      this.orders = response.data;
    });
  }
}
