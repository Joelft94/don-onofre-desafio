import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Our Products</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 pr-4">
          <ProductList />
        </div>
        <div className="md:w-1/4">
          <Cart />
        </div>
      </div>
    </main>
  );
}