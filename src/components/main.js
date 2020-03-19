import React, { Component } from 'react';
import {BrowserRouter as Router, withRouter} from 'react-router-dom'
class main extends Component {
    constructor(props){
        super(props);
        // if(this.props.location.state){
         console.log('00',this.props.location.state);
        // }
    }
    render(){
        const {email,password}= this.props;
        return(
            <Router>
            <div>
                <h2>Haha {(this.props.location.state!=undefined) ? this.props.location.state.form.name:''} </h2>
                <h1>{email}</h1>
                  <h2>{password}</h2>
            </div>
            </Router>
        )
    }
}
export default withRouter(main);