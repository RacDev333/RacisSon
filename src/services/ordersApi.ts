import axios from 'axios';

export interface OrderData {
  name: string;
  surname: string;
  number: string;
  email: string;
  city: string;
  postal_code: string;
  street: string;
  building_number: string;
  shipping_method: string;
  payment_method: string;
  shipping_notes: string;
  code_id: number | null;
  product_id: number[];
}

export interface OrderResponse {
  status: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export async function submitOrder(orderData: OrderData): Promise<OrderResponse> {
  try {
    const res = await axios.post(`${API_URL}/orders/`, orderData);
    return res.data as OrderResponse;
  } catch (err) {
    console.error('Failed to submit order:', err);
    throw new Error('Nie udało się złożyć zamówienia. Spróbuj ponownie.');
  }
}
