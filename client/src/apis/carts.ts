import { PostCartRequest } from "src/types/dto";
import { BASE_URL } from "../constants";

const getCartList = async () => {
  const data = await fetch(`${BASE_URL}/carts`, {
    headers: { "Content-type": "applicaiton/json" },
  }).then((resp) => resp.json());
  return data;
};

const addCart = async (params: PostCartRequest) => {
  const data = await fetch(`${BASE_URL}/carts`, {
    method: "POST",
    body: JSON.stringify(params),
  }).then((resp) => resp.json());
  return data;
};

const deleteProductInCart = async (cartId: number) => {
  const data = await fetch(`${BASE_URL}/carts/${cartId}`, {
    method: "DELETE",
  }).then((resp) => resp.json());
  return data;
};

export { deleteProductInCart, addCart, getCartList };
