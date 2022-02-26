import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/dto';

const MOCK: Product[] = [
  {
    id: 1,
    name: '냉면용기(대)',
    price: 83700,
    imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
  },
  {
    id: 2,
    name: '생새우살 (71/90) 500g 4개',
    price: 29000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
  },
];

export function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <ul>
        {MOCK.map((item) => (
          <Link key={item.id} to={`products/${1}`}>
            <li>
              <figure>
                <img src={item.imageUrl} alt={`${item.name}의 사진`} />
              </figure>
              <div>
                <span>
                  <strong>{item.name}</strong>
                  <span>{item.price}</span>
                </span>
                <span>장바구니 담기</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
