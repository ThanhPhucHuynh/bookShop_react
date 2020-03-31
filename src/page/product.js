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
  Pagination, PaginationItem, PaginationLink,
  FormGroup, Label,Input
} from "reactstrap";
import PropTypes from "prop-types";
import "./product.css";
import axios from "axios";
// import { CartContext } from "../contexts/Cart";
import { connect } from "react-redux";
import { dispatch } from "redux";
import { reloadToCart } from "../actions/index";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component'
const noty = () => {
  return (
    <div className="app-container">
      <ReactNotification />
      
    </div>
  )
};

class Product extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products: [],
      pagination_first: 1,
      pagination_second:  2,
      pagination_third:3,
      number_pagination: 0
    };
    let productsOriginal;
    this.addToCart = this.addToCart.bind(this)
    this.searchProduct = this.searchProduct.bind(this)
    // this.createNotification=this.createNotification.bind(this)
  }
  componentDidMount() {
    let numberProduct;
    axios.get("http://localhost:1234/product").then(res => {
    // axios.get("http://192.168.3.104:1234/product").then(res => {
    
      this.setState({
        products: res.data.product
      },()=>{
          numberProduct= this.state.products.length;
           console.log(this.state.products);
          // console.log("ss",res.data.product);
      });
      this.productsOriginal =[...this.state.products]
      console.log("ori", this.productsOriginal)
    });

    let numberPage = window.location.search;
    if(numberPage==='?0' || !numberPage){
        numberPage=1;
    }else{
        numberPage = Number( numberPage.slice(1,numberPage.length))
    console.log(numberPage);
    let soLuongPage = numberProduct/6;
    }
    this.setState({
        pagination_first: numberPage-1,
        pagination_second: numberPage,
        pagination_third:numberPage +1
    })
    
  }
  addToCart(product){
    // NotificationManager.success('Success message', 'Title here');
    store.addNotification({
      title: "Wonderful!",
      message: "success.....",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000
        // , onScreen: true
      }
    });
    // var map = mapAddCart;
    // map.actaddToCart(product)  
    try {
        
      let data = JSON.parse(localStorage.getItem("cartProduct"));
      let cartProduct = data ? data : [];
      console.log(product.id)
      // console.log(cartProduct[0].id)
      var flag;
      for(var an in cartProduct){
          if(product.id === cartProduct[an].id){
            flag=an;
            continue;
          }
      }
      console.log(flag)
      if(flag){
        console.log(cartProduct[flag].number);
        
        if(cartProduct[flag].number==undefined){
          cartProduct[flag].number=1;
          console.log(cartProduct[flag].number);

        }else{
         
          cartProduct[flag].number++;
          // cartProduct = [...cartProduct].concat(product)
         console.log("haah")
        }
      }else{
        product.number=1;
        cartProduct = [...cartProduct].concat(product)
        // console.log(this.props)
      }
      
    
      localStorage.setItem("cartProduct",JSON.stringify(cartProduct));
      this.props.getData();
      console.log("dasdasd");
      //NotificationManager.success('Success message', 'Title here');
      //NotificationManager.info('Info message');
      
     // this.createNotification('success',"thanh cong","3000")
    } catch (error) {
      this.createNotification('error')
    }
  }
  searchProduct(event){
    event.preventDefault();
    const textSearch=event.target.value;
    console.log(event.target.value)
    // this.setState({
    //   products: [...this.productsOriginal]
    // })
    let searchProduct = this.productsOriginal.filter((product)=>{
      console.log(textSearch,product.name,product.name.search(textSearch));
      
      return (product.name.search(textSearch)!==-1)
    })
    this.setState({
      products: [...searchProduct]
    })
    
  }
  // createNotification = (type) => {
  //   return () => {

  //     switch (type) {
  //       case 'info':
  //         NotificationManager.info('Info message');
  //         break;
  //       case 'success':
  //         NotificationManager.success('Success message', 'Title here');
  //         break;
  //       case 'warning':
  //         NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
  //         break;
  //       case 'error':
  //         NotificationManager.error('Error message', 'Click me!', 5000, () => {
  //           alert('callback');
  //         });
  //         break;
  //     }
  //   };
  // };
  render() {
    const { products, girl } = this.state;
    console.log(products)
    let {pagination_first,pagination_second,pagination_third} = this.state;
    let productNagivication = products.slice((pagination_second-1)*6,pagination_second*6);
    console.log(pagination_first,pagination_second,pagination_third);
    
    if(products.length<=6 ){
      productNagivication = [...products]
    }
    console.log(productNagivication)
    console.log(this.props,window.location.search)
    return (
      
        <div className="productDiv">
           <ReactNotification />
        <Container>
       
        <h1>Product</h1>
        <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input type="text" name="nameSearch" id="exampleSearch" placeholder="Searching....."
                  onChange={this.searchProduct} />
        </FormGroup>
        <Row>
          {productNagivication.map((product, index) => (
            <Col sm="4" key={index}>
              <div>
                <Card body >
                  <CardImg
                    top
                    width="100%"
                    src={product.img}
                    alt={product.name}
                  />
                  <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                    <CardText>{product.description}</CardText>
                    {/* <CartContext.Consumer>
                      {({ addToCart }) => (
                        <Button onClick={() => addToCart(product)}>ADD</Button>
                      )}
                    </CartContext.Consumer> */}
                    <div>
                      <Button className="buttomAddCArt"
                        onClick={()=>{
                          this.addToCart(product)

                        }}
                      >Add to cart</Button>
                      <p className="price">$ {product.price}</p>
                    </div>
                    
                  </CardBody>
                </Card>
              </div>
            </Col>
          ))}
          
          <Pagination size="sm" aria-label="Page navigation example" className="panigation_lable">
            {/* <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem> */}
            <PaginationItem>
                <PaginationLink previous href={"product?"+pagination_first} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href={"product?"+pagination_first}>
                {pagination_first}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href= {"product?"+pagination_second}>
                {pagination_second}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href={"product?"+pagination_third}>
                {pagination_third}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next href={"product?"+pagination_third} />
            </PaginationItem>
            {/* <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem> */}
            </Pagination>
        </Row>
      
      </Container>
     
      {/* <NotificationContainer />   */}
      </div>
    );
  }
}
Card.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  inverse: PropTypes.bool,
  color: PropTypes.string,
  body: PropTypes.bool,
  className: PropTypes.string
};

CardBody.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string
};

CardImg.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  // Use top or bottom to position image via "card-img-top" or "card-img-bottom"
  top: PropTypes.bool,
  bottom: PropTypes.bool
};

CardSubtitle.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string
};

CardText.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string
};

CardTitle.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string
};


export default (Product);
