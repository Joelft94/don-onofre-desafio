export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  }
  
  export interface Order {
    id: number;
    product_id: number;
    debt_id: string;
    amount: number;
    status: string;
    created_at: Date;
  }