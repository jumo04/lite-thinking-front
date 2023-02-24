import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const API_URL_AWS = 'https://lite-thinking-back.herokuapp.com/api/test/';



class UserService {
  getPublicContent() {
    return axios.get(API_URL_AWS + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL_AWS + 'user', { headers: authHeader() });
  }

  getEnterprise(nit) {
    return axios.put('https://lite-thinking-back.herokuapp.com/api/enterprise', {
      nit
    }, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL_AWS + 'admin', { headers: authHeader() });
  }
}

export default new UserService();