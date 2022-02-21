import React, { useEffect, useState } from 'react';
import "./ProductListPage.sass"
// #### 상품목록
// ​
// 1. 상품 렌더링
// - [x] 상품들은 n x 4 레이아웃으로 보여진다.
//   - [x] 반응형 레이아웃을 구현한다.
//  2. 상품 상세 렌더링
// - [x] 상품들에는 사진이 보여진다.
// - [x] 상품들에는 이름이 보여진다.
// - [x] 상품들에는 금액이 보여진다.
//  3. 상품 버튼 동작 구현
// - [ ] 장바구니 버튼을 클릭하면 장바구니 페이지로 이동한다.
// - [ ] 페이징을 적용한다.

// {
//   "id": 1,
//   "price": 10000,
//   "name": "치킨",
//   "imageUrl": "http://example.com/chicken.jpg"
// },

const BASE_URL = "http://localhost:3003";
const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(async() => {
    await fetch(`${BASE_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])
  //data까지 받아오기 ok
  return (
    <ul className="product-container">
      {products.map(product => {
        return (
          <li key={product.id}>
            <div className='product-img'>
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <span className="product-info__name">{product.name}</span>
              <span className="product-info__price">{product.price}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
};

export default ProductListPage;
