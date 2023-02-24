import React, { Component, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';

import UserService from "../../services/user.service";

export default class BoardUser extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      enterprises: []
    };
  }


  componentDidMount() {
    UserService.getUserBoard().then(response => {
      const data = response;
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
    console.log(this.state.enterprises);

  }

  
  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nit</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Telefono</TableCell>
              <TableCell align="right">Inventario</TableCell>
              <TableCell align="right">Opciones Admin {this.state.data} </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>

            {this.state.enterprises.map((row) => (
            <TableRow
              key={row.nit}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row">
                {row.nit}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
     
        </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
