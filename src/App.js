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

function App() {
  if(Cookie.get('email')){
    return (
    
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
  
       </div>
  
  
      </Router>
      
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
