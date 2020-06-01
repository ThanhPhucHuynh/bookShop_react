import React, {useEffect, useState} from 'react';
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
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Item(props) {
  const classes = useStyles();
    // console.log(props.data);
    const [productOrder, setproductOrder] = useState([]);
    const [isTrue, setIsTrue] = useState(true);
    const id = props.data.id;
    const total = props.data.total
    useEffect(() => {
        let API = "http://"+API_HOST+"/product/id/"+id;
        // console.log(API)
        axios.get(API).then(res => {
            // console.log(res.data.product[0])
          setproductOrder(res.data.product[0])
            
        }).then(resp => { setIsTrue(false)})
   
    },[id])

    if(productOrder){    
        return (
            <Card className={classes.root}>
            <CardActionArea>
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
                    {productOrder.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    price: {productOrder.price}
                </Button>
                <Button size="small" color="primary">
                    Total: {total}
                </Button>
            <Button color='secondary'>Price Total: {Number(productOrder.price)*Number(total)}  </Button>
            </CardActions>
            </Card>
        );
    }else{
        return(

            
            <div>
                {/* <h1>Chua chon</h1> */}

            </div>
        )
    }
}