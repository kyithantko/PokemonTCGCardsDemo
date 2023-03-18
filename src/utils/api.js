import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2',
  headers: {
    'X-Api-Key': '66c2b49d-169e-4829-b429-68d7740a9cfe',
  },
});

export default api;
