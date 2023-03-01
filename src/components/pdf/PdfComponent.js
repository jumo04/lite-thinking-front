import React, { Component, useRef } from "react";
import {ReactToPrint, useReactToPrint} from 'react-to-print';
import DataComponent from './DataComponent';

import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import jsPdf from "jspdf";
import { width } from "@mui/system";





export default class PdfComponent extends Component  {
    

  constructor(props) {
    super(props);
    // this.onChange = this.onChange.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.printPDf = this.printPDf.bind(this);

    this.state = {
      content: "",
      message: "",
      base64: "",
      pdf: ""
    };
  }

  // onChange(e) {
  //   const files = e.target.files;
  //   const file = files[0];
  //   this.getBase64(file);
  // }

  onLoad(fileString){
    this.setState({base64: fileString})
  }

  getBase64(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.onLoad(reader.result)
    }
  }

  sendEmail(base64){
    // e.preventDefault();

    
    fetch("https://cbggv12zcd.execute-api.us-east-1.amazonaws.com/sendemail", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        senderName: "siyah44048@wifame.com",
        senderEmail: "siyah44048@wifame.com",
        message: "hola este es desde react lite ",
        base64Data: base64,
        date: new Date(),
        fileName: "TEST_FILE_NAME"
      })
    })
  }
  
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
      const pdfDocGenerator = pdfMake.createPdf(pdfExportSetting);

      pdfDocGenerator.getBase64((encodedString) => {
        console.log(encodedString);
          this.setState({
            base64: encodedString
       });
        this.sendEmail();
      });
      // pdfDocGenerator.getBase64((data) => {
      //   // alert(data);
      //   this.setState({
      //     base64: data,
      //     pdf: data
      //  });
      // });
      
      const doc = new jsPdf();
      // doc.save('download.pdf');
      
    });

  }

    render() {
      return (
        <div>
          {/* <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
          /> */}

          <span id="print_to_pdf">
            <DataComponent ref={(response) => (this.componentRef = response)} />
          </span>

          <button onClick={this.printPDf} className="btn btn-success">Send PDF</button>
          {/* <ReactToPrint
            content={() => this.componentRef}
            trigger={() => }
          /> */}

        </div>
      );
    }
}


