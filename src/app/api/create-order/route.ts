// File: src/app/api/create-order/route.ts

import { NextResponse } from 'next/server';
import { createDebt } from '@/lib/adamspay';
import { createOrder } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic'; // This line makes the route dynamic

export async function POST(request: Request) {
  try {
    const { items, total } = await request.json();
    console.log('Received order request:', { items, total });

    const docId = uuidv4();
    const concept = `Purchase of ${items.length} item${items.length > 1 ? 's' : ''}`;
    console.log('Creating debt with AdamsPay');
    const { payUrl, debtId } = await createDebt(total, concept, docId);
    console.log('Debt created successfully:', { payUrl, debtId });

    console.log('Creating order in database');
    const order = await createOrder(items, debtId, total, 'pending');
    console.log('Order created successfully:', order);

    return NextResponse.json({ 
      orderId: order.id, 
      paymentUrl: payUrl 
    });
  } catch (error) {
    console.error('Error in create-order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error creating order';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}