import React, { Component } from "react";

import UserService from "../../services/user.service";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.getBase64 = this.getBase64.bind(this);

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

  // handleSubmit(e){
  //   e.preventDefault();

  //   fetch("https://cbggv12zcd.execute-api.us-east-1.amazonaws.com/sendemail", {
  //     mode: "no-cors",
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       senderName: "siyah44048@wifame.com",
  //       senderEmail: "siyah44048@wifame.com",
  //       message: "hola este es desde react lite ",
  //       base64Data: this.state.base64,
  //       date: new Date(),
  //       fileName: "TEST_FILE_NAME"
  //     })
  //   })
  // }

  componentDidMount() {

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
         {/* <form>
            <input type="file" accept="application/pdf" onChange={this.onChange}/>
         </form>
         <button onClick={this.handleSubmit}> enviar a lamnda</button>
         */}
      </div>
    );
  }
}
