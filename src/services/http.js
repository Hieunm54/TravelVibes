import axios from "axios";

const get = async (url, headers) => {
  return axios.get(url, { headers });
};

const post = async (url, headers, data) => {
  return axios.post(url, data, { headers });
};

export { get, post };
