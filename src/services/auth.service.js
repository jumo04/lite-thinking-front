import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/auth/";

const API_URL_AWS = "https://main.d23zqw3sbnrvm5.amplifyapp.com/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL_AWS + "signin", {
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
    return axios.post(API_URL_AWS + "signup", {
      username,
      email,
      password
    });
  }

  registerEnterprise(nit, name, address, phone, user) {
    return axios.post(API_URL_AWS + "createnterprise", {
      nit, 
      name, 
      address, 
      phone, 
      user
    }, { headers: authHeader() });
  }

  updateEnterprise(nit, name, address, phone, user) {
    return axios.post(API_URL_AWS + "update", {
      nit, 
      name, 
      address, 
      phone, 
      user
    }, { headers: authHeader() });
  }

  deleteEnterprise(nit) {
    return axios.put("https://main.d23zqw3sbnrvm5.amplifyapp.com/api/delete", {
      nit
    }, { headers: authHeader() });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();