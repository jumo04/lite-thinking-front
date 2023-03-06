import React, { Component } from "react";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";


export default class AdminBoard extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      setData: "",
      data: "",
      enterprises: [],
      enterprise: [],
      message: "",
      successful: false
    };
  }


  handleDelete(e) {
    e.preventdefault()
    this.setState({
      message: "",
      successful: false
    });
  
    AuthService.deleteEnterprise( this.state.nit ).then(
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


  componentDidMount() {
    UserService.getAdminBoard().then(response => {
            this.setState({ 
              enterprises: response.data
            });
      },
      error => {
        this.setState({
          enterprises:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  edit = (event) => {
    console.log(event.target.value);
    window.location.replace("/editprise/" + event.target.value);
  }

  delete = (event) => {
    console.log(event.target.value);
    AuthService.deleteEnterprise( event.target.value).then(
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
    window.location.reload();
  }
  
  render() {
    return (
      <div className="row">
        <div className="container">
           <div className="col-md">
            <table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <thead>
                <tr>
                  <th>Nit</th>
                  <th align="right">Nombre</th>
                  <th align="right">Direccion</th>
                  <th align="right">Telefono</th>
                  <th align="right">Opciones Admin </th>
                </tr>
                </thead>
                <tbody>

                {this.state.enterprises.map((row) => (
                <tr
                  key={row.nit}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <td component="th" scope="row">
                    {row.nit}
                  </td>
                  <td align="right">{row.name}</td>
                  <td align="right">{row.address}</td>
                  <td align="right">{row.phone}</td>
                  <td align="right"> <button className="btn btn-primary" onClick={event => this.edit(event)} value={row.nit}>Editar </button> 
                  <button className="btn btn-primary btn-danger" onClick={event => this.delete(event)} value={row.nit} > Eliminar</button></td>

                </tr>
              ))}
            </tbody>
            </table>
           </div>
        </div>
      </div>
      
    );
  }
}