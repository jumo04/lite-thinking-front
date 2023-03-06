import React, { Component } from "react";
import ProductService from "../../services/product.service";
import AuthService from "../../services/auth.service";

import pdfMake from "pdfmake/build/pdfmake";
import html2canvas from "html2canvas";


export default class DataComponent extends Component {

  constructor(props) {
    super(props);
    const currentUser = AuthService.getCurrentUser();
    this.printPDf = this.printPDf.bind(this);

    this.state = {
        products: [],
        base64: "",
        currentUser: currentUser.username,
        successful: false
    }
  }

  componentDidMount() {
    ProductService.getProducts().then(response => {
      this.state.products = response.data;
          this.setState({
            products: this.state.products
        });
      },
      error => {
        this.setState({
          products:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
      
      setTimeout(() => this.printPDf(), 4000);
      setTimeout(() => window.location.replace("/addinventory" ), 5000);
      
  };

  

  printPDf(){
    const domElement = document.getElementById("print_to_pdf");
  
    html2canvas(domElement).then((canvas) => {
      var data = canvas.toDataURL();
      var pdfExportSetting = {
        content: [
          {
            image: data,
            width: 500
          }
        ]
      };
    const pdfDocGenerator = pdfMake.createPdf(pdfExportSetting).download("lite-download" + this.state.currentUser);
    });

  };
    render() {
      return (
        <span id='print_to_pdf'>
        <table >
        <thead>
            <tr>
                <th>Product Name:</th>
                <th>Ref:</th>
                <th>Price</th>
                <th>Qty</th>
            </tr>
        </thead>
        <tbody className="scroll-pane">
        {this.state.products.map((item, index) => {
                  return (
                      <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.ref}</td>
                          {
                            (() => {
                                if(!item.price) {
                                        return (
                                          <td>{item.value}</td>
                                        )
                                    } else {
                                        return (
                                          <td>{item.price}</td>
                                        )
                                    }
                            })()  
                          }
                          {
                            (() => {
                                if(!item.qty) {
                                        return (
                                          <td>{item.amount}</td>
                                        )
                                    } else {
                                        return (
                                          <td onChange={this.onChangeQty}>{item.qty}</td>
                                        )
                                    }
                            })()  
                          }
                      </tr>
                  )
              })
            }
        </tbody>
    </table>
    </span>
             
      );
    }
  }
