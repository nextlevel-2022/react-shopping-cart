import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/dto';
import { IconCart } from '../components/icons/Cart';

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
  {
    id: 3,
    name: '생새우살 (71/90) 500g 4개',
    price: 29000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
  },
  {
    id: 4,
    name: '생새우살 (71/90) 500g 4개',
    price: 29000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
  },
  {
    id: 5,
    name: '냉면용기(대)',
    price: 83700,
    imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
  },
  {
    id: 6,
    name: '생새우살 (71/90) 500g 4개',
    price: 29000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
  },
  {
    id: 7,
    name: '생새우살 (71/90) 500g 4개',
    price: 29000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
  },
  {
    id: 8,
    name: '생새우살 (71/90) 500g 4개',
    price: 29000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
  },
];

export function Home() {
  return (
    <div className="py-16">
      <ul className="container flex flex-wrap">
        {MOCK.map((item) => (
          <Link className="w-1/4 px-4 mb-10" key={item.id} to={`products/${1}`}>
            <li>
              <figure className="h-[282px]">
                <img
                  className="object-cover h-full w-full"
                  src={item.imageUrl}
                  alt={`${item.name}의 사진`}
                />
              </figure>
              <div className="p-4 flex items-center">
                <span className="flex flex-col">
                  <strong className="text-sm">{item.name}</strong>
                  <span className="text-md">{item.price} 원</span>
                </span>
                <span className="ml-auto">
                  <IconCart fill="#333333" />
                </span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
