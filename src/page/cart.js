import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Media,
    Pagination, PaginationItem, PaginationLink
  } from "reactstrap";
  import PropTypes from "prop-types";
  import "./product.css";
  import axios from "axios";
  import  "./card.css";

class Cart extends Component{
    constructor(props){
        super(props);
        this.state={
            cartProduct: []
        }
    }
    componentWillMount(){
        if(localStorage.getItem('cartProduct')!=null){
        let item = JSON.parse(localStorage.getItem('cartProduct'));
        
         console.log('b',item);
          this.setState({
            cartProduct: [...item]
          })
         
        }
       
      }

    render(){
        const {cartProduct} = this.state
        
        if(cartProduct.length===0){
            return(
            <div>
                <h1>Cart</h1>
                <p>Nothing item.....</p>
            </div>
            )
        }else{
            let number = cartProduct.number;
            if(!number){
                number = 0;
            }
            return(
                <div>
                    <h1>Cart</h1>
                    { cartProduct.map((product,index)=>(
                           <Media key={index}>
                           <Media left href="#">
                             <Media object src={product.img} alt="product image" />
                           </Media>
                           <Media body>
                             <Media heading>
                               {product.name}
                             </Media>
                             {/* Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus. */}
                             SL: {product.number}
                             <p> $500</p>
                            <Button>Del</Button>
                           </Media>
                         </Media> 
                    ))}
                </div>
            )
        }
    }
}
  export default Cart;