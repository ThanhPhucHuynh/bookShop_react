import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_URL


const useStyles = makeStyles({
  root: {
    maxWidth: 150,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const [productOrder, setproductOrder] = useState([]);
  const [isTrue, setIsTrue] = useState(true);
  const classes = useStyles();
  console.log(props.data)
    let id = props.data;
    useEffect(() => {
        let API = "http://"+API_HOST+"/product/id/"+id;
        // console.log(API)
        axios.get(API).then(res => {
            // console.log(res.data.product[0])
          setproductOrder(res.data.product[0])
            
        }).then(resp => { setIsTrue(false)})
   
    },[id])

  return (
    <Card className={classes.root+' cardMost'}>
      <CardActionArea onClick={()=>props.addProduct(productOrder)}>
        <CardMedia 
          className={classes.media}
          image={productOrder.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {productOrder.name} 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This is {productOrder.type} with price about ${productOrder.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}