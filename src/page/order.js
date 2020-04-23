import React, { Component,useState } from 'react';


import OrderPanel from './order/orderPanel'

class Order extends Component {
    constructor(props) {
        super(props);



    }

    render() {
        return (
            <div className="mainOrder">
                <h1 className="contenProductMain">Order</h1>
                <OrderPanel />
            </div>
        )
    }



}
export default Order;


