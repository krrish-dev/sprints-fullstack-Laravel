// cart-summary.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'] 
})
export class CartSummaryComponent {
  @Input() cartItems: any[] = [];
  @Input() total: number = 0;
}
