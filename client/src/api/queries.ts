import { Product, GetCartResponse, GetOrderResponse } from '@/dto';
import { useQuery } from 'react-query';
import apiClient from './apiClient';

export function useGetProductList() {
  return useQuery('products', async () => {
    const response = await apiClient.get<Product[]>('products');
    return response.data;
  });
}

export function useGetCartList() {
  return useQuery('carts', async () => {
    const response = await apiClient.get<GetCartResponse>('carts');
    return response.data;
  });
}

export function useGetOrderList() {
  return useQuery('orders', async () => {
    const response = await apiClient.get<GetOrderResponse>('orders');
    return response.data;
  });
}
