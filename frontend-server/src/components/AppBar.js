import React, {useEffect, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import {getStocks} from './alpacafunctions';

const useStyles = makeStyles((theme) => ({

  appBar:{
   // backgroundColor: '#355c7D',
    background:  'linear-gradient(45deg, #355c7D 70%, #F8B192 90%)'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 1,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5),
      width: '25%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


const ButtonAppBar = ({Logout, signOut,history}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = useState(null);
  const [stocklist, setStocks] = useState([]);
  
  useEffect(async()=>{
    const temp = await getStocks();
    setStocks(temp);
  },[])
  
  const handleToolBarClick = (newURL) => {
      history.push(newURL);
  }


  const handleLogout = () => {
      handleMenuClose();
      console.log("This is running");
      //Logout();
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuAccountClick = (newURL) => {
    console.log("Ihavebeencalled");
    handleToolBarClick(newURL)
    handleMenuClose();
  }

  const handleMenuClose = () => {
    console.log("Ihavebeencalled");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searchOnChangeHandler = (event, value, reason) => {
    if(reason === "select-option"){
      history.push(`/buysell/${value}`);
      console.log(value);
    }
  };

  const handlePopUpClose = (object, reason) => {
    if(reason === "select-option"){
      //change pages
    }else if (reason === "escape"){
      console.log("escape");

    }

  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{handleToolBarClick('/account')}}>My account</MenuItem>
      <MenuItem onClick={()=>{handleToolBarClick('/about')}}>About</MenuItem>
      <MenuItem onClick={signOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Button onClick={()=>handleToolBarClick('/')} color="inherit">Portfolio</Button>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  
  

  return(
    <div className={classes.grow}>
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={()=>{history.push('/')}}
        >
          <HomeIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Wheaton Stock Bot
        </Typography>
        <SearchIcon style={{position:"absolute", right:0, left:260}}/>
        <div className={classes.search}>
            <Autocomplete
              id="free-solo-demo"
              value={value}
              handleHomeEndKeys
              freeSolo={false}
              options={stocklist.map((option) => option.symbol)}
              onClose={handlePopUpClose}
              onChange={searchOnChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={"small"}
                  classes={{
                    root: classes.inputRoot,
                    //input: classes.inputInput, this might be a source of problems in the future
                  }}
                  InputProps={{ ...params.InputProps }}
                />
              )}
              
            />
          </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Button onClick={()=>handleToolBarClick('/')} color="inherit">Portfolio</Button>
          <Button onClick={()=>handleToolBarClick('/algo')} color="inherit">Algo</Button>
          {/*<Button onClick={() => handleToolBarClick('/about')} color="inherit">About</Button>*/}
          <Button onClick={()=>handleToolBarClick('/teacher')} color="inherit">Teacher</Button>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
  </div>
);
}

export default withRouter(ButtonAppBar);

