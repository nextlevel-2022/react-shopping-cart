import React from 'react';
import { Product } from '../types/dto';
import { IconCart } from './icons/Cart';

export function ProductCard({
  item: { imageUrl, name, price },
  onClickItem,
  onClickCart,
}: {
  item: Product;
  onClickItem: () => void;
  onClickCart: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <li
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-10"
      onClick={onClickItem}
    >
      <figure className="h-[282px] md:h-[220px] lg:h-[282px]">
        <img
          className="object-cover h-full w-full"
          src={imageUrl}
          alt={`${name}의 사진`}
        />
      </figure>
      <div className="p-4 flex items-center">
        <span className="flex flex-col">
          <strong className="text-sm">{name}</strong>
          <span className="text-md">{price} 원</span>
        </span>
        <button type="button" className="ml-auto" onClick={onClickCart}>
          <IconCart fill="#333333" />
        </button>
      </div>
    </li>
  );
}
