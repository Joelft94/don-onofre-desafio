import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductById } from '@/lib/db';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  try {
    if (id) {
      // Fetch a single product
      const product = await getProductById(parseInt(id));
      if (product) {
        return NextResponse.json(product);
      } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    } else {
      // Fetch all products
      const products = await getAllProducts();
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}