import axios from "axios";

export const BASE_URL = "https://localhost:7074/";

export const createAPIEndpoint = () => {
  let url = BASE_URL + "api/ClientContacts/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updateRecord) => axios.put(url + id, updateRecord),
    delete: (id) => axios.delete(url + id),
  };
};
