import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import axios from 'axios';
import MediaCard from './card'
const API_HOST = process.env.REACT_APP_API_URL

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex"
  },
  paper: {
    margin: theme.spacing(1)
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  }
}));

export default function MostProductions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [mostProduct, setMostProduct] = React.useState([]);
  useEffect(()=>{
    let API_URL = "http://"+API_HOST+"/orderallday";
        axios.get(API_URL)
        .then(res => {
            let a = res.data.listProductSales.sort(function(a, b) {
                    return b.total - a.total;
                })
            // console.log(res.data.listProductSales)
            setMostProduct([...a.slice(0, 6)])
            // setProduct(res.data.listProductSales);
            console.log(a.slice(0,4))       
        })
    },[])
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setChecked(prev => !prev);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>TOP SALES</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {/* <Typography> */}
            <div className={classes.container+' containerMostProduct'}>
              {/* <Grow in={checked}>
                <Paper elevation={4} className={classes.paper}>
                  <svg className={classes.svg}>
                    <polygon
                      points="0,100 50,00, 100,100"
                      className={classes.polygon}
                    />
                  </svg>
                </Paper>
              </Grow>
           
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 1000 } : {})}
              >
                <Paper elevation={4} className={classes.paper}>
                  <svg className={classes.svg}>
                    <polygon
                      points="0,100 50,00, 100,100"
                      className={classes.polygon}
                    />
                  </svg>
                </Paper>
              </Grow> */}
              {

                  mostProduct.map((product,index)=>(
                     <Grow key={index}
                        in={checked}
                        style={{ transformOrigin: "0 0 0" }}
                        {...(checked ? { timeout: index*500 } : {})}
                            >
                        <Paper elevation={4} className={classes.paper}>
                          <MediaCard  addProduct={props.addProduct} data={product.id} key={index} /> 
                        </Paper>
                    </Grow>
                      
                  ))
              }
            </div>
          {/* </Typography> */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}