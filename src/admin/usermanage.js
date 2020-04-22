import React, {Component} from 'react';

import TableProduct from './tableproduct'
import TableUser from './tableuser'

class UserManage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="div_product">
            <h1>UserManage</h1>
            <div className="div_table">
                <TableUser />
            </div>
                
            </div>
        )
    }

}
export default UserManage;