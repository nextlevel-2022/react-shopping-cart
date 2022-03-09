const axios = require("axios");
const BASE_URL = "http://localhost:3003"
const API = {
  async getProduct(uri) {
    return axios.get(`${BASE_URL}${uri}`);
  },
  async postProduct(uri, body) {
    return axios.post(`${BASE_URL}${uri}`, body);
  },
  async deleteProduct(uri) {
    return axios.delete(`${BASE_URL}${uri}`)
  }
}

export default API;
