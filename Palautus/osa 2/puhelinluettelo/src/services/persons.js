import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (tiedot) => {
  return axios.post(baseUrl, tiedot);
};

const update = (id, tiedot) => {
  return axios.put(`${baseUrl}/${id}`, tiedot);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
