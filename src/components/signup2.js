import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import './signup.css';
import { Redirect , withRouter} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';
import sortID from 'short-id';
class signup2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTrue: false,
            imagePreviewUrl: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        const Dname =event.target.name.value;
        const Demail =event.target.email.value;
        const Dpass =event.target.pass.value;
        console.log(Dname , Demail,Dpass, this.state.imagePreviewUrl);
        if(Dname && Demail && Dpass && this.state.imagePreviewUrl){
            var user = {
                id: sortID.generate(),
                name: Dname,
                email: Demail,
                pass: Dpass,
                userImg: this.state.imagePreviewUrl
            }
            axios.post('http://localhost:1234/user',user)
                .then(res=>{
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                })
            this.setState({
                isTrue: true
            })
        }
        
    }
    fileChangedHandler = event => {
        this.setState({
          selectedFile: event.target.files[0]
        })
     
        let reader = new FileReader();
         
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          });
        }
     
        reader.readAsDataURL(event.target.files[0])
     
      }
    render() {
              const { isTrue } = this.state;
              if(isTrue===false){
                let $imagePreview = (<div className="previewText image-container">
                <div className='contentSignUpNOne'><h1>
                    REGISTER
                </h1>
                
                </div> Please select an Image for        
                </div>
                    
                );
                if (this.state.imagePreviewUrl) {
                $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" height="200" /><div className='contentSignUp'><h1>
                    REGISTER
                </h1>
                
                </div> </div>);
                 }
                return (
                    <Router>
                    <div className='DivformSignup'>  
                    <Form className='formSignup' onSubmit={this.handleSubmit}>
                    { $imagePreview }
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input type="text" name="name" id="exampleName" placeholder="Your Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="pass" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">File</Label>
                            {/* <Input type="file" name="avatar" id="exampleFile" /> */}
                            <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
                            </FormText>
                            <div className="App">
                            <Input type="file" name="avatar" onChange={this.fileChangedHandler} />
                            {/* <button type="button" onClick={this.submit} > Upload </button> */}
                           
              </div>
        
                        </FormGroup>
                        
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                  Check me out
                </Label>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                    <Link to='/login'>Login</Link>
                    </div>
                    </Router>
                )
              }else{
                
            return(
                <Redirect
                to={{
                    pathname: "/main",
                    state: {
                        form: this.state.user
                    }
                }}

    />
            )
        }
           

    }
}
export default withRouter(signup2);