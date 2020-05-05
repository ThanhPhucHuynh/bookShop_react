import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Cookie from 'js-cookie';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderList from './orderList'
import './orderlist.css'
import './orderPanel.css'
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
const API_HOST = process.env.REACT_APP_API_URL

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const [order, setOrder] = useState([]);
  const [order1, setOrder1] = useState([]);
  const [productOrder, setproductOrder] = useState([]);
  useEffect(() => {
      
    let API_URL = "http://"+API_HOST+":1234/order/"+Cookie.get('email');
    axios.get(API_URL)
        .then(res => {
            // setOrder(res.data.order.reverse().slice(0,1));
            setOrder(res.data.order);

            console.log(res.data.order.reverse())


            setOrder1(res.data.order[0]);
            res.data.order.map((order)=>{
              JSON.parse(order.idproduct).map(  (productID,index)=>{
                 console.log(productID);

              })
            })
            // setLoad(true);
        })
        // .catch(err => {
        //     setError(err.message);
        //     setLoad(true)
        // })
    }, []);
  return (
    <div className="listorder">
        <div className={classes.root}>

            {
              
            order.map((order,index)=>{
              
                if(order.status!==4){
                  let content='';
                  if(order.status===0){
                    content="Chờ xác nhận";
                  }else
                  if(order.status===2){
                    content="Đang vận chuyển";
                  }else if(order.status===1){
                    content="Đã xác nhận";
                  }
                  let date = new Date()//.toLocaleString();
                  // let dateValue =date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
                  // let dateValue = date.setDate(date.getDate() +2);
                  var someDate = new Date();
                  var numberOfDaysToAdd = 2;
                  someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
                    return(
                      
                        <ExpansionPanel key={index}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                        <Typography className={classes.heading}>Order {order.id}
                        <span className={"trangthai trangthai"+order.status}>
                          {content}
                        
                        </span>       
                        <span className="giaohang">
                        {(order.status===2)?"Dự kiến giao hàng"+someDate: ""}
                        </span><br></br>
                        <span>
                          Price {order.price} VND
                        </span>
                        
                        </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{display: "block"}}>


                            { JSON.parse(order.idproduct).map(  (productID,index)=>{
                              // console.log("productID",productID)
                                productID = productID.split(" ");
                                return( <OrderList data={productID[0]} number={productID[1]} key={index} />)


                            })
                            }
                          
                          
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    )
                }else{
                    return(
                        <ExpansionPanel key={index} disabled>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3a-content"
                          id="panel3a-header"
                        >
                          <Typography className={classes.heading}>Order {order.id}  <span className="trangthai">Đã Giao</span></Typography>
                        </ExpansionPanelSummary>
                      </ExpansionPanel>
                    )
                }
            })}


      
        </div>
      </div>
  );
}