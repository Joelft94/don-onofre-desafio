import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/db';
import CheckoutForm from '@/components/CheckoutForm';
import Image from 'next/image'


export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">{product.name}</h1>
      <div className="flex flex-col md:flex-row">
        <Image src={product.image_url} alt={product.name} width={500} height={500} className="w-full md:w-1/2 h-full object-cover mb-4 md:mb-0 md:mr-4" />
        <div>
          <p className="text-gray-600 mb-4 text-5xl text-white">{product.description}</p>
          <p className="text-2xl font-bold mb-4">₲{product.price.toLocaleString()}</p>
          {/* <CheckoutForm product={product} /> */}
        </div>
      </div>
    </div>
  );
}