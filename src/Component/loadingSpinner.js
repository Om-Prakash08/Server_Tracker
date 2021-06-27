import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 100,
    color: 'rgb(1, 1, 56)',
  },
}));

export default function LoadingSpinner(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };


  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button> */}
      <Backdrop className={classes.backdrop} open={ props.loading } >
        <CircularProgress size={60} color="inherit" />
      </Backdrop>
    </div>
  );
}
