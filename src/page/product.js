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
import Modal from 'react-awesome-modal';
import ReactImageMagnify from 'react-image-magnify';
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
      visible : false,
      products: [],
       productDetail: [],
      pagination_first: 1,
      pagination_second: 2,
      pagination_third: 3,
      number_pagination: 0,
      API_HOST : 'localhost'
      // API_HOST : '192.168.3.121'

    };
    let productsOriginal = [];
    let productsAfterFillter = [];
    this.addToCart = this.addToCart.bind(this)
    this.searchProduct = this.searchProduct.bind(this)
    this.radioFillter = this.radioFillter.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }
  componentDidMount() {
    let numberProduct;
    let numberPage = window.location.search;
    // console.log(numberPage==='')
    // console.log(numberPage === '?0' || numberPage==='' )
    let type = sessionStorage.getItem("type");
    let API_URL = "http://"+this.state.API_HOST+":1234/product";
    let API_link = (!type) ? API_URL : API_URL+"/" + type
    if (type) {
      document.getElementById(type).checked = true
    } else { document.getElementById("all").checked = true }
    if (type === "all") API_link = API_URL;
    axios.get(API_link).then(res => {
      // axios.get("http://192.168.3.104:1234/product").then(res => {
      this.setState({
        products: this.shuffle(res.data.product),
        productDetail : res.data.product[0]
        // products: (res.data.product)

      }, () => {
        numberProduct = this.state.products.length;
        console.log(this.state.products);
        // console.log("ss",res.data.product);
      });
      this.productsOriginal = [...this.state.products]
      this.productsAfterFillter = [...this.state.products]
      console.log("ori", this.productsOriginal)
    });



    
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
    let rdomitem= event.target.value;
    console.log(event.target.value)
    let API_URL = "http://"+this.state.API_HOST+":1234/product";
    let API = API_URL;
    if (event.target.value === "all") {
      API = API_URL;

    } else {
      API = API_URL+"/" + event.target.value;
    }
    axios.get(API).then(res => {
      // axios.get("http://192.168.3.104:1234/product").then(res => {
      this.setState({
        products: (rdomitem === "all")? this.shuffle(res.data.product): res.data.product
        
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
    // window.location.href = 'product';
  }
  shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
  };
  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
      this.setState({
          visible : false
      });
    }
  


  
  render() {
    const { products, girl, valueRadio } = this.state;
    const productDetail = this.state.productDetail; 
    // if(!productDetail){
    //   productDetail = products[0];
    // }
    // const a = productDetail.img;
    console.log(productDetail)
    console.log((productDetail.name) ,products.length)
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

          <h1 className="contenProductMain">Product</h1>
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
                <div className="cardProduct">
                  <Card body >
                    <CardImg
                      top
                      width="100%"
                      src={product.img}
                      alt={product.name}
                      onClick={()=>{this.setState({productDetail:product,visible:true})}}
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
        <section>
          {/* <Button color="primary" className="btnPrice" onClick={this.openModal}> Buy </Button> */}
          <Modal visible={this.state.visible} width="70%" height="90%" effect="fadeInUp" onClickAway={this.closeModal}>
              <div className="detail_product">
                  <h1 className="detaiContent">Details</h1>
                  <div className="boderdetail"></div>
                  <div className="mainDetai">
                      <div className='DetailProduct' >
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                // src: "https://picsum.photos/200/300"
                                src: this.state.productDetail.img

                            },
                            largeImage: {
                                
                                // src: "https://picsum.photos/200/300",
                                src: this.state.productDetail.img,
                                width: 1000,
                                height: 900
                            }
                        }} />    
                      </div>  
                      <div className='contenProductDetail'>
                        <p className="detailName">{this.state.productDetail.name}</p>
                        <p className="detailType">Type: {this.state.productDetail.type}</p>

                        <p className="detaildecription">Description: {this.state.productDetail.description}</p>
                          <div className="detailPriceMain">
                            <p className="detailPriceGoc">original price: ${this.state.productDetail.price*130/100} </p>
                            
                            <p className="detailPriceSave">Save 30%</p>
                            <div className="detailPrice">Price: <p>${this.state.productDetail.price}</p></div>
                          </div> 
                        </div>         
                      </div> 
                      <Button color="info" className="btn_thanhtoan"  onClick={() => {
                            this.addToCart(this.state.productDetail)

                          }}>ADD TO CART</Button>
                  

                    {/* <a  onClick={this.closeModal}>Close</a> */}
              </div>
          </Modal>
          </section>
                                 
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
