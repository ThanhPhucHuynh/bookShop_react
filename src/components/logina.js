import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'

import { Redirect , withRouter} from 'react-router-dom'
import './logina.css'
import axois from 'axios';
import path from 'path'
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
            isPass: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this)
    }
    onChangeEmail(event){
        // event.preventDefault();
        // const data = new FormData(event.target);
        const email = event.target.value;
        console.log(email)
        
        if(email){
            console.log(__dirname)
            axois.get('http://localhost:1234/user/'+email)
                .then(res=>{
                    // this.setState({
                        console.log("sadad",res.data.user.userImg);
                    //     imgAvatar: res.data
                    // })
                    this.setState({
                        imgAvatar: res.data.user.userImg,
                        name: res.data.user.name,
                        pass: res.data.user.pass
                    })

                }).catch(err=>{
                    console.log(err)
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
        if(pass === this.state.pass){
            
        this.setState({
           
                
            user:{
               name: email,
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

           
            if (corrent===false) {
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
                <div className='Login_form' onSubmit={this.handleSubmit} onChange={this.onChangeEmail}>
                    <Form>
                    <h2 >Login</h2>

                        <div className='wellcome'>
                            {$wellcome}
                            <h1>Wellcome  {(this.state.name )}</h1>
                        </div>
                    

                        <Form.Group controlId="formBasicEmail">
                            {$checkNotification}
                            <Form.Label>Email address</Form.Label>


                            <Form.Control name='email' type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='pass' type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">

                            Submit
                        </Button>
                    </Form>
                </div>
              </Router>
             )
            }else{
                return(
                    
                    <Redirect
                    to={{
                        pathname: "/signup",
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