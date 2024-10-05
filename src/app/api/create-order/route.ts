import { NextResponse } from 'next/server';
import { createDebt } from '@/lib/adamspay';
import { createOrder } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { productId, amount, concept } = await request.json();
    const docId = uuidv4(); // Generate a unique ID for the debt
    const { payUrl, debtId } = await createDebt(amount, concept, docId);
    const order = await createOrder(productId, debtId, amount, 'pending');
    return NextResponse.json({ 
      orderId: order.id, 
      paymentUrl: payUrl 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}