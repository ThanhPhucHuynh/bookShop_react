import React, { Component ,useState} from 'react';
import { withRouter} from 'react-router-dom'
import { BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie';
import axois from 'axios'
import './main.css'
// import './css/font-awesome-4.7.0/css/font-awesome.min.css'
import './css/fontawesome.min.css'
import './css/fontawesome.css'
import './mainJs'
import Product from '../page/product'
import Cart from '../page/cart'
import Pet from "../page/pet";
import Home from "../page/home"
import imgHome from './images/siberian-husky.svg'
import imgCart from './images/supermarket.svg'
import imgProduct from './images/bowl.svg'
import imgFunImg from './images/cat.svg'
import imgDOG from './images/dog.png'
import { Button,UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    NavbarToggler,
    Nav, } from 'reactstrap';
import { connect } from "react-redux";
import { reloadToCart } from "../actions/index";
class main extends Component {
    constructor(props){
        super(props);
        this.state={
            name:[],
            navNumber:0,
            navHide: false
        }
        // if(this.props.location.state){
         console.log('00',this.props.location.state);
        //this.getCookie();
        // }
        this.onClickLogout = this.onClickLogout.bind(this)
    }
    componentWillMount(){
        const valueCookie = Cookie.get('email');
        console.log(valueCookie);
        console.log(this.state.cookie)
        
        if(valueCookie){
            // axois.get('http://localhost:1234/user/'+valueCookie)
            axois.get('http://192.168.3.104:1234/user/'+valueCookie)

                .then(res=>{
                    // this.setState({
                    
                    //     imgAvatar: res.data
                    // })
                    this.setState({
                        cookie:valueCookie,
                        name: res.data.user.name,
                        imgAvata:res.data.user.userImg,
                        isCookie:true
                    },()=>{
                        console.log(this.state.cookie)
                    })

                }).catch(err=>{
                    console.log(err)
                })
        }


    }
    onClickLogout(event){
        Cookie.remove('email');
        window.location.reload(false);
    }
    returnClassChoose(){
        return "choosed"
    }
    
    render(){
        var {cartProducts} = this.props;
        console.log("cartproduct",cartProducts);
        // console.log(this.state.imgAvata);
        
        
        const {email,password}= this.props;
        const {name,isCookie,imgAvata} = this.state;
        console.log("is", isCookie)
        if(Cookie.get('email')){
        
        
            return(
                <Router>
                <div>
                {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> */}
                    {/* <link rel="stylesheet" href="css/owl.css" /> */}
                    <div className='navbar navbar-expand-lg '>
                    {/* <i className="fa fa-cat"></i> */}
                    {/* <img src={imgDOG}className="imgIconHome"></img> */}
                    <h2 className="HeaderName navbar-brand">Webpet</h2>
                        {/* {(this.props.location.state!=undefined) ? this.props.location.state.form.name:''} </h2> */}
                    <h1>{email}</h1>
                    <h2>{password}</h2>
                  
                    <div className="navbar-collapse collapse show navDropdown">
                    {/* <button className="navbar-toggler btn_dropdown"></button> */}
                        <ul className="navbar-nav ml-auto">

                             <li className="nav-item">
                               

                                 <Link className="nav-link" to="/main/home" onClick={()=>{
                                     this.setState({
                                         navNumber:0
                                     })
                                 }}><p className={"nameNav "+(this.state.navNumber===0? "choosed":"")}>  <img src={imgHome}className="imgIcon"></img> Main</p> </Link>
                            </li>
                            <li className="nav-item">
                                 <Link className="nav-link" to="/main/product" onClick={()=>{
                                     this.setState({
                                         navNumber:1
                                     })
                                 }}><p className={"nameNav "+(this.state.navNumber===1? "choosed":"")}>  <img src={imgProduct}className="imgIcon"></img> Product</p> </Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/main/cart"onClick={()=>{
                                     this.setState({
                                         navNumber:2
                                     })
                                 }}><p className={"nameNav "+(this.state.navNumber===2? "choosed":"")}> <img src={imgCart}className="imgIcon"></img> Cart ({cartProducts.length})</p></Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/main/pet"onClick={()=>{
                                     this.setState({
                                         navNumber:3
                                     })
                                 }}><p className={"nameNav "+(this.state.navNumber===3? "choosed":"")}> <img src={imgFunImg}className="imgIcon"></img>Fun Pic</p> </Link>
                            </li>
                            <li className="nav-item">
                                 
                            </li>
                        </ul>

                        <div className="wellcomImgUserPannal">
                        <UncontrolledDropdown  inNavbar>
                                <DropdownToggle  caret>
                                  <div className="wellcomImgUser">
                                        <img src={imgAvata}></img>
                                        <p className="wellcomUser">{name}</p>
                                    </div>
                                </DropdownToggle>
                                
                                <DropdownMenu right  >
                                    <DropdownItem  >
                                         <a className='logout btn' onClick={this.onClickLogout}>Logn out</a>
                                    </DropdownItem>
                                </DropdownMenu>
                        </UncontrolledDropdown>
                                 
                        <div className="DivTemp"></div>
                        </div>
                     </div>
                     
                    </div>

                    {/* <h1 className='tem'>asdasd</h1> */}
                    
                                
                    <Switch>
                        
                    
                        <Route exact path="/main/product" >
                            <Product getData={this.props.getData}/>
                        </Route>
                        <Router exact  path="/main/cart" >
                            <Cart getData={this.props.getData} />
                        </Router>
                        <Route  exact path="/main/pet">
                           
                            <Pet />
                        </Route>
                        <Route  exact path="/main/home">
                           
                           <Home />
                       </Route>
                    </Switch>
                </div>

                <div className="imgAbout">
                    
                </div>



                </Router>
            )
        }else{
            return(
                <Redirect to="/login"></Redirect>
            )
           
        }
    }
}

const mapCartProduct = state =>{
    return {
        cartProducts: state.cartproduct
    }
}
const mapDispatchToProps = (dispatch,props) => {
    return {
      getData: () => dispatch(reloadToCart())
    }
  }
export default connect(mapCartProduct,mapDispatchToProps)(withRouter(main));