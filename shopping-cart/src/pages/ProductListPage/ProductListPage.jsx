import React, { useEffect, useState } from 'react';
import MenuAPI from '../../API';
import CartButton from '../CartButton/CartButton';
import GNB from '../NavPage/GNB';
import "./ProductListPage.sass"

// ### 심화 요구사항
// ​- [ ] jset TDD
// - [ ] 도출된 요구사항을 기반으로 `User Flow Diagram` 혹은 `Flow Chart` 작성
// - [ ] UI/UX
//     - [ ] 사용자를 위한 로딩 환경 개선
//     - [ ] 페이징 혹은 인피니티 스크롤 적용 (별도의 API 없음)
//         - [ ] 뒤로가기 기존 페이지 및 스크롤 위치 기억 
//         - [ ] 페이지 전환시 기존 페이지 및 스크롤 위치 기억
//     - [ ] 상품이 없을 때와 같은 다양한 `Edge Case` 대응
//     - [ ] 반응형 레이아웃 구현
//     - [ ] 별도의 모바일 레이아웃 추가 제공
//     - [ ] [배민상회](https://mart.baemin.com)를 참고하여 추가 개선 사항 반영

// - [ ] 매출 증대 및 마케팅을 위해 별도의 기능 구현 (별도의 API 없음)
//     - [ ] 브라우저 새로고침시 모든 상태 유지
//     - [ ] 흐름을 고려한 맞춤 큐레이팅 **상품 추천** 기능
//     - [ ] 구매 유도를 위한 **상품 찜** 페이지
// - [ ] 매출 증대 및 마케팅을 위한 별도의 도구 추가
//     - [ ] Google Analytics
//     - [ ] Google Tag Manager

const BASE_URL = "http://localhost:3003";
const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(async() => {
    await MenuAPI.getList("products")
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <GNB />
      <ul className="product-container">
        {products.map(product => {
          return (
            <li key={product.id}>
              <div className='product-img'>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-footer">
                <div className="product-info">
                  <span className="product-info__name">{product.name}</span>
                  <span className="product-info__price">{product.price}</span>
                </div>
                <CartButton />
              </div>
              
            </li>
          )
        })}
      </ul>
    </>
    
  )
};

export default ProductListPage;
