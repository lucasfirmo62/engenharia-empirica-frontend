import axios from 'axios';

const api = axios.create({
  baseURL: 'https://slate-gray-turtle-gown.cyclic.app/', // URL da sua API backend
  timeout: 10000 // tempo limite da requisição (opcional)
});

export default api;