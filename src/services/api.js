//Ref: https://blog.rocketseat.com.br/reactjs-autenticacao/

import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://api-navetest.herokuapp.com/v1/"
});
// verifica se tem o token e adiciona no header
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
