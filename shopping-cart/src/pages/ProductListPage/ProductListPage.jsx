import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../API';
import CartButton from '../../common/CartButton/CartButton';
import "./ProductListPage.sass"

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(async() => {
    API.getProduct("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <>
      
      <div className="product-container" >
        {products.map(product => {
          return (
            <Link key={product.id} to={`/products/${product.id}`}>
            <li key={product.id} className={product.id}>
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
            </Link>
          )
        })}
      </div>
    </>
    
  )
};

export default ProductListPage;
