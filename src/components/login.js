import React, { Component } from 'react';
import '../test/Login_v18/images/icons/favicon.ico'
import '../test/Login_v18/vendor/bootstrap/css/bootstrap.min.css'
import '../test/Login_v18/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../test/Login_v18/fonts/Linearicons-Free-v1.0.0/icon-font.min.css'
import '../test/Login_v18/vendor/animate/animate.css'
import '../test/Login_v18/vendor/css-hamburgers/hamburgers.min.css'
import '../test/Login_v18/vendor/animsition/css/animsition.min.css'
import '../test/Login_v18/vendor/select2/select2.min.css'
import '../test/Login_v18/vendor/daterangepicker/daterangepicker.css'
import '../test/Login_v18/css/util.css'
import '../test/Login_v18/css/main.css'
class LoginForm extends Component {
    render(){
        return(
            <div className='formSignup'>
        <title>Login V18</title>
        <meta charSet="UTF-8" />
      
        {/*===============================================================================================*/}
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-43">
                  Login to continue
                </span>
                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                  <input className="input100" type="text" name="email" />
                  <span className="focus-input100" />
                  <span className="label-input100">Email</span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <input className="input100" type="password" name="pass" />
                  <span className="focus-input100" />
                  <span className="label-input100">Password</span>
                </div>
                <div className="flex-sb-m w-full p-t-3 p-b-32">
                  <div className="contact100-form-checkbox">
                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                    <label className="label-checkbox100" htmlFor="ckb1">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="#" className="txt1">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    Login
                  </button>
                </div>
                <div className="text-center p-t-46 p-b-20">
                  <span className="txt2">
                    or sign up using
                  </span>
                </div>
                <div className="login100-form-social flex-c-m">
                  <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
                    <i className="fa fa-facebook-f" aria-hidden="true" />
                  </a>
                  <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                </div>
              </form>
              <div className="login100-more" style={{
                    backgroundImage: 'url("https://images.wallpaperscraft.com/image/cat_peep_funny_148007_1920x1080.jpg")'
                // backgroundImage: 'url("https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/87654159_2670119386554564_1678043129841713152_n.jpg?_nc_cat=107&_nc_sid=110474&_nc_ohc=jGICZBBsnWQAX8PHRNk&_nc_ht=scontent.fvca1-2.fna&oh=a142c0aa11597f854d0534ebe3c8146e&oe=5E910305")'
            }}>
              </div>
            </div>
          </div>
        </div>
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
        {/*===============================================================================================*/}
      </div>
        )
    }
}

export default LoginForm;