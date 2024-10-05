'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { items, removeFromCart, total } = useCart();

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>₲{(item.price * item.quantity).toLocaleString()}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">
            Total: ₲{total.toLocaleString()}
          </div>
          <Link href="/checkout">
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}