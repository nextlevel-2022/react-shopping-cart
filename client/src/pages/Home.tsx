import React from 'react';
import { useQuery } from 'react-query';
import { loadProducts } from '../services/Product';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const { data } = useQuery(['products'], loadProducts);

  const handleClickItem = () => {};

  const handleClickCart: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="py-16">
      <ul className="container flex flex-wrap">
        {data?.map((item) => (
          <ProductCard
            item={item}
            onClickItem={handleClickItem}
            onClickCart={handleClickCart}
          />
        ))}
      </ul>
    </div>
  );
}
