import { createClient } from './supabase/server'
import { cookies } from 'next/headers'
import { Product, Order } from "@/types"

export async function getAllProducts(): Promise<Product[]> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error in getAllProducts:", error)
    throw error
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error in getProductById:", error)
    throw error
  }
}

export async function createOrder(items: { id: number; quantity: number }[], debtId: string, amount: number, status: string): Promise<Order> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    // Start a Supabase transaction
    const { data, error } = await supabase.rpc('create_order', {
      p_items: items,
      p_debt_id: debtId,
      p_amount: amount,
      p_status: status
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in createOrder:', error)
    throw error
  }
}

// You might want to add more functions here, such as:

export async function updateOrderStatus(orderId: number, newStatus: string): Promise<Order> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in updateOrderStatus:', error)
    throw error
  }
}

export async function getOrderById(orderId: number): Promise<Order | null> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in getOrderById:', error)
    throw error
  }
}