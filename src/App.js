import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login';
import LoginA from './components/logina'
import SignUp from './components/signup2'
import {
  BrowserRouter as Router,
  Switch,
  withRouter,
  Route,
  Link
} from "react-router-dom";
import Main from './components/main'

function App() {
  return (
    <Router>
      <div className="App">
      
        {/* <LoginA /> */}


        <Switch>
          <Route path="/login">
            <LoginA />
          </Route>
          <Router path='/signup'>
            <SignUp />
          </Router>
          <Route path="/main">
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

export default App;
