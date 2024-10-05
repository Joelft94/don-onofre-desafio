import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Verify the webhook signature here TODO
    await updateOrderStatus(data.debt_id, data.status);
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  }
}
