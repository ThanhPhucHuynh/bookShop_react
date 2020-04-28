import React, {Component} from 'react'
import axios from "axios";
import Alert from './alertCovid'


class Covid extends Component  {
    constructor(props){
        super(props);
        this.state = {
            countryInfo: []
        }

    }
    componentDidMount(){
        axios.get('https://corona.lmao.ninja/v2/countries/vn')
            .then(res=>{
                console.log(res.data)
                this.setState({
                    countryInfo: res.data
                })
            })
    }

    render(){
        console.log(this.state.countryInfo)
        return(
            <div>
                <Alert 
                    cases= {this.state.countryInfo.cases}
                    today= {this.state.countryInfo.todayCases}
                    recovered={this.state.countryInfo.recovered}
                    ative = {this.state.countryInfo.active}
                />
            </div>


        )


    }


}

export default Covid;