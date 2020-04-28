import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import imgPug from './img/pug.jpg'
import imgCata from './img/catb.jpg'
// import imgCata from './img/catb.jpg'
import imgCatb from './img/cata.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  console.log(props)
  const pet = props.pet;
  let name = '';
  let details = '';
  let price = 0;
  let img = ''

  if(pet == 'pug'){
    name = "Pug Dog";
    details ="Pug, hay thường được gọi là chó mặt xệ, là giống chó thuộc nhóm chó cảnh có nguồn gốc từ Trung Quốc, chúng có một khuôn mặt nhăn, mõm ngắn, và đuôi xoăn."
    price = 500
    img = imgPug
  } else  if(pet == 'exotic'){
    name = "Exotic Shorthair";
    details ="Mèo lông ngắn Ba Tư hay còn gọi là mèo Exotic hay còn gọi là mèo Ba Tư mặt tịt là giống mèo có nguồn gốc tại Mỹ, được phát triển trên cơ sở phiên bản của giống mèo Ba Tư."
    price = 600
    img = imgCata
  }else if(pet == 'british'){
    name = "British Shorthair";
    details ="Mèo lông ngắn Anh là phiên bản nhân giống có chọn lọc của mèo nhà Anh truyền thống với những đặc điểm như thân hình mũm mĩm, lông ngắn và dày cùng với khuôn mặt to."
    price = 1500
    img = imgCatb

  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100"
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {details}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          $ {price}
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}