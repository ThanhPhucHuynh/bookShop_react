import React, {Component} from 'react';

import TableProduct from './tableproduct'
import TableUser from './tableuser'
import TableOder from './tableorder'
class OrderManage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="div_product">
            <h1>OderManage</h1>
            <div className="div_table">
                <TableOder />
            </div>
                
            </div>
        )
    }

}
export default OrderManage;