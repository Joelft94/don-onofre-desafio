'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/utils/errorHandler';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
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
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return <div className="container mx-auto px-4 py-8">Su carrito esta vacío</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {items.map((item, itemIdx) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                              {item.name}
                            </a>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">₲{item.price.toLocaleString()}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                          Quantity, {item.name}
                        </label>
                        <select
                          id={`quantity-${itemIdx}`}
                          name={`quantity-${itemIdx}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Resumen de compra
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">₲{total.toLocaleString()}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">₲{total.toLocaleString()}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400"
              >
                {isLoading ? 'Procesando...' : 'Proceder al pago'}
              </button>
            </div>
            {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
          </section>
        </form>
      </div>
    </div>
  );
}