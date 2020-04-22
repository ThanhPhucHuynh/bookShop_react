import React, { Component } from 'react'
import {} from 'dotenv'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'
import Cookie from 'js-cookie';
import { Redirect , withRouter} from 'react-router-dom'
import './logina.css'
import axois from 'axios';
import path from 'path'
import Singup from './signup'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Main from './main.js';
class LoginA extends Component {
    constructor(props){
        super(props);
        console.log("sdaksdh")
        this.state ={
            user: [],
            corrent: false,
            imgAvatar: '',
            pass:'',
            isPass: true,
            // API_HOST : 'localhost'
            API_HOST : process.env.REACT_APP_API_URL

        }
        // let API_HOST = 'localhost';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this)
    }
    onChangeEmail(event){
        // event.preventDefault();
        // const data = new FormData(event.target);
        const email = event.target.value;
        console.log(email)
        // console.log(process.env.URL_HOST)
        if(email){
            console.log(__dirname)
            axois.get('http://'+ this.state.API_HOST +':1234/user/'+email)
            // axois.get('http://192.168.3.104:1234/user/'+email)
             
            .then(res=>{
                    // this.setState({
                        console.log("sadad",res.data.user.userImg);
                    //     imgAvatar: res.data
                    // })
                    this.setState({
                        imgAvatar: res.data.user.userImg,
                        name: res.data.user.name,
                        pass: res.data.user.pass
                    },()=>{
                        // Cookie.set("email",email,{expires: 1})
                    })

                }).catch(err=>{
                    console.log(err)
                    this.setState({
                        imgAvatar: '',
                        name: '',
                        pass: ''
                    },()=>{
                        // Cookie.set("email",email,{expires: 1})
                    })

                })
                
        }
    }
    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(event)
        //  console.log(event.target.email.value)
        const email =event.target.email.value;
        const pass =event.target.pass.value;
         
        console.log(email,pass)
        console.log(this.props)

        //  history.push('/main',event.target.email.value,event.target.pass.value )
        if(pass === this.state.pass && pass !== ""){
            Cookie.set("email",email,{expires: 1})    
             this.setState({
           
                        
                    user:{
                            name: email
                         },
                     corrent: true
        
                
            },()=>{
                console.log(this.state.user)
            })
        }else(
            this.setState({
                isPass: false
            })
        )
        
    }
    render() {
        const {corrent,use,isPass} = this.state;

           
            if (corrent===false && !Cookie.get('email')) {
                let $checkNotification=(<div></div>);
                if(isPass===false){
                    $checkNotification=(<div>
                        <p className="notification">incorecct password</p>
                    </div>)
                }
                let $wellcome = (<img className="imgAvataNot"

                >
            </img>)
                if(this.state.imgAvatar){
                    $wellcome = (<img className="imgAvata"
                    src={this.state.imgAvatar}
                    

                    >
                </img>)
                }
            return (

                <Router>
                <div className="wrap-login">

                    
                    <div className='Login_form' onSubmit={this.handleSubmit} >
                        <Form>
                        <h2 className="title_login">Login to continue</h2>

                            <div className='wellcome'>
                                {$wellcome}
                                <h1>Welcome  {(this.state.name )}</h1>
                            </div>
                        

                            <Form.Group controlId="formBasicEmail">
                                {$checkNotification}
                                <Form.Label>Email address</Form.Label>


                                <Form.Control name='email' type="email" onChange={this.onChangeEmail} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                        </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='pass' type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember your password????" />
                            </Form.Group>
                            <Button className="btn_login" variant="primary" type="submit">

                                LOGIN
                            </Button>
                            <p className="signup-content">or sign up using</p>
                            <div className="signupfor login100-form-social flex-c-m">
                               
                                <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
                                    <i className="fa fa-facebook" aria-hidden="true" />
                                </a>
                                <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                                    <i className="fa fa-twitter" aria-hidden="true" />
                                </a>
                            </div>
                        </Form>
                    </div>
                    <div className="loginBackgound"></div>
                   
                </div>
                
              </Router>
             )
            }else{
                return(
                    <Redirect
                    to={{
                        pathname: "/main/home",
                        state: {
                            form: this.state.user
                        }
                    }}

        />
       
                )
            }
           

    }
}
export default withRouter(LoginA);