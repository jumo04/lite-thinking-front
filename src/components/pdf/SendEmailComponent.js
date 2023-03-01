import React, { Component } from "react";
import ReactToPrint from 'react-to-print';
import DataComponent from './DataComponent';



export default class PdfComponent extends Component  {
    
    render() {
      return (
        <div>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
          />
          <button className="btn btn-primary">Send PDF!</button>
          <DataComponent ref={(response) => (this.componentRef = response)} />
        </div>
      );
    }
}
