import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:8080/api/test/';
const API_URL_AWS = 'http://54.237.60.164:8080/api/test/';



class UserService {
  getPublicContent() {
    return axios.get("http://54.237.60.164:8080/api/test/all");
  }

  getUserBoard() {
    return axios.get( API_URL_AWS + 'user', { headers: authHeader() });
  }

  getEnterprise(nit) {
    return axios.put('http://54.237.60.164:8080/api/enterprise', {
      nit
    }, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL_AWS + 'admin', { headers: authHeader() });
  }
}

export default new UserService();