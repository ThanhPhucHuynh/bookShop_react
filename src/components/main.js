import React, { Component } from 'react';
import { withRouter} from 'react-router-dom'
import { BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect } from 'react-router-dom'

import Cookie from 'js-cookie';
import axois from 'axios'
import Product from '../page/product'
import Cart from '../page/cart'
import { Button } from 'reactstrap';

class main extends Component {
    constructor(props){
        super(props);
        this.state={
            name:[]
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
            axois.get('http://localhost:1234/user/'+valueCookie)
                .then(res=>{
                    // this.setState({
                    
                    //     imgAvatar: res.data
                    // })
                    this.setState({
                        cookie:valueCookie,
                        name: res.data.user.name,
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
    render(){
        
        const {email,password}= this.props;
        const {name,isCookie} = this.state;
        console.log("is", isCookie)
        if(Cookie.get('email')){

        
            return(
                <Router>
                <div>
                    <h2>Haha {(this.props.location.state!=undefined) ? this.props.location.state.form.name:''} </h2>
                    <h1>{email}</h1>
                    <h2>{password}</h2>
                        <p>{name}</p>
                    <Link to="/main/product"> Product</Link>
                    <Link to="/main/cart"> Cart</Link>
                    <Link to="/main/pets">   Pest</Link>
                    <Button className='logout' onClick={this.onClickLogout}>Logn out</Button>
                    <Switch>
                        
                    
                        <Route exact path="/main/product" >
                            <Product />
                        </Route>
                        <Router exact  path="/main/cart" >
                            <Cart />
                        </Router>
                        {/* <Route  path="/pet">
                            <Main />
                        </Route> */}
                    </Switch>
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
export default withRouter(main);