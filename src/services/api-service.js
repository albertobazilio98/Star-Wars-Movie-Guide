import axios from "axios";

const api = () => {
  let api = axios.create({
    baseURL: "https://swapi.co/api/films"
  });

  return api;
};

const find = race => {
  return api().get(`?format=${race}`);
};

export default find;
