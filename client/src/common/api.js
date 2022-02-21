import { API_END_POINT } from "@common/constants";

export const request = async (uri, { method = "", body, ...customConfig } = {}) => {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const url = `${API_END_POINT}/${uri}`;
    const response = await fetch(url, config);
    data = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }

    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
};

request.get = function (uri, customConfig = {}) {
  return request(uri, { method: "GET", ...customConfig });
};

request.post = function (uri, body, customConfig = {}) {
  return request(uri, { method: "POST", body, ...customConfig });
};

request.delete = function (uri, customConfig = {}) {
  return request(uri, { method: "DELETE", ...customConfig });
};
