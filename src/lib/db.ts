import { Pool } from "pg";
import { Order } from "@/types";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getAllProducts(): Promise<Product[]> {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw error;
  }
}

export async function createOrder(items: { id: number; quantity: number }[], debtId: string, amount: number, status: string): Promise<Order> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { rows: [order] } = await client.query(
        'INSERT INTO orders (debt_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
        [debtId, amount, status]
      );
      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
          [order.id, item.id, item.quantity]
        );
      }
      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error in createOrder:', error);
      throw error;
    } finally {
      client.release();
    }
  }