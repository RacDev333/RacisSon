import axios from 'axios';

export interface Product {
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

export async function fetchProducts(): Promise<(Product & { id: string })[]> {
  try {
    const res = await axios.get(`${API_URL}/products`);
    const products = res.data as Product[];

    // Map products with IDs (using title as unique identifier if no ID provided)
    const mappedProducts = products.map((p, index) => ({
      id: `${p.title.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      ...p,
    }));

    return mappedProducts;
  } catch (err) {
    console.error('Failed to fetch products from API:', err);
    throw new Error('Nie udało się pobrać produktów z API.');
  }
}
