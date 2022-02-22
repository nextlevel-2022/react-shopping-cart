import { BASE_URL } from "../constants";

const payOrder = async () => {
  const data = await fetch(`${BASE_URL}/orders`, { method: "POST" }).then(
    (resp) => resp.json()
  );
  return data;
};

const getOrderList = async () => {
  const data = await fetch(`${BASE_URL}/orders`, {
    headers: { "Content-type": "applicaiton/json" },
  }).then((resp) => resp.json());
  return data;
};

const getOrder = async (orderId: number) => {
  const data = await fetch(`${BASE_URL}/orders/${orderId}`, {
    headers: { "Content-type": "applicaiton/json" },
  }).then((resp) => resp.json());
  return data;
};

export { getOrder, getOrderList, payOrder };
