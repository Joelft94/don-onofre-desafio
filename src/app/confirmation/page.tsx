'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Order Confirmation</h1>
      <p>Thank you for your purchase! Your order ID is: {orderId}</p>
      <Link href="/">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Return to Home
        </button>
      </Link>
    </div>
  );
}