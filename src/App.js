
import dotenv from 'dotenv'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login';
import LoginA from './components/logina'
import LoginAdmin from './admin/login_admin.js'
import SignUp from './components/signup'
import SignUpAdmin from './components/signupAdmin'
import Cookie from 'js-cookie'

import {
  BrowserRouter as Router,
  Switch,
  withRouter,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Main from './components/main'
import {createStore} from 'redux'
import{Provider} from 'react-redux'
import appCart from './reducers/index'
import AddProduct from './components/addProduct'
import {NotificationContainer, NotificationManager} from 'react-notifications';
 
import Main_admin from './admin/main_admin';
dotenv.config()
const store = createStore(
    appCart
)

function App() {
  if(Cookie.get('email')){
    return (
      <Provider store={store}>
          {/* <h1>sadasd</h1> */}
          <Router>
            <div className="App">

              {/* <LoginA /> */}
              {/* <div>ThanhPhuac</div> */}
              {/* <Redirect to='/main'></Redirect> */}
              {/* <Redirect to="/main"></Redirect> */}
              {/* <Link to="/login"> LoginA</Link> */}
              <Switch>
              <Route exact path="/">
                {/* <div>Home</div> */}
                </Route>
                <Route  path="/login" >
                  <LoginA />
                </Route>
                <Route exact path="/loginadmin" >
                  <LoginAdmin />
                </Route>
                <Route  path="/signup" >
                  <SignUp />
                </Route>
                <Route  path="/main">
                  <Main />
                </Route>
                <Route exact path="/addproduct" >
                  <AddProduct />
                </Route>
                <Route exact  path="/dkadmin" >
                  
                  <SignUpAdmin />
                </Route>
                <Route   path="/mainadmin" >
                  <Main_admin />
                </Route>
              </Switch>
            {/* <!--       _
                      
                      /\_/\ < (cặt cặt....)
                    ( o.o )
                     > ^ <  
                ~~~~~~~~~~~~~~~~~~--> */}
          </div>
      
      
          </Router>
      </Provider>
      
        /* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */
      
    );
  }else{
    return (
       <Provider store={store}>
          <Router>
            <div className="App">
            
              {/* <Redirect to="/main"></Redirect> */}
              {/* <Link to="/login"> LoginA</Link> */}
              <Switch>
              <Route exact path="/">
                <div>NOthing</div>
                </Route>
                <Route  path="/login" >
                  <LoginA />
                </Route>
                <Route exact path="/loginadmin" >
                  <LoginAdmin />
                </Route>
                <Route exact path="/addproduct" >
                  <AddProduct />
                </Route>
                <Route   path="/signup" >
                  <SignUp />
                </Route>
                <Route exact  path="/dkadmin" >
                  <h1>haha</h1>
                  <SignUpAdmin />
                </Route>
                <Route  path="/main">
                  <Main />
                </Route>
                <Route  path="/mainadmin" >
                  
                  <Main_admin />
                </Route>
              </Switch>
      
          </div>
      
      
          </Router>
        </Provider>
        /* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */
      
    );
  }
  
}

export default App;
