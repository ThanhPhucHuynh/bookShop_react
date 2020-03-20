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
  Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import PropTypes from "prop-types";
import "./product.css";
import axios from "axios";
// import { CartContext } from "../contexts/Cart";

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
  }
  componentDidMount() {
    let numberProduct;
    axios.get("http://localhost:1234/product").then(res => {
      this.setState({
        products: res.data.product
      },()=>{
          numberProduct= this.state.products.length;
        //   console.log(this.state.products);
        //   console.log("ss",res.data);
      });
    });

    let numberPage = window.location.search;
    if(numberPage=='?0' || !numberPage){
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
  render() {
    const { products, girl } = this.state;
   
    let {pagination_first,pagination_second,pagination_third} = this.state;
    let productNagivication = products.slice(pagination_second*6,pagination_second*6+6);
    console.log(this.props,window.location.search)
    return (
        <div>

        
        <Container>
        <h1>Product</h1>
        <Row>
          {productNagivication.map((product, index) => (
            <Col sm="4" key={index}>
              <div>
                <Card>
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
                  </CardBody>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
            <Pagination size="sm" aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
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
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
            </Pagination>
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

export default Product;
