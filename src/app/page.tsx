import ProductList from '@/components/ProductList';

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Don Onofre's Products</h1>
      <ProductList />
    </main>
  );
}