import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login';
import LoginA from './components/logina'
import SignUp from './components/signup2'
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


const store = createStore(
    appCart
)

function App() {
  if(Cookie.get('email')){
    return (
      <Provider store={store}>

          <Router>
            <div className="App">
            
              {/* <LoginA /> */}
              <div>ThanhPhuc</div>
              {/* <Redirect to='/main'></Redirect> */}
              <Link to="/login"> LoginA</Link>
              <Switch>
              <Route exact path="/">
                <div>Home</div>
                </Route>
                <Route exact path="/login" >
                  <LoginA />
                </Route>
                <Router exact  path="/signup" >
                  <SignUp />
                </Router>
                <Route  path="/main">
                  <Main />
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
            
              <Redirect to="/login"></Redirect>
              <Link to="/login"> LoginA</Link>
              <Switch>
              <Route exact path="/">
                <div>Home</div>
                </Route>
                <Route exact path="/login" >
                  <LoginA />
                </Route>
                <Router exact  path="/signup" >
                  <SignUp />
                </Router>
                <Route  path="/main">
                  <Main />
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
