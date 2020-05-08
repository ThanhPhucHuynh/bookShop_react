import React, { Component } from 'react'
import Cookie from 'js-cookie';
import axois from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import Swal from 'sweetalert2'
import './userinfo.css'
class UserInfo extends Component {

    constructor() {
        super();
        
        this.state = {
            userInfo: [],
            API_HOST : process.env.REACT_APP_API_URL,
            changePass: false
        }
        this.changPassword = this.changPassword.bind(this)
        this.changPasswordAction = this.changPasswordAction.bind(this)
    }
    componentDidMount(props){
        const email = Cookie.get('email');
        console.log(email);
        axois.get('http://'+this.state.API_HOST+':1234/user/'+email)
            // axois.get('http://192.168.3.104:1234/user/'+valueCookie)
                .then(res=>{
                    this.setState({

                        userInfo: res.data.user
                    })

                }).catch(err=>{
                    console.log(err)
                })

       
    }
    changPasswordAction(event){
        event.preventDefault();
        const oldPass = event.target.oldPass.value;
        const newPass = event.target.newPass.value;
        const newPassAgain = event.target.newPassAgain.value;

        console.log(oldPass===this.state.userInfo.pass,newPass,newPassAgain)
        if(oldPass===this.state.userInfo.pass && newPass!=="" && newPass===newPassAgain){
            console.log("dung")
            var user = {
                id: this.state.userInfo.id,
                name: this.state.userInfo.name,
                email: this.state.userInfo.email,
                pass: newPass,
                userImg: this.state.userInfo.userImg
                // userImg: this.selectedFile
            }

            axios.post('http://'+this.state.API_HOST+':1234/user/update',user)

                .then(res=>{
                    console.log(res);
                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      }).then(()=>{
                        window.location.reload();
                      })
                })
                .catch(err=>{
                    console.log(err);
                })

           
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href>Why do I have this issue?</a>'
              })
            console.log("sai")
        }
    }
    changPassword(email){
        console.log(email);

        
        this.setState({
            changePass: !this.state.changePass
        })
    }
    render(){
        console.log(this.state.userInfo.pass)
        if(this.state.userInfo){
            const {id, name, email,userImg} = this.state.userInfo
            let inputPass;
      
            if(this.state.changePass){

                inputPass = <div className='inputChangePass'>
                          <Button color="secondary" 
                                onClick={()=>this.changPassword(email)}
                            >Change Password</Button>
                         <form className='formChangePass' noValidate autoComplete="off" onSubmit={this.changPasswordAction}>
                            {/* <TextField id="standard-basic" label="Standard" /> */}
                            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                            <div className="inputChangepass">
                                 <TextField className="inputChangepassInput" name="oldPass" type='password' id="outlined-basic" label="Old password" variant="outlined" />
                            </div>
                            <div className="inputChangepass">
                                 <TextField className="inputChangepassInput"  name="newPass"  type='password' id="outlined-basic" label="New password" variant="outlined" />
                            </div>
                            <div className="inputChangepass">
                                 <TextField className="inputChangepassInput"  name="newPassAgain"  type='password' id="outlined-basic" label="New password again" variant="outlined" />
                            </div>

                            <div className="inputChangepassButton">
                                <Button variant="contained" color="primary"
                                    type="submit"
                                >Change Password</Button>

                            </div>
                            
                        </form>
                </div>
            }else{
                inputPass=<div>
                    <Button color="secondary"
                                onClick={()=>this.changPassword(email)}
                            >Change Password</Button>
                    </div>
            }

            if(this.state.userInfo.pass=== 'loginfb'){
                inputPass=<div>
                
               </div>
            }
            return(
                <div className='info_center'>
                    <h1 className="contenInfoMain">Infomation</h1>
                     <div className="cartInfo">

                        <div className="content_info">

                            <div className="Info_img">
                                <img
                                    src={userImg}
                                >
                                </img>
                            </div>
                            <div className="Info_content">
                                <h1 className="nameInfo">{name}</h1>
                               <p className="infoorther">{email}</p>
                            
                                {inputPass}
                            </div>
                        </div>

                     </div>
                </div>
            )
        }
        
    }

}

export default UserInfo;
