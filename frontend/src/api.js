import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/', // URL da sua API backend
  timeout: 10000 // tempo limite da requisição (opcional)
});

export default api;