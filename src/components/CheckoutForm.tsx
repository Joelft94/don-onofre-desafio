'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { getErrorMessage } from '@/utils/errorHandler'; // Import the error handling utility

export default function CheckoutForm({ product }: { product: Product }) {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-debt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price,
          concept: `Purchase of ${product.name}`,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create payment');
      }
      const data = await response.json();
      setPaymentUrl(data.paymentUrl);
      // Simulate payment completion and redirect to confirmation page
      // In a real scenario, this would be handled by the webhook TODO
      setTimeout(() => {
        router.push(`/confirmation?orderId=${data.debtId}`);
      }, 5000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Processing payment...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {!paymentUrl ? (
        <button 
          onClick={handleCheckout}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Proceed to Payment
        </button>
      ) : (
        <a 
          href={paymentUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Pay Now
        </a>
      )}
    </div>
  );
}