import React, { Component } from 'react';
import { withRouter} from 'react-router-dom'
import { BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie';
import Navigation from './nav'
import axois from 'axios'
import Product from './productmanage'
import User from './usermanage'
import Order from './order'
// import './css/font-awesome-4.7.0/css/font-awesome.min.css'
import './cssjs/main.css'
class main extends Component {
    constructor(props){
        super(props);
        this.state={
            name:[],
            navNumber:0,
            navHide: false,
            // API_HOST : 'localhost'
            API_HOST : process.env.REACT_APP_API_URL,
            user:[]

        }
    }
   componentDidMount(){
    const valueCookie = Cookie.get('emailad');
    console.log(valueCookie);
    console.log(this.state.cookie)
    
    if(valueCookie){
          axois.get('http://'+this.state.API_HOST+':1234/admin/'+valueCookie)
        // axois.get('http://192.168.3.104:1234/user/'+valueCookie)

            .then(res=>{
                // this.setState({
                
                //     imgAvatar: res.data
                // })
                this.setState({
                    cookie:valueCookie,
                    name: res.data.admin.name,
                    imgAvata:res.data.admin.userImg,
                    isCookie:true,
                    user: res.data.admin
                },()=>{
                    console.log(res.data.admin)
                })

            }).catch(err=>{
                console.log(err)
            })
    }


   }
   
    render(){
        console.log(this.state.user)
        if(Cookie.get('emailad')){
        
        
            return(
                <Router>
                    {/* <Redirect to="/main/home
                    "></Redirect> */}
                <div>
                    <div className="Navigation">
                         <Navigation data={this.state.user} ></Navigation>

                    </div>


                    <Link to="/mainadmin/productmanager"> adsaAAAdasdasd</Link>
                </div>
                
                <Switch>
                        <Route exact path="/mainadmin/productmanager" >
                            <Product data={this.state.user}/>
                        </Route>
                        <Route exact path="/mainadmin/usermanager" >
                            <User data={this.state.user}/>
                        </Route>
                        <Route exact path="/mainadmin/order" >
                            <Order data={this.state.user}/>
                        </Route>
                    </Switch>

                </Router>
            )
        }else{
            return(
                <Redirect to="/loginadmin"></Redirect>
            )
           
        }
    }
}

export default (withRouter(main));