import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { UpdateOrderStatusDialogComponent } from './update-order-status-dialog/update-order-status-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'order_number',
    'customer_name',
    'customer_email',
    'customer_phone',
    'customer_address',
    'order_date',
    'order_total',
    'order_status'
  ];
  actionsColumn: string[] = ['actions'];


  orders: any[] = []; // Initialize as an empty array

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchOrders();
  }


  fetchOrders() {
    // Call OrderService to get the list of orders from your API
    this.orderService.getOrders().subscribe((response: any) => {
      this.orders = response.data; // Update with the array of orders
    });
  }


  viewOrderDetails(order: any) {
    console.log('View order details:', order);
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '400px',
      data: order,
    });
  }

  updateOrderStatus(order: any) {
    console.log('Update order status:', order);
    const dialogRef = this.dialog.open(UpdateOrderStatusDialogComponent, {
      width: '400px',
      data: order,
    });

    dialogRef.afterClosed().subscribe((newStatus) => {
      if (newStatus) {
        this.orderService.updateOrderStatus(order.id, newStatus).subscribe(() => {
          this.fetchOrders();
        });
      }
    });
  }
}
