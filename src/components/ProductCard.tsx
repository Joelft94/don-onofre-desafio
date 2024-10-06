'use client';

import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import Image from 'next/image'


export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    console.log('Added to cart:', product); // Add this line for debugging
  };

  return (
    <div className="border rounded-lg p-4">
      <Image src={product.image_url} alt={product.name} width={500} height={500} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">₲{product.price.toLocaleString()}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Add to Bag
      </button>
    </div>
  );
}