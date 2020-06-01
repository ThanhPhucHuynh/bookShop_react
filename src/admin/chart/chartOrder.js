import React, {useEffect, useState
        ,PureComponent
} from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Item from './Item'

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


export default function ChartOrder(props){

    const [listProduct,setListProduct] = useState(props.dataProduct)
    const [itemID,setItemID] = useState({});
    // console.log(props);
    
    const handClickID = (e) =>{
    // console.log(e);
        var id = e.payload.id;
        var total = e.payload.total;
        // console.log(id,total);
        setItemID({id: id,total: total})
    }
    useEffect(()=>{
        // console.log(listProduct);
        
    })

    return (
        <div>

            
            <div className="main_chart">

            <LineChart
                width={500}
                height={300}
                data={props.dataProduct}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >   
                
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" 
                
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
             
                type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} 
                    activeDot={{onClick: handClickID}}
                
                />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
                <div>
                    <p
                      className="contentpricechart"
                    >PriceTotal: {props.priceTotal}</p>
                </div>

            </div>
            <div className="item" >
                <Item data={itemID} />
                   <div>
                      <p
                        className="hidecontentpricechart"
                      >PriceTotal</p>
                  </div>

            </div>
        </div>

    )
}


