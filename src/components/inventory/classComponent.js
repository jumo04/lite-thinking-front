import { createRef, Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import pdfMake from "pdfmake/build/pdfmake";
import AuthService from "../../services/auth.service";
import ProductService from "../../services/product.service";
import html2canvas from "html2canvas";



const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


  

export default class AddInventory extends Component{
    constructor(props) {
        super(props);
        const currentUser = AuthService.getCurrentUser();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRef = this.onChangeRef.bind(this);
        this.onChangePrice= this.onChangePrice.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.sendPDf = this.sendPDf.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

    
        this.state = {
            name: "",
            ref: "",
            price: "",
            qty: "",
            products: [],
            currentUser: currentUser.username,
            email: currentUser.email,
            base64: "",
            message: "",
            successful: false
        }
        this.form = createRef();
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        });
      }

    onChangeRef(e) {
        this.setState({
          ref: e.target.value
        });
      }
    
    onChangePrice(e) {
      this.setState({
          price: e.target.value
        });
      }
    onChangeQty(e) {
      this.setState({
        qty: e.target.value
      });
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
          console.log(this.state.products);
      
      }

      sendPDf(e){
        e.preventDefault();
        const domElement = document.getElementById("print_to_pdf");
        var buttons = document.getElementsByClassName("button_hide");
        document.getElementById("hidden").style.visibility = "hidden";
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].style.visibility = "hidden";
        }
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
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].style.visibility = "visible";
          }
        document.getElementById("hidden").style.visibility = "visible";

        });
      }

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
            senderName: "siyah44048@wifame.com",
            senderEmail: this.state.email,
            message: "Hola este deberia ser el archivo final",
            base64Data: this.state.base64,
            date: new Date(),
            fileName: "lite-download" + this.state.currentUser
          })
        })
      }


    // addproduct handler method

    add = (event) => {
        event.preventDefault();

        this.setState({
            message: "",
            successful: false
          });

        this.form.validateAll();

      
        //console.log(formData.current)
        const newProduct = {
            product_name: this.state.name,
            ref: this.state.ref,
            qty: this.state.qty,
            price: this.state.price
        }
        // add a new product inside products array
        this.state.products.push(newProduct);
        this.setState({
            products: this.state.products
        });
        console.log(this.state.qty);
        ProductService.create(
          this.state.name,
          this.state.ref,
          this.state.qty,
          this.state.price,
        );
        
        //console.log(products);
    }
    // increment qty value by 1
    increQty = (event) => {
        //console.log(event.target.value)
        const indexOfArray = event.target.value;
        console.log(this.state.products[indexOfArray].ref);
        this.state.products[indexOfArray].qty = parseInt(this.state.products[indexOfArray].qty) + 1   ;
        this.setState({ 
            products: this.state.products
        });
        ProductService.upgrade(this.state.products[indexOfArray].ref);
    }
    // decrement qty value by 1
    decreQty = (event) => {
        const indexOfArray = event.target.value;
        this.state.products[indexOfArray].qty = parseInt(this.state.products[indexOfArray].qty) - 1;
        this.setState({
            products: this.state.products
        });
        ProductService.downgrade(this.state.products[indexOfArray].ref);
    }

    delete = (event) => {
      console.log(event.target.value);
      ProductService.delete( this.state.products[event.target.value].ref).then(
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
        <div>
            <div className=' justify-content-center'>
            <Form onSubmit={this.add} ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
                <div>
                    <div className="form-group" htmlFor="formBasicProductName">
                        <label>Product Name:</label>
                        <Input type="text" placeholder="Nombre del producto" name="product_name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        validations={[required]}/> 
                    </div>
                    <div className="form-group" htmlFor="formBasicRef">
                        <label>Ref:</label>
                        <Input type="text" placeholder="Referencia del producto" name="ref"
                        value={this.state.ref}
                        onChange={this.onChangeRef}
                        validations={[required]}/> 
                    </div>
                    <div className="form-group" htmlFor="formBasicPrice">
                        <label>Price:</label>
                        <Input type="number" placeholder="Precio en COP" name="price" value={this.state.price}
                        onChange={this.onChangePrice}
                        validations={[required]}/>
                    </div>

                    <div className="form-group" htmlFor="formBasicQty">
                        <label>Quantity:</label>
                        <Input type="number" placeholder="Cuantos" name="qty" value={this.state.qty}
                        onChange={this.onChangeQty}
                        validations={[required]}/>
                    </div>
                    <div className='form-group'>
                    <button className="btn btn-primary" type="submit">
                        Add to Inventory
                    </button>
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
                </Form>
                <div className='button_group text-box'>
                    <a href="/generate"  className="btn btn-white btn-animate">Descargar PDF</a>
                    <a href="/send"  className="btn btn-white btn-animate">Enviar PDF</a>
                </div>
                </div>
                
                <span id='print_to_pdf'>
                <div id="DataTable">
                 <div id="table_box_bootstrap"></div>
                    <table >
                        <thead>
                            <tr>
                                <th>Product Name:</th>
                                <th>Ref:</th>
                                <th>Price</th>
                                <th >Qty</th>
                                <th id='hidden'>Options</th>
                                <th className='button_hide '></th>
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
                                          <td className='t_hide  text-center'>
                                              <button  className='button_hide btn btn-white btn-animate green' onClick={event => this.increQty(event)} value={index}>+</button>
                                              
                                              <button  className='button_hide btn btn-white btn-animate red' onClick={event => this.decreQty(event)} value={index}>-</button>
                                          </td>
                                          <td className='t_hide'>
                                          <button className="button_hide btn btn-primary btn-danger" onClick={event => this.delete(event)} value={index} > Eliminar</button>
                                          </td>
                                      </tr>
                                  )
                              })
                            }
                        </tbody>
                    </table>
                  </div>
                </span>
                
            </div>            
        )
    }

}