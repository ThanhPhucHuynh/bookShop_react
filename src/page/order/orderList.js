import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import axios from 'axios';
import './orderlist.css'
const API_HOST = process.env.REACT_APP_API_URL

export default function FolderList(props) {
  const [productOrder, setproductOrder] = useState([]);
  const [isTrue, setIsTrue] = useState(true);
  useEffect(() => {
    let API = "http://"+API_HOST+":1234/product/id/"+props.data;
    axios.get(API).then(res => {
      setproductOrder(res.data.product[0])
      
    }).then(resp => { setIsTrue(false)})
    
  },[isTrue])
  
  // useEffect(() => {
  //   // console.log(props.data)
  //   const interval = setInterval(() => {
  //     let API = "http://"+API_HOST+":1234/product/id/"+props.data;
  //   axios.get(API).then(res => {
  //     //  console.log(res.data)
  //     setproductOrder(res.data.product[0])
      
  //   }).then(resp => { setIsTrue(false)})
  //   }, 5000);
  //   return () => clearInterval(interval);
  // },[isTrue])
  return (
    <ListItem >
        <ListItemAvatar >
        <Avatar>
            <img 
             style={{height:40,width:40}}
            src={productOrder.img}></img>
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary={productOrder.name} secondary={productOrder.description} />
    </ListItem>
  );
}