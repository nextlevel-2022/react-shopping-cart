const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  },
  Delete(data) {
    return {
      method: "DELETE"
    }
  }
}

const request = async(url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("error")
    console.error(response)
  }

  return response && response.json();
}

const BASE_URL = "http://localhost:3003";

const MenuAPI = {
  async getList(category) {
    return request(`${BASE_URL}/${category}`);
  },
  async addProduct(category, data) {
    return request(`${BASE_URL}/${category}`, HTTP_METHOD.POST(data))
  },
  async deleteProduct(category, id) {
    return request(`${BASE_URL}/${category}/${id}`, HTTP_METHOD.Delete())
  }
}

export default MenuAPI
