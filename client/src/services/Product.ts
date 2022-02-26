import ky from 'ky';
import { Product } from '../types/dto';

const api = ky.create({ prefixUrl: 'http://localhost:3003/' });

export const loadProducts = async () => {
  try {
    return await api.get('products').json<Product[]>();
  } catch (err) {
    throw new Error('Failed to load products');
  }
};
