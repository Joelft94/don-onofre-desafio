import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/db';

//Local webhook testing
export async function POST(request: Request) {
  try {
    const data = await request.json();
    await updateOrderStatus(data.debt_id, data.status);
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  }
}
