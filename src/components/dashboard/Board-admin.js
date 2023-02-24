import React, { Component } from "react";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// import Params from './params';





export default class AdminBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      setData: "",
      data: "",
      enterprises: [],
      enterprise: []
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
           <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nit</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Direccion</TableCell>
                  <TableCell align="right">Telefono</TableCell>
                  <TableCell align="right">Opciones Admin </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>

                {this.state.enterprises.map((row) => (
                <TableRow
                  key={row.nit}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nit}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right"> <button className="btn btn-primary" onClick={event => this.edit(event)} value={row.nit}>Editar </button> 
                  <button className="btn btn-primary btn-danger" onClick={event => this.delete(event)} value={row.nit} > Eliminar</button></TableCell>

                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
           </div>
        </div>
      </div>
      
    );
  }
}