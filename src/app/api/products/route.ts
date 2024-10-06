import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(_request: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase.from('products').select('*')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}