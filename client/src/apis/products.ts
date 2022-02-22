import { BASE_URL } from "../constants";
import { PostProductRequest, Product } from "../types/dto";

const getProductList = async (): Promise<Product[]> => {
  const data = await fetch(`${BASE_URL}/products`, {
    headers: { "Content-type": "applicaiton/json" },
  }).then((resp) => resp.json());
  return data;
};

const getProduct = async (productId: number): Promise<Product> => {
  const data = await fetch(`${BASE_URL}/products/${productId}`, {
    headers: { "Content-type": "applicaiton/json" },
  }).then((resp) => resp.json());
  return data;
};

const addProduct = async (params: PostProductRequest) => {
  const data = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(params),
  }).then((resp) => resp.json());
  return data;
};

const deleteProduct = async (productId: number) => {
  const data = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "POST",
  }).then((resp) => resp.json());
  return data;
};

export { getProductList, addProduct, getProduct, deleteProduct };
