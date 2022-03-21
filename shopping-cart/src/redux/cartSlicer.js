const initialState = {
  cart: []
};

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    product
  });

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id
})

export default function cartReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.product)
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.id)
      };
    default:
      return state;
  }
}