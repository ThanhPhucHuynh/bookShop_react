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
            cartProduct: [],
            price:[]
        }
        this.delItem = this.delItem.bind(this)
    }
    componentWillMount(){
        if(localStorage.getItem('cartProduct')!=null){
        let item = JSON.parse(localStorage.getItem('cartProduct'));
        var Gia=0;  
        for(var i of item){
          console.log(i)
            Gia = Gia+ Number(i.price)*i.number
          }
          
         console.log('kkkkb',item,Gia);
          this.setState({
            cartProduct: [...item],
            price : Gia
          })
         
        }
       
      }
    
    delItem(product){
      let cartProduct = [...this.state.cartProduct];
      var flag;
      for(var an in cartProduct){
        if(product.id === cartProduct[an].id){
          flag=an;
          continue;
        }
     }
     if(flag){
       cartProduct.splice(flag,1);
     }
     var Gia =0;
     for(var i of this.state.cartProduct){
      Gia = Gia+ Number(i.price)*i.number
    }
     this.setState({
       cartProduct: [...cartProduct],
       price: Gia
     })
     localStorage.setItem("cartProduct",JSON.stringify(cartProduct))
     this.props.getData();
    }

    render(){
        const {cartProduct,price} = this.state
        console.log(price);
        
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
                <div className="cartMain">
                    <h1>Cart</h1>
                    <Row>
                    <div className="cart">
                      
                    
                      { cartProduct.map((product,index)=>(
                        
                            <Media className="mediaCart" key={index}>
                            <Media left href="#">
                              <Media object src={product.img} alt="product image" />
                            </Media>
                            <Media body>
                              <Media heading>
                                {product.name}
                              </Media>
                              {/* Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus. */}
                              SL: {product.number}
                              <p> $ {product.price}</p>
                              <Button onClick={()=>{
                                this.delItem(product)
                              }}>remove</Button>
                            </Media>
                          </Media> 
                          
                      ))}
                    </div>
                    </Row>
                    <Button color="primary" className="btnPrice"> Buy ${ price } </Button>
                    
                </div>
            )
        }
    }
}
  export default Cart;