import API from './index';

const apiHandler = {
  getProduct: async ({ id }) => {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch {
      console.log(error);
    }
  },
  getProducts: async () => {
    try {
      const response = await API.get(`/products/`);
      return response.data;
    } catch {
      console.log(error);
    }
  },
  postProduct: async ({ product }) => {
    try {
      await API.post({
        method: "post",
        url: "/products",
        data: product,
      });
    } catch {
      console.log(error);
    }
  },
  deleteProduct: async ({ id }) => {
    try {
      await API.delete(`/products/${id}`);
    } catch {
      console.log(error);
    }
  },
  getCarts: async () => {
    try {
      const response = await API.get(`/carts/`);
      return response.data;
    } catch {
      console.log(error);
    }
  },
  postCart: async ({ product }) => {
    try {
      await API.post({
        method: "post",
        url: "/carts",
        data: product,
      });
    } catch {
      console.log(error);
    }
  },
  // patchCart: async ({ }) => {
  //   try {
  //     await API.patch({
  //       method: "patch",
  //       url: "/carts",
  //       data: product,
  //     });
  //   } catch {
  //     console.log(error);
  //   }
  // },
  deleteCart: async ({ id }) => {
    try {
      await API.delete(`/carts/${id}`);
    } catch {
      console.log(error);
    }
  },
  getOrder: async ({ id }) => {
    try {
      const response = await API.get(`/orders/${id}`);
      return response.data;
    } catch {
      console.log(error);
    }
  },
  getOrders: async () => {
    try {
      const response = await API.get(`/orders/`);
      return response.data;
    } catch {
      console.log(error);
    }
  },
  postOrder: async ({ product }) => {
    try {
      await API.post({
        method: "post",
        url: "/orders",
        data: product,
      });
    } catch {
      console.log(error);
    }
  },
};

export default apiHandler
