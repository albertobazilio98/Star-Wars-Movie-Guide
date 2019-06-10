import axios from "axios";

const api = () => {
  let api = axios.create({
    baseURL: "https://swapi.co/api/"
  });

  return api;
};

const find = url => {
  return api().get(`${url}?format=json`);
};

export default find;
