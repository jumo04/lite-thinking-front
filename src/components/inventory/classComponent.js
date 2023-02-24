import { createRef, Component } from 'react';
import Form from "react-validation/build/form";
import Table from '@mui/material/Table';
import Input from "react-validation/build/input";
import { Routes, Route, Link } from "react-router-dom";


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
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice= this.onChangePrice.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
    
        this.state = {
            name: "",
            price: "",
            qty: "",
            products: []
        }
        this.form = createRef();
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
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
            price: this.state.price,
            qty: this.state.qty
        }
        // add a new product inside products array
        this.state.products.push(newProduct);
        this.setState({
            products: this.state.products
        });
        //console.log(products);
    }
    // increment qty value by 1
    increQty = (event) => {
        //console.log(event.target.value)
        const indexOfArray = event.target.value;
        this.state.products[indexOfArray].qty = parseInt(this.state.products[indexOfArray].qty) + 1   ;
        this.setState({
            products: this.state.products
        });
    }
    // decrement qty value by 1
    decreQty = (event) => {
        const indexOfArray = event.target.value;
        this.state.products[indexOfArray].qty = parseInt(this.state.products[indexOfArray].qty) - 1;
        this.setState({
            products: this.state.products
        });
    }

    render() {
        return (
            <div>
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
                <Link to={"/pdf"} className="btn btn-success">
                    Descargar pdf
                </Link>
            <li className="nav-item">
            </li>
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
                <Table >
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name:</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.qty}</td>
                                        <td>
                                            <button className='btn btn-success' onClick={event => this.increQty(event)} value={index}>+</button>
                                            
                                            <button className='btn btn-danger' onClick={event => this.decreQty(event)} value={index}>-</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                
            </div>            
        )
    }

}