import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/admin/product/";


class ProductService {
  
  create(name, ref, qty, price) {
    return axios.post(API_URL + "create", { 
      name, 
      ref, 
      qty, 
      price 
    }, { headers: authHeader() });
  }

  getProducts() {
    return axios.get( API_URL + 'products', { headers: authHeader() });
  }

  upgrade(ref) {
    return axios.put(API_URL + "upgrade", { 
      ref
    }, { headers: authHeader() });
  }

  downgrade(ref) {
    return axios.put(API_URL + "downgrade", { 
      ref
    }, { headers: authHeader() });
  }
  delete(ref) {
    return axios.put(API_URL + "delete", { 
      ref
    }, { headers: authHeader() });
  }

  update(name, ref, qty, price) {
    return axios.put(API_URL + "update", {
      name, ref, qty, price
    }, { headers: authHeader() });
    
  }
}

export default new ProductService();