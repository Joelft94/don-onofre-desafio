import { Pool } from 'pg';
import { Product } from '@/types';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getAllProducts(): Promise<Product[]> {
  const { rows } = await pool.query('SELECT * FROM products');
  return rows;
}

export async function getProduct(id: number): Promise<Product | null> {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0] || null;
}


export async function createOrder(productId: number, debtId: string, amount: number, status: string): Promise<Order> {
    const { rows } = await pool.query(
      'INSERT INTO orders (product_id, debt_id, amount, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [productId, debtId, amount, status]
    );
    return rows[0];
  }
  
  export async function updateOrderStatus(debtId: string, status: string): Promise<void> {
    await pool.query('UPDATE orders SET status = $1 WHERE debt_id = $2', [status, debtId]);
  }
  
  export async function getOrderStatus(debtId: string): Promise<string> {
    const { rows } = await pool.query('SELECT status FROM orders WHERE debt_id = $1', [debtId]);
    return rows[0]?.status || 'unknown';
  }