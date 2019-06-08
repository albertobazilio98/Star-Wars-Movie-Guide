import axios from "axios";

const api = () => {
  let api = axios.create({
    baseURL: "https://swapi.co/api/films"
  });

  return api;
};

const find = language => {
  return api().get(`?format=${language}`);
};

export default find;
