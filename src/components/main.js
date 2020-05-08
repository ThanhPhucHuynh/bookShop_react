import React, { Component } from 'react';
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
import PetCare from "../page/petcare"
import Order from "../page/order"
import Logo from './logo/logo'
import imgHome from './images/pet-home.svg'
import imgHomeColor from './images/pet-care-color.svg'
import imgCart from './images/shopping-cart.svg'
import imgCartColor from './images/shopping-cart-color.svg'
import imgProduct from './images/petBolw.svg'
import imgProductColor from './images/bowl.svg'
import imgFunImg from './images/pet-care.svg'
import imgFunImgColor from './images/pet-care-color-dung.svg'
import { UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { connect } from "react-redux";
import { reloadToCart } from "../actions/index";
import ChatBot from './Chat'
import InfoUser from '../page/userinfo'


class main extends Component {
    constructor(props){
        super(props);
        this.state={
            name:[],
            navNumber:10,
            navHide: false,
            // API_HOST : 'localhost'
            API_HOST : process.env.REACT_APP_API_URL

        }
        // if(this.props.location.state){
        //  console.log('00',this.props.location.state);
        //this.getCookie();
        // }
        this.onClickLogout = this.onClickLogout.bind(this)
    }
    componentDidMount(){
        const valueCookie = Cookie.get('email');
        // console.log(valueCookie);
        // console.log(this.state.cookie)
        
        if(valueCookie){
            axois.get('http://'+this.state.API_HOST+':1234/user/'+valueCookie)
            // axois.get('http://192.168.3.104:1234/user/'+valueCookie)

                .then(res=>{
                    // this.setState({
                    
                    //     imgAvatar: res.data
                    // })
                    this.setState({
                        cookie:valueCookie,
                        name: res.data.user.name,
                        imgAvata:res.data.user.userImg,
                        user: res.data.user,
                        email: res.data.user.email,
                        isCookie:true
                    },()=>{
                        // console.log(this.state.cookie)
                    })

                }).catch(err=>{
                    console.log(err)
                })
        }

        const pathname = window.location.pathname;
        let indexNav = 10;
        if(pathname.indexOf("home")!=-1){
            indexNav = 0;
        }else if(pathname.indexOf("product")!=-1){
            indexNav = 1;
        }else if(pathname.indexOf("cart")!=-1){
            indexNav = 2;
        }else if(pathname.indexOf("petcare")!=-1){
            indexNav = 3;
        }
        this.setState({
            navNumber: indexNav
        })

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
        // console.log("cartproduct",cartProducts);
        // console.log(this.state.imgAvata);
        // console.log(this.state.imgAvata)

        
        const {email,password}= this.props;
        const {name,isCookie,imgAvata} = this.state;
        // console.log("is", window.location.pathname)
        if(Cookie.get('email')){
        
        
            return(
                <Router>
                    {/* <Redirect to="/main/home
                    "></Redirect> */}
               
                <div>
                <ChatBot imgBot={this.state.imgAvata} />
                {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> */}
                    {/* <link rel="stylesheet" href="css/owl.css" /> */}
                    <div className='navbar navbar-expand-lg '>
                    {/* <i className="fa fa-cat"></i> */}
                    {/* <img src={imgDOG}className="imgIconHome"></img> */}
                    <Logo />
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
                                 }}><p className={"nameNav "+(this.state.navNumber===0? "choosed":"")}>  <img src={(this.state.navNumber===0? imgHomeColor: imgHome)}className="imgIcon" alt="imgMain"></img><span className="Content_nav">Home</span> </p> </Link>
                            </li>
                            <li className="nav-item">
                                 <Link className="nav-link" to="/main/product" onClick={()=>{
                                     this.setState({
                                         navNumber:1
                                     })
                                 }}><p className={"nameNav "+(this.state.navNumber===1? "choosed":"")}>  <img src={(this.state.navNumber===1? imgProductColor:imgProduct)}className="imgIcon" alt="imgProduct"></img> <span className="Content_nav">Products</span></p> </Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/main/cart"onClick={()=>{
                                     this.setState({
                                         navNumber:2
                                     })
                                //  }}><p className={"nameNav "+(this.state.navNumber===2? "choosed":"")}> <img src={(this.state.navNumber===2? imgCartColor:imgCart)}className="imgIcon" alt="imgcart"></img> <span className="Content_nav">Cart <span className='cartNumber'>{cartProducts.length}</span></span></p></Link>
                                   }}><p className={"nameNav "+(this.state.navNumber===2? "choosed":"")}> <img src={(this.state.navNumber===2? imgCartColor:imgCart)}className="imgIcon" alt="imgcart"></img> <span className="Content_nav">Cart <span className='cartNumber flip4'>{cartProducts.reduce((count,a)=>{return count+=a.number},0)}</span></span></p></Link>
                                
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/main/petcare"onClick={()=>{
                                     this.setState({
                                         navNumber:3
                                     })
                                 }}><p className={"nameNav "+(this.state.navNumber===3? "choosed":"")}> <img src={(this.state.navNumber===3? imgFunImgColor:imgFunImg)}className="imgIcon" alt="imgFun"></img><span className="Content_nav">PetCare</span></p> </Link>
                            </li>
                            <li className="nav-item">
                                 
                            </li>
                        </ul>

                        <div className="wellcomImgUserPannal">
                        <UncontrolledDropdown  inNavbar>
                                <DropdownToggle  caret>
                                  <div className="wellcomImgUser">
                                        <img src={imgAvata} alt="imgAvater"></img>
                                        <p className="wellcomUser">{name}</p>
                                    </div>
                                </DropdownToggle>
                                
                                <DropdownMenu right  >
                                    <DropdownItem  >
                                          <a href="/main/pet" className='logout btn' >Pets Fun</a>
                                    </DropdownItem>
                                    <DropdownItem  >
                                          {/* <a href="/main/order" className='logout btn' >Oder</a> */}
                                          <Link to="/main/info" className='logout btn' >Info User</Link>

                                    </DropdownItem>
                                    <DropdownItem  >
                                          {/* <a href="/main/order" className='logout btn' >Oder</a> */}
                                          <Link to="/main/order" className='logout btn' >Oder</Link>

                                    </DropdownItem>
                                    <DropdownItem  >
                                         <a href="/main" className='logout btn' onClick={this.onClickLogout}>Log out</a>
                                    </DropdownItem>
                                    
                                </DropdownMenu>
                        </UncontrolledDropdown>
                                 
                       
                        </div>
                     </div>
                     
                    </div>
                    <div className="DivTemp"></div>
                    {/* <h1 className='tem'>asdasd</h1> */}
                    
                                
                    <Switch>
                        
                    
                        <Route exact path="/main/product" >
                            <Product getData={this.props.getData} nameUser={this.state.name}/>
                        </Route>
                        <Route exact path="/main/petcare" >
                            <PetCare getData={this.props.getData} nameUser={this.state.name}/>
                        </Route>
                        <Router exact  path="/main/cart" >
                            <Cart getData={this.props.getData} nameUser={this.state.name} />
                        </Router>
                        <Route  exact path="/main/pet">
                           
                            <Pet />
                        </Route>
                        <Route  exact path="/main/home">
                          
                           <Home />
                       </Route>
                       <Route  exact path="/main/order">
                           <Order />
                       </Route>
                       <Route  exact path="/main/info">
                           <InfoUser email={this.state.email}/>
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