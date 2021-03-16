import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const ButtonAppBar = props => {
  const classes = useStyles();
  
  const { history } = props;
  
  const handleToolBarClick = (newURL) => {
      history.push(newURL);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Wheaton Stock Bot
          </Typography>
          <Button onClick={()=>handleToolBarClick('/')} color="inherit">Manual Trades</Button>
          <Button onClick={()=>handleToolBarClick('/portfolio')} color="inherit">Portfolio</Button>
          <Button onClick={()=>handleToolBarClick('/algo')} color="inherit">Algo</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);
