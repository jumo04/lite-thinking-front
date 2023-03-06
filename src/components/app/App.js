import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "../../services/auth.service";
import { Navbar, Nav } from 'react-bootstrap'

import Login from "../login/Login";
import Register from "../register/Register";
import RegisterEnterprise from "../register/EnterpriseRegister";
import Home from "../dashboard/Home";
import Profile from "../profile/Profile";
import BoardUser from "../dashboard/Board-user";
import BoardAdmin from "../dashboard/Board-admin";
import PdfComponent from '../pdf/PdfComponent';
import DataComponent from '../inventory/DataComponent';
import SendComponent from '../inventory/SendComponent';
import AddInventory from '../inventory/classComponent';
import EditPrise from "../register/EditPrise";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      menuToggle: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div>
        <Navbar className="navbar navbar-expand navbar-border">
          <Link to={"/"} className="navbar-brand">
            Lite-thinking
          </Link>
          <Navbar.Toggle />
          <div className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            

            {showAdminBoard && (
              <div className=" ml-auto">
               <li className="nav-item">
                <Link to={"/addinventory"} className="nav-link">
                  Agregar Inventario
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
              </div>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Salir
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Ingresar
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registrarse
                </Link>
              </li>
            </div>
          )}
        </Navbar>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerenterprise" element={<RegisterEnterprise />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/addinventory" element={<AddInventory />} />
            <Route path="/pdf" element={<PdfComponent />} />
            <Route path="/generate" element={<DataComponent />} />
            <Route path="/send" element={<SendComponent />} />
            <Route path="/editprise/:slug" element={<EditPrise />}  />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
