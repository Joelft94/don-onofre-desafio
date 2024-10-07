/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import { ChevronLeftIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useCart } from '@/contexts/CartContext';
import Cart from '@/components/Cart';

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, total } = useCart();

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div>
          <nav aria-label="Back" className="sm:hidden">
            <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
              <ChevronLeftIcon aria-hidden="true" className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" />
              Back
            </a>
          </nav>
          <nav aria-label="Breadcrumb" className="hidden sm:flex">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                    Home
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Don Onofre
            </h2>
          </div>
          <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Cart ({items.length})
            </button>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
          <Cart />
        </div>
      )}
    </div>
  );
};

export default Header;