import API from './index';

const apiHandler = {
  getProduct: async ({ id }) => {
    try {
      const response = await API.get(`/products/${id}`)
      return response
    } catch {
      console.log(error);
    }
  },
  getProducts: async () => { 
    try {
      const response = await API.get(`/products/`)
      return response
    } catch {
      console.log(error);
    }
  },
  postProduct: async ({ products }) => {
    try {
      await API.post({
      method: "post",
      url: "/products",
      data: products,
    })
    } catch {
      console.log(error);
    }
  },
  deleteProduct: async ({ id }) => {
    try {
      await API.delete(`/product/${id}`)
    } catch {
      console.log(error);
    }
  }
};

export default apiHandler
