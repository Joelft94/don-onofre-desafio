/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductById } from '@/lib/db';

export const dynamic = 'force-dynamic'; // This line makes the route dynamic

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  try {
    if (id) {
      const productId = parseInt(id);
      if (isNaN(productId)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
      }
      
      const product = await getProductById(productId);
      if (product) {
        return NextResponse.json(product);
      } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    } else {
      const products = await getAllProducts();
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}