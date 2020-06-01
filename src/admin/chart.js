import React, {Component} from 'react';

import TableProduct from './tableproduct'
import TableUser from './tableuser'
import TableOder from './tableorder'
import ChartOrder from './chart/chartOrder';
import './chart/chart.css'
import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_URL
class ChartManage extends Component {
    constructor(props) {
        super(props);
        this.state={
            listProductSales: [],
            
            listProductSalesMonth:[],

        }
    }
    componentDidMount(){
        let API_URL = "http://"+API_HOST+"/orderallday";
        axios.get(API_URL)
            .then(res => {
                // console.log(res.data.listProductSales)
                this.setState({
                    listProductSales: [...res.data.listProductSales],
                    priceTotal: res.data.gia
                })
                // setProduct(res.data.listProductSales);
               let API_URL1 = "http://"+API_HOST+"/ordermouth";
         axios.get(API_URL1)
            .then(res => {
                // console.log(res.data.listProductSales)
                this.setState({
                    listProductSalesMonth: res.data.listProductSales
                    ,priceTotalMonth: res.data.gia
                })
                // setProduct(res.data.listProductSales);
               
            }) 
            })
        
    }
    
    render() {
        // console.log(this.state.listProductSales)
        return(
            <div className="div_product" >
            <h1 >ChartManage</h1>
            <div className="div_table">
                <div>
                    <h2 className='Header_chart'>Total: </h2>
                </div>
                <ChartOrder key='1' dataProduct={this.state.listProductSales} priceTotal={this.state.priceTotal}/>
            </div> 
            <div className="div_table">
                <div>
                    <h2 className='Header_chart'>Total in Month:</h2>
                </div>
                <ChartOrder key='2' dataProduct={this.state.listProductSalesMonth} priceTotal={this.state.priceTotalMonth}/>
            </div>

                
            </div>
        )
    }

}
export default ChartManage;