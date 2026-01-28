import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  size: string;
  sale: number;
  version: string;
  is_retro: boolean;
  is_availble: boolean;
}

const API_URL = 'http://localhost:8000';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await axios.get(`${API_URL}/products/`);
    const products = res.data as Product[];

    return products;
  } catch (err) {
    console.error('Failed to fetch products from API:', err);
    throw new Error('Nie udało się pobrać produktów z API.');
  }
}
