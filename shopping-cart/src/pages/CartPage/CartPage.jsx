import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../API';
import './CartPage.sass'
import { addToCart,removeFromCart } from './cartSlicer.js';
// 카트페이지 담긴것들만 이동해서 payment로 이동시키도록, redux를 이용해보자
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateCart = async() => {
    API.getProduct("/carts")
      .then(res => res.data)
      .then(datas => datas.map(({id, product}) => {
        const information = {
          id,
          price: product.price,
          name: product.name,
          imageUrl: product.imageUrl,
          quantity: 1,
          checked: true
        }

        return information;
      }))
      .then(informations => setCart([...informations]))
      .catch(err => console.log(err));
  }
  
  const deleteHandler = (e) => {
    const result = window.confirm("해당 상품을 장바구니에서 삭제하시겠습니까?")
    if (result) {
      API.deleteProduct(`/carts/${e.target.id}`)
      .then(res => console.log(res))
    }
  }

  const quantityHandler = (e) => {
    // redux로 핸들링해야될듯 cart 전체를 
    const name = e.currentTarget.id;
    const button = e.target.className;
    if (button.includes("increase")) {
      const newCart = cart.map(product => {
        if(product.name === name) {
          product.quantity = product.quantity < 20 ? product.quantity + 1 : product.quantity;
        }
        return product;
      })
      setCart(newCart);
    } else if (button.includes("decrease")) {
      const newCart = cart.map(product => {
        if(product.name === name) {
          product.quantity = product.quantity > 1 ? product.quantity - 1 : product.quantity
        }
        return product;
      })
      setCart(newCart);
    }
  }

  const totalPrice = () => {
    let sum = 0;
    cart.forEach(product => {
      if (product.checked) {
        sum += product.price * product.quantity
      }
    })
    sum = sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return sum;
  }

  const totalCount = () => {
    let count = 0;
    cart.forEach(product => {
      if (product.checked) {
        count++;
      }
    })

    if (!count) {
      const btn = document.querySelector(".primary-button");
      //deactive button color change
    }
    return count;
  }

  const toggleCheckBox = (e) => {
    const targetId = +e.target.id;
    const updatedCart = cart.map(product => {
      if (product.id === targetId) {
        product.checked = !product.checked
      }
      return product;
    })
    setCart(updatedCart)
  }
  const combineToggleCheckBox = (e) => {
    const isCheked = e.target.checked;
    const updatedCart = cart.map(product => {
      product.checked = isCheked;
      return product;
    })
    setCart(updatedCart);
  }
  const totalDeleteHandler = async (e) => {
    if(e) {
      const result = window.confirm("선택된 상품들을 모두 삭제하시겠습니까?")
      if (result) {
        cart.forEach(product => {
          if (product.checked) {
            API.deleteProduct(`/carts/${product.id}`);
          }
        })
      }
    } else {
      cart.forEach(product => {
        if (product.checked) {
          API.deleteProduct(`/carts/${product.id}`);
        }
      })
    }
  }
  const orderHandler = async (e) => {
    if (!totalCount()) return; // click deactive
    const result = window.confirm("선택된 상품들을 구매하시겟습니까?");
    if (result) {
      const modifiedCart = cart.filter(product => {
        if (product.checked) {
          const modified = {
            id: product.id,
            price: product.price,
            name: product.name,
            imageUrl: product.imageUrl,
            quantity: product.quantity
          }

          return modified;
        }
      });
      dispatch(addToCart(modifiedCart));
      await totalDeleteHandler();
      navigate("/payment");
    }
  }

  useEffect(() => {
    updateCart();
  }, [cart.length]);

  return (
    <section>
      <header className="cart-header">
        <h1>장바구니</h1>
      </header>
      
      <div className="cart-box">
        <section className="cart-left-section">
            <div className="cart-left-section-header">
              <div className="checkbox-container">
                <input
                  className="checkbox"
                  name="checkbox"
                  type="checkbox"
                  defaultChecked
                  onChange={combineToggleCheckBox}
                />
                <label className="checkbox-label" htmlFor="checkbox">선택해제</label>
              </div>
              <button className="delete-button" onClick={totalDeleteHandler}>상품삭제</button>
            </div>

            <h2 className="cart-title">든든배송 상품 ({cart.length}개)</h2>
            <hr className="divide-line-gray mt-10" />
            {cart.map(product => {
              return (
                <li key={product.id}>
                  <div className="cart-container" key={product.id}>
                    <div className="cart-container-left">
                      <input
                        className="checkbox"
                        name="checkbox"
                        type="checkbox"
                        checked={product.checked}
                        id={product.id}
                        onChange={toggleCheckBox}
                      />
                      <img
                        src= {product.imageUrl}
                        alt= {product.name}
                      />
                      <span className="cart-name">{product.name}</span>
                    </div>
                    <div className="cart-container-right">
                      <img
                        className="cart-trash-svg"
                        src="src/svgs/trash.svg"
                        alt="삭제"
                        id={product.id}
                        onClick={deleteHandler}
                      />
                      <div className="number-input-container">
                        <input type="number" className="number-input" min="1" max="20" value={product.quantity} readOnly/>
                        <div onClick={quantityHandler} id={product.name}>
                          <button className="number-input-button increase">▲</button>
                          <button className="number-input-button decrease">▼</button>
                        </div>
                      </div>
                      <span className="cart-price">{product.price}</span>
                    </div>
                  </div>
                  <hr className="divide-line-thin mt-10" />
                </li>
              )
            })}
        </section>

        <section className="cart-right-section">
            <div className="cart-right-section-top">
              <h3 className="cart-title">결제예상금액</h3>
            </div>
            <hr className="divide-line-thin" />
            <div className="cart-right-section-bottom">
              <div className="cart-right-section-bottom-span">
                <span className="highlight-text">결제예상금액</span>
                <span className="highlight-text">{totalPrice()} 원</span>
              </div>
              <div className="cart-right-section-bottom-button">
                <button className={`primary-button flex-center ${!totalCount() && "deactive"}`} onClick={orderHandler}>
                  주문하기({totalCount()}개)
                </button>
              </div>
            </div>
        </section>
      </div>
      
    </section>
  );
};

export default CartPage;
