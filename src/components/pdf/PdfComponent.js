import React, { Component, useRef } from "react";
import {ReactToPrint, useReactToPrint} from 'react-to-print';
import DataComponent from './DataComponent';




export default class PdfComponent extends Component  {
    

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrint = this.handlePrint.bind(this);

    this.state = {
      content: "",
      message: "",
      base64: ""
    };
  }

  onChange(e) {
    const files = e.target.files;
    const file = files[0];
    this.getBase64(file);
  }

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

  handleSubmit(e){
    e.preventDefault();

    
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
        base64Data: this.state.base64,
        date: new Date(),
        fileName: "TEST_FILE_NAME"
      })
    })
  }
  


    render() {
      return (
        <div>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
          />
          <DataComponent ref={(response) => (this.componentRef = response)} />

          {/* <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button onClick={this.handleSubmit} className="btn btn-success">Send PDF</button>}
          /> */}


        </div>
      );
    }
}


