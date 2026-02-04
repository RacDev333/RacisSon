import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  size: string;
  sale: number | null;
  version: string;
  is_retro: boolean;
  is_availble: boolean;
}

export interface PromoCode {
  id: number;
  code: string;
  sale: number;
}

export interface Broadcast {
  id: number;
  text: string;
  link: string | null;
}

export interface EverythingResponse {
  products: Product[];
  codes: PromoCode[];
  broadcasts: Broadcast[];
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
let cache: EverythingResponse | null = null;

// Funkcja do czyszczenia cache (przydatna do debugowania)
export function clearCache() {
  cache = null;
}

export async function fetchEverything(): Promise<EverythingResponse> {
  if (cache) {
    return cache;
  }

  try {
    const res = await axios.get(`${API_URL}/everything/`);
    const data = res.data as EverythingResponse;
    cache = data;
    return data;
  } catch (err) {
    console.error('Failed to fetch data from API:', err);
    throw new Error('Nie udało się pobrać danych z API.');
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await fetchEverything();
  return data.products;
}

export async function fetchPromoCodes(): Promise<PromoCode[]> {
  const data = await fetchEverything();
  return data.codes;
}

export async function fetchBroadcasts(): Promise<Broadcast[]> {
  const data = await fetchEverything();
  return data.broadcasts;
}

// Custom hook do pobierania wszystkich danych jednocześnie
export function useAllData() {
  return useQuery({
    queryKey: ['allData'],
    queryFn: fetchEverything,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}
