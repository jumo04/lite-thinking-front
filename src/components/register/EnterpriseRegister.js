import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const vunit = value => {
  if (value.length < 8 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The nit must be between 8 and 10 characters.
      </div>
    );
  }
};


export default class EnterpriseRegister extends Component {
  constructor(props) {
    super(props);
    this.handleEnterpriseRegister = this.handleEnterpriseRegister.bind(this);
    this.onChangeNit = this.onChangeNit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.state = {
      nit: "",
      name: "",
      address: "",
      phone: "",
      successful: false,
      message: ""
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (!user) this.setState({ redirect: "/home" });
    this.setState({ currentUser: user, userReady: true })
  }

  onChangeNit(e) {
    this.setState({
      nit: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  handleEnterpriseRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.registerEnterprise(
        this.state.nit,
        this.state.name,
        this.state.address,
        this.state.phone,
        this.state.currentUser
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleEnterpriseRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="nit">Nit</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nit"
                    value={this.state.nit}
                    onChange={this.onChangeNit}
                    validations={[required, vunit]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Direccion</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefono</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Registrar Empresa</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
