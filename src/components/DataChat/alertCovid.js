import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Alert, AlertTitle } from '@material-ui/lab';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DescriptionAlerts(props) {
  const classes = useStyles();
    setTimeout(()=>{
      console.log(props)
    },2000)
    if(props.cases){
      return (
        <div className={classes.root}>
            <div className="alert alert-primary" role="alert">
                <ErrorIcon
                style={{ 'margin-right': 34}}
                className="iconAl" color="secondary"/>
                
                Tổng case: {props.cases}
            </div>
            <div className="alert alert-warning" role="alert">
              <WarningIcon 
              style={{ 'margin-right': 34}}
              className="iconAl" color="inherit"/>
              Case trong ngày: {props.today}
          </div>
          <div className="alert alert-light" role="alert">
             <ErrorIcon 
             style={{ 'margin-right': 34}}
             className="iconAl" color="action"/>
              Case bình phục: {props.recovered}
          </div>
          <div className="alert alert-danger" role="alert">
          <ErrorIcon 
          style={{ 'margin-right': 34}}
          className="iconAl" color="error"/>
              Case còn lại: {props.ative}
          </div>
        {/* <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This is a warning alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          This is an info alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert> */}
      </div>
    );
    }else{
      return (
        <div className={classes.root}>
            <div className="alert alert-primary" role="alert">
                <ErrorIcon
                style={{ 'margin-right': 34}}
                className="iconAl" color="secondary"/>
                
                Tổng case:  <CircularProgress color="secondary" />
            </div>
            <div className="alert alert-warning" role="alert">
              <WarningIcon 
              style={{ 'margin-right': 34}}
              className="iconAl" color="inherit"/>
              Case trong ngày:  <CircularProgress color="secondary" />
          </div>
          <div className="alert alert-light" role="alert">
             <ErrorIcon 
             style={{ 'margin-right': 34}}
             className="iconAl" color="action"/>
              Case bình phục:  <CircularProgress color="secondary" />
          </div>
          <div className="alert alert-danger" role="alert">
          <ErrorIcon 
          style={{ 'margin-right': 34}}
          className="iconAl" color="error"/>
              Case còn lại:  <CircularProgress color="secondary" />
          </div>
        {/* <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This is a warning alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          This is an info alert — <strong>check it out!</strong>
        </Alert>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert> */}
      </div>
    );
    }
    
}