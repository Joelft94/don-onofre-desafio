import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/db';
import CheckoutForm from '@/components/CheckoutForm';

export default async function CheckoutPage({ params }: { params: { id: string } }) {
  const product = await getProduct(parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Checkout</h1>
      <CheckoutForm product={product} />
    </div>
  );
}