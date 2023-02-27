import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/auth/";

const API_URL_AWS = "https://54.237.60.164.nip.io/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  registerEnterprise(nit, name, address, phone, user) {
    return axios.post(API_URL + "createnterprise", {
      nit, 
      name, 
      address, 
      phone, 
      user
    }, { headers: authHeader() });
  }

  updateEnterprise(nit, name, address, phone, user) {
    return axios.post(API_URL + "update", {
      nit, 
      name, 
      address, 
      phone, 
      user
    }, { headers: authHeader() });
    
  }

  deleteEnterprise(nit) {
    return axios.put("https://54.237.60.164.nip.io/api/delete", {
      nit
    }, { headers: authHeader() });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();