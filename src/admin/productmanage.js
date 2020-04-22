import React, {Component} from 'react';

import TableProduct from './tableproduct'
import TableUser from './tableuser'

class ProductManage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="div_product">
            <h1>ProductManage</h1>
            <div className="div_table">
                <TableProduct />
            </div>
                {/* <TableUser /> */}
            </div>
        )
    }

}
export default ProductManage;