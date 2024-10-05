import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/db';
import CheckoutForm from '@/components/CheckoutForm';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">{product.name}</h1>
      <div className="flex flex-col md:flex-row">
        <img src={product.image_url} alt={product.name} className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0 md:mr-4" />
        <div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">₲{product.price.toLocaleString()}</p>
          <CheckoutForm product={product} />
        </div>
      </div>
    </div>
  );
}