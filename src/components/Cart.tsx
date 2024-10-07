'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function Cart() {
  const { items, removeFromCart, total } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Carrito</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 italic">Tu carrito está vacío</p>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 mr-2">
                    ₲{(item.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center text-lg font-bold text-gray-800">
            <span>Total:</span>
            <span>₲{total.toLocaleString()}</span>
          </div>
          <Link href="/checkout" className="block mt-6">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Proceder al checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}