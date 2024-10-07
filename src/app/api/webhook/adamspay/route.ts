/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

interface Transaction {
  id: number;
  notification_id: string;
  type: string;
  version: number;
  time: string;
  merchant: string;
  app: string;
  env: string;
  created_at: string;
}

interface WebhookNotification {
  id: string;
  type: string;
  version: number;
  time: string;
  merchant: string;
  app: string;
  env: string;
}

export async function POST(req: NextRequest) {
  try {
    const { notify }: { notify: WebhookNotification } = await req.json();

    const supabase = createClient(cookies());

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        notification_id: notify.id,
        type: notify.type,
        version: notify.version,
        time: notify.time,
        merchant: notify.merchant,
        app: notify.app,
        env: notify.env
      } as Omit<Transaction, 'id' | 'created_at'>);

    if (error) throw error;

    return NextResponse.json({ message: 'Webhook received and processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}