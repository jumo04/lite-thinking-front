import React, { Component } from "react";
import ProductService from "../../services/product.service";
import AuthService from "../../services/auth.service";

import pdfMake from "pdfmake/build/pdfmake";
import html2canvas from "html2canvas";

  
export default class SendComponent extends Component {

  constructor(props) {
    super(props);
    const currentUser = AuthService.getCurrentUser();
    this.sendPDf = this.sendPDf.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    this.state = {
        products: [],
        base64: "",
        currentUser: currentUser.username,
        email: currentUser.email,
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
      
      setTimeout(() => this.sendPDf(), 2000);
      setTimeout(() => window.location.replace("/addinventory" ), 10000);
      
  };


  sendPDf(){
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
    const pdfDocGenerator = pdfMake.createPdf(pdfExportSetting);

    pdfDocGenerator.getBase64((encodedString) => {
      console.log(encodedString);
      this.setState({
          base64: encodedString
      });
          this.sendEmail();
      });

    });
  };

  sendEmail(){
    // e.preventDefault();

    fetch("https://cbggv12zcd.execute-api.us-east-1.amazonaws.com/sendemail", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        senderName: "juanfernandomoreno04@gmail.com",
        senderEmail: "juanfernandomoreno04@gmail.com",
        message: "Hola este deberia ser el archivo final",
        base64Data: this.state.base64,
        date: new Date(),
        fileName: "lite-download" + this.state.currentUser
      })
    })

    console.log(this.state.base64);
    console.log("debio de haber enviado");
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
