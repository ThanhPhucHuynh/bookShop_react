import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import axois from 'axios'; 
import Cookie from 'js-cookie';
import Swal from 'sweetalert2'


const  API_HOST = process.env.REACT_APP_API_URL;

const responseFacebook = (response) => {
    
    var user = {
        id: response.userID,
        name: response.name,
        email: response.email,
        pass: "loginfb",
        userImg: response.picture.data.url
        // userImg: this.selectedFile
    }

    console.log(user);
    console.log(response);
    // axois.get('http://'+ API_HOST +':1234/user/'+user.email)
    axois.get('http://'+ API_HOST +':1234/user/'+user.email)

        .then(res=>{
            console.log(res.data)
            if(res.data.user===null){

                // axois.post('http://'+API_HOST+':1234/user',user)
                axois.post('http://'+API_HOST+':1234/user',user)

                .then(res=>{
                    console.log(res);
                  Cookie.set("email",user.email,{expires: 1}) 
                  Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Login Complete',
                    showConfirmButton: false,
                    timer: 2000
                  })   
                  window.location.reload();

                })
                .catch(err=>{
                    console.log(err);
                })


            }else{
                Cookie.set("email",user.email,{expires: 1}) 
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Login Complete',
                    showConfirmButton: false,
                    timer: 2000
                  })   
                window.location.reload();
            }
        })


}
const componentClicked = ()=> console.log("clicked");
 
export default function() {
    

        return(
            <FacebookLogin
              appId="2512134162374802"
              autoLoad={!true}
              textButton=""
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook} 
              cssClass="my-facebook-button-class"
                icon="fa-facebook "
              />
          );
    
    
}

