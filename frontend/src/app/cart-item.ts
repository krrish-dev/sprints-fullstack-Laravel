// Create a new TypeScript file, e.g., cart-response.model.ts
export interface CartApiResponse {
  data: CartItem[];
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  product_subtotal: string;
  created_at: string;
  updated_at: string;
}
