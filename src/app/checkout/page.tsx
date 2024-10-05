'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({ id: item.id, quantity: item.quantity })),
          total: total,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const { paymentUrl } = await response.json();
      clearCart();
      router.push(paymentUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return <div className="container mx-auto px-4 py-8">Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span>{item.name} (x{item.quantity})</span>
          <span>₲{(item.price * item.quantity).toLocaleString()}</span>
        </div>
      ))}
      <div className="mt-4 text-xl font-bold">
        Total: ₲{total.toLocaleString()}
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full disabled:bg-gray-400"
      >
        {isLoading ? 'Processing...' : 'Complete Purchase'}
      </button>
    </div>
  );
}