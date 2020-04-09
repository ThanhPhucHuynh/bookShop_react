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
  CustomInput,
  Pagination, PaginationItem, PaginationLink,
  FormGroup, Label, Input, Form
} from "reactstrap";
import PropTypes from "prop-types";
import "./product.css";
import axios from "axios";
// import { CartContext } from "../contexts/Cart";
// import { connect } from "react-redux";
// import { dispatch } from "redux";
// import { reloadToCart } from "../actions/index";
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
      pagination_second: 2,
      pagination_third: 3,
      number_pagination: 0
    };
    let productsOriginal = [];
    let productsAfterFillter = [];
    this.addToCart = this.addToCart.bind(this)
    this.searchProduct = this.searchProduct.bind(this)
    this.radioFillter = this.radioFillter.bind(this)

  }
  componentDidMount() {
    let numberProduct;
    let type = sessionStorage.getItem("type");
    let API_link = (!type) ? "http://localhost:1234/product" : "http://localhost:1234/product/" + type
    if (type) {
      document.getElementById(type).checked = true
    } else { document.getElementById("all").checked = true }
    if (type === "all") API_link = "http://localhost:1234/product";
    axios.get(API_link).then(res => {
      // axios.get("http://192.168.3.104:1234/product").then(res => {
      this.setState({
        products: res.data.product
      }, () => {
        numberProduct = this.state.products.length;
        console.log(this.state.products);
        // console.log("ss",res.data.product);
      });
      this.productsOriginal = [...this.state.products]
      this.productsAfterFillter = [...this.state.products]
      console.log("ori", this.productsOriginal)
    });



    let numberPage = window.location.search;
    if (numberPage === '?0' || !numberPage) {
      numberPage = 1;
    } else {
      numberPage = Number(numberPage.slice(1, numberPage.length))
      console.log(numberPage);
      let soLuongPage = numberProduct / 6;
    }
    this.setState({
      pagination_first: numberPage - 1,
      pagination_second: numberPage,
      pagination_third: numberPage + 1
    })
  }
  addToCart(product) {
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
      let cartProduct = (data) ? data : [];
      console.log(product.id)
      // console.log(cartProduct[0].id)
      var flag;
      for (var an in cartProduct) {
        if (product.id === cartProduct[an].id) {
          flag = an;
          continue;
        }
      }
      console.log(flag)
      if (flag) {
        console.log(cartProduct[flag].number);

        if (cartProduct[flag].number == undefined) {
          cartProduct[flag].number = 1;
          console.log(cartProduct[flag].number);

        } else {

          cartProduct[flag].number++;
          console.log("haah")
        }
      } else {
        product.number = 1;
        cartProduct = [...cartProduct].concat(product)

      }

      localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
      this.props.getData();
    } catch (error) {
      // this.createNotification('error')
    }
  }
  searchProduct(event) {
    event.preventDefault();
    const textSearch = event.target.value;
    let searchProduct = this.productsAfterFillter.filter((product) => {
      return (product.name.search(textSearch) !== -1)
    })
    this.setState({
      products: [...searchProduct]
    })
    localStorage.setItem("search", document.getElementById("exampleSearch").value)
  }
  radioFillter(event) {
    let numberProduct;
    console.log(event.target.value)
    let API = "http://localhost:1234/product"
    if (event.target.value === "all") {
      API = "http://localhost:1234/product"

    } else {
      API = "http://localhost:1234/product/" + event.target.value;
    }
    axios.get(API).then(res => {
      // axios.get("http://192.168.3.104:1234/product").then(res => {
      this.setState({
        products: res.data.product
      }, () => {
        numberProduct = this.state.products.length;
        console.log(this.state.products);
        // console.log("ss",res.data.product);
      });
      this.productsOriginal = [...this.state.products]
      this.productsAfterFillter = [...this.state.products]
      console.log("ori", this.productsOriginal)
    });
    sessionStorage.setItem("type", event.target.value)

  }
  render() {
    const { products, girl, valueRadio } = this.state;
    console.log(products)
    let numberPage = Math.ceil(products.length / 6)
    let { pagination_first, pagination_second, pagination_third } = this.state;
    let productNagivication = products.slice((pagination_second - 1) * 6, pagination_second * 6);
    console.log(pagination_first, pagination_second, pagination_third);

    if (products.length <= 6) {
      productNagivication = [...products]
    }
    console.log(productNagivication)
    console.log(this.props, window.location.search)
    return (
      <div className="productDiv">
        <div>
          <ReactNotification />
        </div>
        <Container>

          <h1>Product</h1>
          <div className="formProduct">
            <Form >
              <FormGroup className="radioFillter" onChange={this.radioFillter} >
                <Label for="exampleCheckbox" >Fillter</Label>
                <div>
                  {/* <CustomInput type="radio" name="fillter" value="all" id="exampleCustomCheckbox" label="All" defaultChecked checked={((valueRadio&&valueRadio==="all")?true:false)} />
              <CustomInput type="radio" name="fillter" value="food" id="exampleCustomCheckbox2" label="Food" checked={((valueRadio&&valueRadio==="food")?true:false)}/>
              <CustomInput type="radio" name="fillter" value="care" id="exampleCustomCheckbox3" label="Health care" checked={((valueRadio&&valueRadio==="care")?true:false)}/>
              <CustomInput type="radio" name="fillter" value="other" id="exampleCustomCheckbox4" label="other" checked={((valueRadio&&valueRadio==="other")?true:false)}/> */}
                  <CustomInput type="radio" name="fillter" id="all" value="all" label="All" />
                  <CustomInput type="radio" name="fillter" id="food" value="food" label="Food" />
                  <CustomInput type="radio" name="fillter" id="care" value="care" label="Health care" />
                  <CustomInput type="radio" name="fillter" id="other" value="other" label="other" />
                </div>
              </FormGroup>
              <FormGroup className="search">

                <Label for="exampleEmail">Name</Label>
                <Input type="text" name="nameSearch" id="exampleSearch" placeholder="Searching....."
                  onChange={this.searchProduct} />
              </FormGroup>
            </Form>
          </div>
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
                      <CardText>{product.type}</CardText>
                      {/* <CartContext.Consumer>
                      {({ addToCart }) => (
                        <Button onClick={() => addToCart(product)}>ADD</Button>
                      )}
                    </CartContext.Consumer> */}
                      <p className="price">$ {product.price}</p>
                      <div>
                        <Button className="buttomAddCArt"
                          onClick={() => {
                            this.addToCart(product)

                          }}
                        >Add to cart</Button>

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
                <PaginationLink previous href={"product?" + pagination_first} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={"product?" + pagination_first} className={(pagination_first === 0 ? "navigationZero" : "")}>
                  {pagination_first}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={"product?" + pagination_second}>
                  {pagination_second}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={"product?" + pagination_third} className={(pagination_third > numberPage ? "navigationZero" : "")}>
                  {pagination_third}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href={"product?" + pagination_third} className={(pagination_third > numberPage ? "navigationZero" : "")} />
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
