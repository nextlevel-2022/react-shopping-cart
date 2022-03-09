import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API';
import './CartPage.sass'

// #### 장바구니
// ​
// - [x] 해당 상품의 수량을 변경할 수 있다.
//   - [x] 상품의 수량은 항상 1이상, 20이하여야 한다
//     - [x] 상품의 수량이 1이면 상품 수량 감소할 수 없다.
//     - [x] 상품의 수량이 20이면 상품 수량 증가할 수 없다.
//   - [x] 해당 상품의 총 금액이 변경된다.
//   - [x] 해당 상품이 체크되어있으면, 결제예상금액도 변경된다.
// - [x] 모두선택 버튼이 체크되면, 상품들이 모두 선택된다.
//   - [x] 모두선택 버튼이 체크가 풀리면, 상품들의 선택이 모두 해제된다.
// - [x] 상품 삭제 버튼을 누르면, confirm 메시지가 보여진다.
//   - [x] 확인을 누르면, 선택된 상품이 모두 삭제된다.
//   - [x] 결제예상금액이 0원이 된다.
// - [x] �� 버튼을 누르면 confirm 메시지가 보여진다.
//   - [x] 확인을 누르면, 해당 상품이 삭제된다.
// - [x] 체크된 상품 개수에 따라 주문하기 버튼 내부에 수량이 변경된다.
// - [x] 주문하기 버튼을 누르면, confirm 메시지가 보여진다.
//   - [x] 확인을 누르면, 주문/결제 페이지로 이동한다.
//   - [x] 확인을 누르면, 장바구니에서 선택된 상품들이 삭제된다.
//   - [x] 확인을 누르면, 체크된 상품들을 데이터베이스에서 제거한다.
// - [x] 주문할 상품이 0개이면 버튼이 비활성화된다.
/*
const productInfo = {
  id,
  product: {},
  quantity,
  checked
  ==>
  id,
  price,
  name,
  imageUrl,
  quantity
}
*/
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const updateCart = async() => {
    await API.getProduct("/carts")
      .then(res => res.data)
      .then(datas => datas.map(data => {
        const {id, product} = data;
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
  useEffect(() => {
    updateCart();
  }, [])
  
  const deleteHandler = (e) => {
    const result = window.confirm("해당 상품을 장바구니에서 삭제하시겠습니까?")
    if (result) {
      API.deleteProduct(`/carts/${e.target.id}`)
      .then(res => console.log(res))
    }
    updateCart();
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
      //deactive button
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
    
    updateCart();
  }
  const orderHandler = async (e) => {
    if (!totalCount()) return;
    const result = window.confirm("선택된 상품들을 구매하시겟습니까?");
    if (result) {
      const modifiedCart = cart.map(product => {
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
      })
      await API.postProduct("/orders", {
        orderDetails: modifiedCart
      })
        .then(data => console.log(data))
      
      await totalDeleteHandler();
      navigate("/orderList")
    }
  }

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
                <label className="checkbox-label" for="checkbox">선택해제</label>
              </div>
              <button className="delete-button" onClick={totalDeleteHandler}>상품삭제</button>
            </div>

            <h2 className="cart-title">든든배송 상품 ({cart.length}개)</h2>
            <hr className="divide-line-gray mt-10" />
            {cart.map(product => {
              return (
                <>
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
                        <input type="number" className="number-input" min="1" max="20" value={product.quantity}/>
                        <div onClick={quantityHandler} id={product.name}>
                          <button className="number-input-button increase">▲</button>
                          <button className="number-input-button decrease">▼</button>
                        </div>
                      </div>
                      <span className="cart-price">{product.price}</span>
                    </div>
                  </div>
                  <hr className="divide-line-thin mt-10" />
                </>
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
                <button className="primary-button flex-center" onClick={orderHandler}>
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
