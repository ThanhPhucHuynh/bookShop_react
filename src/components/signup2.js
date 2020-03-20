import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";

class signup2 extends Component {
    
    render(){
        return(
            <Link to="/login"> LoginA</Link>
            
        )
    }

}

export default  withRouter(signup2);