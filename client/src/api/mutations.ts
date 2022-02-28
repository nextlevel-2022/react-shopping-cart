import apiClient from './apiClient';
import { MutationFunction, UseMutationOptions, useMutation } from 'react-query';
import { Product } from '@/dto';

const mutator =
  <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    mutateFn: MutationFunction<TData, TVariables>,
  ) =>
  (options?: UseMutationOptions<TData, TError, TVariables, TContext>) =>
    useMutation<TData, TError, TVariables, TContext>(mutateFn, options);

export const useAddCartMutation = mutator<Product, unknown, Product>((product) =>
  apiClient.post('/carts', { product }),
);

