import React, {useState} from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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


const ButtonAppBar = ({Logout, history}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = useState(null);

  const handleToolBarClick = (newURL) => {
      history.push(newURL);
  }

  const handleAboutClick = () => {
    handleToolBarClick('/about');
  }

  const handleLogout = () => {
      handleMenuClose();
      console.log("This is running");
      Logout();
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
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
      console.log("select-option");
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      <MenuItem onClick={handleAboutClick}>About</MenuItem>
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
      <Button onClick={()=>handleToolBarClick('/')} color="inherit">Manual Trades</Button>
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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={()=>{history.push('/')}}
        >
          <MenuIcon />
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
              options={stocks.map((option) => option.Symbol)}
              onClose={handlePopUpClose}
              onChange={searchOnChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={"small"}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  InputProps={{ ...params.InputProps }}
                />
              )}
              
            />
          </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Button onClick={()=>handleToolBarClick('/')} color="inherit">Manual Trades</Button>
          <Button onClick={()=>handleToolBarClick('/portfolio')} color="inherit">Portfolio</Button>
          <Button onClick={()=>handleToolBarClick('/algo')} color="inherit">Algo</Button>
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

  
  /*
<Input
              {...params}
              placeholder="Search…"
              autoComplete="true"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />


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
          <Button onClick={Logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
*/
}
export default withRouter(ButtonAppBar);

const stocks = [
  {
    "Symbol": "A",
    "Name": "Agilent Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AA",
    "Name": "Alcoa Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AAIC",
    "Name": "Arlington Asset Investment Corp Class A (new)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AAIC^B",
    "Name": "Arlington Asset Investment Corp 7.00%",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AAIC^C",
    "Name": "Arlington Asset Investment Corp 8.250% Seies C Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AAN",
    "Name": "Aarons Holdings Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AAP",
    "Name": "Advance Auto Parts Inc Advance Auto Parts Inc W/I",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AAT",
    "Name": "American Assets Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AB",
    "Name": "AllianceBernstein Holding L.P.  Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABB",
    "Name": "ABB Ltd Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABBV",
    "Name": "AbbVie Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABC",
    "Name": "AmerisourceBergen Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABEV",
    "Name": "Ambev S.A. American Depositary Shares (Each representing 1 Common Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABG",
    "Name": "Asbury Automotive Group Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABM",
    "Name": "ABM Industries Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABR",
    "Name": "Arbor Realty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABR^A",
    "Name": "Arbor Realty Trust Preferred Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABR^B",
    "Name": "Arbor Realty Trust Cumulative Redeemable Preferred Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABR^C",
    "Name": "Arbor Realty Trust Cumulative Redeemable Preferred Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ABT",
    "Name": "Abbott Laboratories Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AC",
    "Name": "Associated Capital Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACA",
    "Name": "Arcosa Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACB",
    "Name": "Aurora Cannabis Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACC",
    "Name": "American Campus Communities Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACCO",
    "Name": "Acco Brands Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACEL",
    "Name": "Accel Entertainment Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACH",
    "Name": "Aluminum Corporation of China Limited American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACI",
    "Name": "Albertsons Companies Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACIC",
    "Name": "Atlas Crest Investment Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACM",
    "Name": "AECOM Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACN",
    "Name": "Accenture plc Class A Ordinary Shares (Ireland)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACND",
    "Name": "Ascendant Digital Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACP",
    "Name": "Aberdeen Income Credit Strategies Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACR",
    "Name": "ACRES Commercial Realty Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACR^C",
    "Name": "ACRES Commercial Realty Corp. 8.625% Fixed-to-Floating Series C Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACRE",
    "Name": "Ares Commercial Real Estate Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ACV",
    "Name": "Virtus AllianzGI Diversified Income & Convertible Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADC",
    "Name": "Agree Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADCT",
    "Name": "ADC Therapeutics SA Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADEX",
    "Name": "Adit EdTech Acquisition Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADM",
    "Name": "Archer-Daniels-Midland Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADNT",
    "Name": "Adient plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADS",
    "Name": "Alliance Data Systems Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADT",
    "Name": "ADT Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ADX",
    "Name": "Adams Diversified Equity Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEB",
    "Name": "AEGON N.V. Perp. Cap. Secs. Floating Rate (Netherlands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEE",
    "Name": "Ameren Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEFC",
    "Name": "Aegon Funding Company LLC 5.10% Subordinated Notes due 2049",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEG",
    "Name": "AEGON N.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEL",
    "Name": "American Equity Investment Life Holding Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEL^A",
    "Name": "American Equity Investment Life Holding Company Depositary Shares each representing a 1/1000th interest in a share of 5.95% Fixed-Rate Reset Non-Cumulative Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEL^B",
    "Name": "American Equity Investment Life Holding Company Depositary Shares each representing a 1/1000th interest in a share of 6.625% Fixed-Rate Reset Non-Cumulative Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEM",
    "Name": "Agnico Eagle Mines Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AENZ",
    "Name": "Aenza S.A.A. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEO",
    "Name": "American Eagle Outfitters Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AER",
    "Name": "AerCap Holdings N.V. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AES",
    "Name": "The AES Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AESC",
    "Name": "The AES Corporation Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AEVA",
    "Name": "Aeva Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFB",
    "Name": "AllianceBernstein National Municipal Income Fund Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFC",
    "Name": "Allied Capital Corporation Allied Capital Corporation 6.875% Notes due April 15 2047",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFG",
    "Name": "American Financial Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFGB",
    "Name": "American Financial Group Inc. 5.875% Subordinated Debentures due 2059",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFGC",
    "Name": "American Financial Group Inc. 5.125% Subordinated Debentures due 2059",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFGD",
    "Name": "American Financial Group Inc. 5.625% Subordinated Debentures due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFGE",
    "Name": "American Financial Group Inc. 4.500% Subordinated Debentures due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFI",
    "Name": "Armstrong Flooring Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFL",
    "Name": "AFLAC Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AFT",
    "Name": "Apollo Senior Floating Rate Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AG",
    "Name": "First Majestic Silver Corp. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGCB",
    "Name": "Altimeter Growth Corp. 2 Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGCO",
    "Name": "AGCO Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGD",
    "Name": "Aberdeen Global Dynamic Dividend Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGI",
    "Name": "Alamos Gold Inc. Class A Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGM",
    "Name": "Federal Agricultural Mortgage Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGM^C",
    "Name": "Federal Agricultural Mortgage Corporation Preferred Series C Fixed to Fltg",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGM^D",
    "Name": "Federal Agricultural Mortgage Corporation 5.700% Non-Cumulative Preferred Stock Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGM^E",
    "Name": "Federal Agricultural Mortgage Corporation 5.750% Non-Cumulative Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGM^F",
    "Name": "Federal Agricultural Mortgage Corporation 5.250% Non-Cumulative Preferred Stock Series F",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGO",
    "Name": "Assured Guaranty Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGO^B",
    "Name": "Assured Guaranty Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGO^E",
    "Name": "Assured Guaranty Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGO^F",
    "Name": "Assured Guaranty Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGR",
    "Name": "Avangrid Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGRO",
    "Name": "Adecoagro S.A. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGS",
    "Name": "PlayAGS Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AGX",
    "Name": "Argan Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHC",
    "Name": "A.H. Belo Corporation (TX) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHH",
    "Name": "Armada Hoffler Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHH^A",
    "Name": "Armada Hoffler Properties Inc. 6.75% Series A Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHL^C",
    "Name": "Aspen Insurance Holdings Limited 5.95% Fixed-to-Floating Rate Perpetual Non-Cumulative Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHL^D",
    "Name": "Aspen Insurance Holdings Limited 5.625% Perpetual Non-Cumulative Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHL^E",
    "Name": "Aspen Insurance Holdings Limited Depositary Shares each representing a 1/1000th interest in a share of 5.625% Perpetual Non-Cumulative Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHT",
    "Name": "Ashford Hospitality Trust Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHT^D",
    "Name": "Ashford Hospitality Trust Inc 8.45% Series D Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHT^F",
    "Name": "Ashford Hospitality Trust Inc 7.375% Series F Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHT^G",
    "Name": "Ashford Hospitality Trust Inc 7.375% Series G Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHT^H",
    "Name": "Ashford Hospitality Trust Inc 7.50% Series H Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AHT^I",
    "Name": "Ashford Hospitality Trust Inc 7.50% Series I Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AI",
    "Name": "C3.ai Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIC",
    "Name": "Arlington Asset Investment Corp 6.750% Notes due 2025",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIF",
    "Name": "Apollo Tactical Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIG",
    "Name": "American International Group Inc. New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIG^A",
    "Name": "American International Group Inc. Depositary Shares Each Representing a 1/1000th Interest in a Share of Series A 5.85% Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIN",
    "Name": "Albany International Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIO",
    "Name": "Virtus AllianzGI Artificial Intelligence & Technology Opportunities Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIR",
    "Name": "AAR Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIRC",
    "Name": "Apartment Income REIT Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIT",
    "Name": "Applied Industrial Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIV",
    "Name": "Apartment Investment and Management Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIZ",
    "Name": "Assurant Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AIZN",
    "Name": "Assurant Inc. 5.25% Subordinated Notes due 2061",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AJAX",
    "Name": "Ajax I Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AJG",
    "Name": "Arthur J. Gallagher & Co. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AJRD",
    "Name": "Aerojet Rocketdyne Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AJX",
    "Name": "Great Ajax Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AJXA",
    "Name": "Great Ajax Corp. 7.25% Convertible Senior Notes due 2024",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AKO/A",
    "Name": "Embotelladora Andina S.A.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AKO/B",
    "Name": "Embotelladora Andina S.A.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AKR",
    "Name": "Acadia Realty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AL",
    "Name": "Air Lease Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AL^A",
    "Name": "Air Lease Corporation 6.150% Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALB",
    "Name": "Albemarle Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALC",
    "Name": "Alcon Inc. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALE",
    "Name": "Allete Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALEX",
    "Name": "Alexander & Baldwin Inc. Common Stock REIT Holding Company",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALG",
    "Name": "Alamo Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALIN^A",
    "Name": "Altera Infrastructure L.P. 7.25% Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALIN^B",
    "Name": "Altera Infrastructure L.P. 8.50% Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALIN^E",
    "Name": "Altera Infrastructure L.P. 8.875% Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALK",
    "Name": "Alaska Air Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALL",
    "Name": "Allstate Corporation (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALL^B",
    "Name": "Allstate Corporation (The) 5.100% Fixed-to-Floating Rate Subordinated Debentures due 2053",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALL^G",
    "Name": "Allstate Corporation (The) Depositary Shares each representing a 1/1000th interest in a share of Fixed Rate Noncumulative Perpetual Preferred Stock Series G",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALL^H",
    "Name": "Allstate Corporation (The) Depositary Shares each representing a 1/1000th interest in a share of Fixed Rate Noncumulative Perpetual Preferred Stock Series H",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALL^I",
    "Name": "Allstate Corporation (The) Depositary Shares each representing a 1/1000th interest in a share of Fixed Rate Noncumulative Perpetual Preferred Stock Series I",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALLE",
    "Name": "Allegion plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALLY",
    "Name": "Ally Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALLY^A",
    "Name": "GMAC Capital Trust I Fixed Rate Floating Rate Trust Preferred Securities Series 2",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALP^Q",
    "Name": "Alabama Power Company 5.00% Class A Preferred Stock Cumulative Par Value $1 Per Share (Stated Capital $25 Per Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALSN",
    "Name": "Allison Transmission Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALTG",
    "Name": "Alta Equipment Group Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALTG^A",
    "Name": "Alta Equipment Group Inc. Depositary Shares (each representing 1/1000th in a share of 10% Series A Cumulative Perpetual Preferred Stock)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALUS",
    "Name": "Alussa Energy Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALV",
    "Name": "Autoliv Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ALX",
    "Name": "Alexander's Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AM",
    "Name": "Antero Midstream Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMBC",
    "Name": "Ambac Financial Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMC",
    "Name": "AMC Entertainment Holdings Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMCR",
    "Name": "Amcor plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AME",
    "Name": "AMETEK Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMG",
    "Name": "Affiliated Managers Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMH",
    "Name": "American Homes 4 Rent Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMH^D",
    "Name": "American Homes 4 Rent 6.5% Series D Cumulative Perpetual Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMH^E",
    "Name": "American Homes 4 Rent 6.35% Series E Cumulative Redeemable Perpetual Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMH^F",
    "Name": "American Homes 4 Rent 5.875% Series F Cumulative Redeemable Perpetual Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMH^G",
    "Name": "American Homes 4 Rent Series G cumulative redeemable perpetual preferred shares of beneficial interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMH^H",
    "Name": "American Homes 4 Rent Series H cumulative redeemable perpetual Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMK",
    "Name": "AssetMark Financial Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMN",
    "Name": "AMN Healthcare Services Inc AMN Healthcare Services Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMOV",
    "Name": "America Movil S.A.B. de C.V. Class A American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMP",
    "Name": "Ameriprise Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMPY",
    "Name": "Amplify Energy Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMR",
    "Name": "Alpha Metallurgical Resources Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMRC",
    "Name": "Ameresco Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMRX",
    "Name": "Amneal Pharmaceuticals Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMT",
    "Name": "American Tower Corporation (REIT) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMWL",
    "Name": "American Well Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AMX",
    "Name": "America Movil S.A.B. de C.V. American Depository Receipt Series L",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AN",
    "Name": "AutoNation Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ANET",
    "Name": "Arista Networks Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ANF",
    "Name": "Abercrombie & Fitch Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ANH",
    "Name": "Anworth Mortgage Asset Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ANH^A",
    "Name": "Anworth Mortgage Asset Corporation Series A Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ANH^B",
    "Name": "Anworth Mortgage Asset  Corporation Preferred Stock Series B 6.25%",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ANH^C",
    "Name": "Anworth Mortgage Asset  Corporation 7.625% Series C Cumulative Redeemable  Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ANTM",
    "Name": "Anthem Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AOD",
    "Name": "Aberdeen Total Dynamic Dividend Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AON",
    "Name": "Aon plc Class A Ordinary Shares (Ireland)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AONE",
    "Name": "one Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AOS",
    "Name": "A.O. Smith Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AP",
    "Name": "Ampco-Pittsburgh Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APAM",
    "Name": "Artisan Partners Asset Management Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APD",
    "Name": "Air Products and Chemicals Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APG",
    "Name": "APi Group Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APH",
    "Name": "Amphenol Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APLE",
    "Name": "Apple Hospitality REIT Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APO",
    "Name": "Apollo Global Management Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APO^A",
    "Name": "Apollo Global Management Inc. 6.375% Series A Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APO^B",
    "Name": "Apollo Global Management Inc 6.375% Series B Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APRN",
    "Name": "Blue Apron Holdings Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APSG",
    "Name": "Apollo Strategic Growth Capital Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APTS",
    "Name": "Preferred Apartment Communities Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APTV",
    "Name": "Aptiv PLC Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "APTV^A",
    "Name": "Aptiv PLC 5.50% Series A Mandatory Convertible Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AQN",
    "Name": "Algonquin Power & Utilities Corp. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AQNA",
    "Name": "Algonquin Power & Utilities Corp. 6.875% Fixed-to-Floating Rate Subordinated Notes Series 2018-A due October 17 2078",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AQNB",
    "Name": "Algonquin Power & Utilities Corp. 6.20% Fixed-to-Floating Subordinated Notes Series 2019-A due July 1 2079",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AQUA",
    "Name": "Evoqua Water Technologies Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AR",
    "Name": "Antero Resources Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARC",
    "Name": "ARC Document Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARCH",
    "Name": "Arch Resources Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARCO",
    "Name": "Arcos Dorados Holdings Inc. Class A Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARD",
    "Name": "Ardagh Group S.A. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARDC",
    "Name": "Ares Dynamic Credit Allocation Fund Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARE",
    "Name": "Alexandria Real Estate Equities Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARES",
    "Name": "Ares Management Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARES^A",
    "Name": "Ares Management Corporation 7.00% Series A Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARGD",
    "Name": "Argo Group International Holdings Ltd. 6.5% Senior Notes Due 2042",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARGO",
    "Name": "Argo Group International Holdings Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARGO^A",
    "Name": "Argo Group International Holdings Ltd. Depositary Shares Each Representing a 1/1000th Interest in a 7.00% Resettable Fixed Rate Preference Share Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARI",
    "Name": "Apollo Commercial Real Estate Finance Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARL",
    "Name": "American Realty Investors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARLO",
    "Name": "Arlo Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARMK",
    "Name": "Aramark Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARNC",
    "Name": "Arconic Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AROC",
    "Name": "Archrock Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARR",
    "Name": "ARMOUR Residential REIT Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARR^C",
    "Name": "ARMOUR Residential REIT Inc. 7% Series C Cumulative Redeemable Preferred Stock (liquidation preference $25.00 per share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ARW",
    "Name": "Arrow Electronics Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASA",
    "Name": "ASA  Gold and Precious Metals Limited",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASAI",
    "Name": "Sendas Distribuidora S.A. ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASAN",
    "Name": "Asana Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASAQ",
    "Name": "Atlantic Street Acquisition Corp Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASB",
    "Name": "Associated Banc-Corp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASB^C",
    "Name": "Associated Banc-Corp Depositary shares each representing a 1/40th ownership interest in a share of 6.125% Non-Cumulative Perpetual Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASB^D",
    "Name": "Associated Banc-Corp Depositary Shares each representing a 1/40th interest in a share of Associated Banc-Corp 5.375% Non-Cumulative Perpetual Preferred Stock Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASB^E",
    "Name": "Associated Banc-Corp Depositary Shares each representing a 1/40th interest in a share of 5.875% Non-Cumulative Perpetual Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASB^F",
    "Name": "Associated Banc-Corp Depositary Shares each representing a 1/40th interest in a share of Associated Banc-Corp 5.625% Non-Cumulative Perpetual Preferred Stock Series F",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASC",
    "Name": "Ardmore Shipping Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASG",
    "Name": "Liberty All-Star Growth Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASGI",
    "Name": "Aberdeen Standard Global Infrastructure Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASGN",
    "Name": "ASGN Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASH",
    "Name": "Ashland Global Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASIX",
    "Name": "AdvanSix Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASPL",
    "Name": "Aspirational Consumer Lifestyle Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASPN",
    "Name": "Aspen Aerogels Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASR",
    "Name": "Grupo Aeroportuario del Sureste S.A. de C.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ASX",
    "Name": "ASE Technology Holding Co. Ltd. American Depositary Shares (each representing Two Common Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AT",
    "Name": "Atlantic Power Corporation Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATA",
    "Name": "Americas Technology Acquisition Corp. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATAC",
    "Name": "Altimar Acquisition Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATC",
    "Name": "Atotech Limited Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATCO",
    "Name": "Atlas Corp. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATCO^D",
    "Name": "Atlas Corp. 7.95% Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATCO^E",
    "Name": "Atlas Corp. 8.25% Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATCO^G",
    "Name": "Atlas Corp. 8.20% Series G",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATCO^H",
    "Name": "Atlas Corp. 7.875% Series H",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATCO^I",
    "Name": "Atlas Corp. Series I Fixed-to-Floating",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATEN",
    "Name": "A10 Networks Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATGE",
    "Name": "Adtalem Global Education Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATH",
    "Name": "Athene Holding Ltd. Class A Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATH^A",
    "Name": "Athene Holding Ltd. Depositary Shares Each Representing a 1/1000th Interest in a 6.35% Fixed-to-Floating Rate Perpetual Non-Cumulative Preference Share Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATH^B",
    "Name": "Athene Holding Ltd. Depositary Shares Each Representing a 1/1000th Interest in a 5.625% Fixed Rate Perpetual Non- Cumulative Preference Share Series B par value $1.00 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATH^C",
    "Name": "Athene Holding Ltd. Depositary Shares each representing a 1/1000th Interest in a Share of 6.375% Fixed-Rate Reset Perpetual Non-Cumulative Preference Shares Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATH^D",
    "Name": "Athene Holding Ltd. Depositary Shares Each Representing a 1/1000th Interest in a 4.875% Fixed-Rate Perpetual Non-Cumulative Preference Share Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATHM",
    "Name": "Autohome Inc. American Depositary Shares each representing four class A ordinary shares.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATI",
    "Name": "Allegheny Technologies Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATKR",
    "Name": "Atkore Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATO",
    "Name": "Atmos Energy Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATR",
    "Name": "AptarGroup Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATTO",
    "Name": "Atento S.A. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ATUS",
    "Name": "Altice USA Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AU",
    "Name": "AngloGold Ashanti Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AUY",
    "Name": "Yamana Gold Inc. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVA",
    "Name": "Avista Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVAL",
    "Name": "Grupo Aval Acciones y Valores S.A. ADR (Each representing 20 preferred shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVAN",
    "Name": "Avanti Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVB",
    "Name": "AvalonBay Communities Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVD",
    "Name": "American Vanguard Corporation Common Stock ($0.10 Par Value)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVK",
    "Name": "Advent Convertible and Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVLR",
    "Name": "Avalara Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVNS",
    "Name": "Avanos Medical Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVNT",
    "Name": "Avient Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVTR",
    "Name": "Avantor Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVTR^A",
    "Name": "Avantor Inc. Series A Mandatory Convertible Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVY",
    "Name": "Avery Dennison Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AVYA",
    "Name": "Avaya Holdings Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AWF",
    "Name": "Alliancebernstein Global High Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AWI",
    "Name": "Armstrong World Industries Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AWK",
    "Name": "American Water Works Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AWP",
    "Name": "Aberdeen Global Premier Properties Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AWR",
    "Name": "American States Water Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AX",
    "Name": "Axos Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AXL",
    "Name": "American Axle & Manufacturing Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AXO",
    "Name": "Axos Financial Inc. 6.25% Subordinated Notes Due 2026",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AXP",
    "Name": "American Express Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AXR",
    "Name": "AMREP Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AXS",
    "Name": "Axis Capital Holdings Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AXS^E",
    "Name": "Axis Capital Holdings Limited Depositary Shares each representing 1/100th interest in a share of a 5.50% Series E Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AXTA",
    "Name": "Axalta Coating Systems Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AYI",
    "Name": "Acuity Brands Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AYX",
    "Name": "Alteryx Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AZEK",
    "Name": "The AZEK Company Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AZO",
    "Name": "AutoZone Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AZRE",
    "Name": "Azure Power Global Limited Equity Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AZUL",
    "Name": "Azul S.A. American Depositary Shares (each representing three preferred shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "AZZ",
    "Name": "AZZ Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "B",
    "Name": "Barnes Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BA",
    "Name": "Boeing Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BABA",
    "Name": "Alibaba Group Holding Limited American Depositary Shares each representing eight Ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC",
    "Name": "Bank of America Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^A",
    "Name": "Bank of America Corporation Depositary Shares each representing a 1/1000 th interest in a share of Bank of America Corporation 6.000% Non-Cumulative",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^B",
    "Name": "Bank of America Corporation Depositary Shares each representing a 1/1000th interest in a share of 6.000% Non-Cumulative Preferred Stock Series GG",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^E",
    "Name": "Bank of America Corporation Depositary Sh repstg 1/1000th Perp Pfd Ser E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^K",
    "Name": "Bank of America Corporation Depositary Shares each representing a 1/1000th interest in a share of 5.875% Non- Cumulative Preferred Stock Series HH",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^L",
    "Name": "Bank of America Corporation Non Cumulative Perpetual Conv Pfd Ser L",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^M",
    "Name": "Bank of America Corporation Depositary Shares each representing a 1/1000th interest in a share of 5.375% Non-Cumulative Preferred Stock Series KK",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^N",
    "Name": "Bank of America Corporation Depositary shares each representing 1/1000th interest in a share of 5.000% Non-Cumulative Preferred Stock Series LL",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^O",
    "Name": "Bank of America Corporation Depositary shares each representing 1/1000th interest in a share of 4.375% Non-Cumulative Preferred Stock Series NN",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAC^P",
    "Name": "Bank of America Corporation Depositary Shares each representing a 1/1000th interest in a share of 4.125% Non-Cumulative Preferred Stock Series PP",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAH",
    "Name": "Booz Allen Hamilton Holding Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAK",
    "Name": "Braskem SA ADR",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BALY",
    "Name": "Bally's Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAM",
    "Name": "Brookfield Asset Management Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAMH",
    "Name": "Brookfield Finance Inc. 4.625% Subordinated Notes due October 16 2080",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAMI",
    "Name": "Brookfield Finance Inc. 4.50% Perpetual Subordinated Notes",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BANC",
    "Name": "Banc of California Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BANC^E",
    "Name": "Banc of California Inc. Depositary Shares Each Representing a 1/40th Interest in a Share of 7.000% Non-Cumulative Perpetual Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAP",
    "Name": "Credicorp Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BAX",
    "Name": "Baxter International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BB",
    "Name": "BlackBerry Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBAR",
    "Name": "Banco BBVA Argentina S.A. ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBD",
    "Name": "Banco Bradesco Sa American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBDC",
    "Name": "Barings BDC Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBDO",
    "Name": "Banco Bradesco Sa American Depositary Shares (each representing one Common Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBF",
    "Name": "BlackRock Municipal Income Investment Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBL",
    "Name": "BHP Group PlcSponsored ADR",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBN",
    "Name": "BlackRock Taxable Municipal Bond Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBU",
    "Name": "Brookfield Business Partners L.P. Limited Partnership Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBVA",
    "Name": "Banco Bilbao Vizcaya Argentaria S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBW",
    "Name": "Build-A-Bear Workshop Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BBY",
    "Name": "Best Buy Co. Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BC",
    "Name": "Brunswick Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BC^A",
    "Name": "Brunswick Corporation 6.500% Senior Notes due 2048",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BC^B",
    "Name": "Brunswick Corporation 6.625% Senior Notes due 2049",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BC^C",
    "Name": "Brunswick Corporation 6.375% Notes due 2049",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCAT",
    "Name": "BlackRock Capital Allocation Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCC",
    "Name": "Boise Cascade L.L.C. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCE",
    "Name": "BCE Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCEI",
    "Name": "Bonanza Creek Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCH",
    "Name": "Banco De Chile Banco De Chile ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCO",
    "Name": "Brinks Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCS",
    "Name": "Barclays PLC Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCSF",
    "Name": "Bain Capital Specialty Finance Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BCX",
    "Name": "BlackRock Resources Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BDC",
    "Name": "Belden Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BDJ",
    "Name": "Blackrock Enhanced Equity Dividend Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BDN",
    "Name": "Brandywine Realty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BDX",
    "Name": "Becton Dickinson and Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BDXB",
    "Name": "Becton Dickinson and Company Depositary Shares each Representing a 1/20th Interest in a Share of 6.00% Mandatory Convertible Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BE",
    "Name": "Bloom Energy Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BEDU",
    "Name": "Bright Scholar Education Holdings Limited American Depositary Shares each  representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BEKE",
    "Name": "KE Holdings Inc American Depositary Shares (each representing three Class A Ordinary Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BEN",
    "Name": "Franklin Resources Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BEP",
    "Name": "Brookfield Renewable Partners L.P.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BEP^A",
    "Name": "Brookfield Renewable Partners L.P. 5.25% Class A Preferred Limited Partnership Units Series 17",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BEPC",
    "Name": "Brookfield Renewable Corporation Class A Subordinate Voting Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BERY",
    "Name": "Berry Global Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BEST",
    "Name": "BEST Inc. American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BF/A",
    "Name": "Brown Forman Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BF/B",
    "Name": "Brown Forman Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFAM",
    "Name": "Bright Horizons Family Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFK",
    "Name": "BlackRock Municipal Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFLY",
    "Name": "Butterfly Network Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFS",
    "Name": "Saul Centers Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFS^D",
    "Name": "Saul Centers Inc. Depositary Shares each representing 1/100th of a share of 6.125% Series D Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFS^E",
    "Name": "Saul Centers Inc. Depositary shares each representing a 1/100th fractional interest in a share of 6.000% Series E Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFT",
    "Name": "Foley Trasimene Acquisition Corp. II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFY",
    "Name": "BlackRock New York Municipal Income Trust II",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BFZ",
    "Name": "BlackRock California Municipal Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BG",
    "Name": "Bunge Limited Bunge Limited",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGB",
    "Name": "Blackstone Strategic Credit Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGH",
    "Name": "Barings Global Short Duration High Yield Fund Common Shares of Beneficial Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGIO",
    "Name": "BlackRock 2022 Global Income Opportunity Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGR",
    "Name": "BlackRock Energy and Resources Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGS",
    "Name": "B&G Foods Inc. B&G Foods Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGSF",
    "Name": "BGSF Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGT",
    "Name": "BlackRock Floating Rate Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGX",
    "Name": "Blackstone Long Short Credit Income Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BGY",
    "Name": "Blackrock Enhanced International Dividend Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BH",
    "Name": "Biglari Holdings Inc. Class B Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHC",
    "Name": "Bausch Health Companies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHE",
    "Name": "Benchmark Electronics Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHK",
    "Name": "Blackrock Core Bond Trust Blackrock Core Bond Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHLB",
    "Name": "Berkshire Hills Bancorp Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHP",
    "Name": "BHP Group Limited American Depositary Shares (Each representing two Ordinary Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHR",
    "Name": "Braemar Hotels & Resorts Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHR^B",
    "Name": "Braemar Hotels & Resorts Inc. 5.50% Series B Cumulative Convertible Preferred Stock par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHR^D",
    "Name": "Braemar Hotels & Resorts Inc. 8.25% Series D Cumulative Preferred Stock  par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHV",
    "Name": "BlackRock Virginia Municipal Bond Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BHVN",
    "Name": "Biohaven Pharmaceutical Holding Company Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIF",
    "Name": "Boulder Growth & Income Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIG",
    "Name": "Big Lots Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BILL",
    "Name": "Bill.com Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIO",
    "Name": "Bio-Rad Laboratories Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIO/B",
    "Name": "Bio-Rad Laboratories Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIP",
    "Name": "Brookfield Infrastructure Partners LP Limited Partnership Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIP^A",
    "Name": "Brookfield Infrastructure Partners LP 5.125% Class A Preferred Limited Partnership Units Series 13",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIP^B",
    "Name": "Brookfield Infrastructure Partners LP 5.000% Class A Preferred Limited Partnership Units Series 14",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIPC",
    "Name": "Brookfield Infrastructure Partners LP Class A Subordinate Voting Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BIT",
    "Name": "BlackRock Multi-Sector Income Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BJ",
    "Name": "BJ's Wholesale Club Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BK",
    "Name": "The Bank of New York Mellon Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKD",
    "Name": "Brookdale Senior Living Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKE",
    "Name": "Buckle Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKH",
    "Name": "Black Hills Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKI",
    "Name": "Black Knight Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKN",
    "Name": "BlackRock Investment Quality Municipal Trust Inc. (The)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKR",
    "Name": "Baker Hughes Company Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKT",
    "Name": "BlackRock Income Trust Inc. (The)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BKU",
    "Name": "BankUnited Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BLD",
    "Name": "TopBuild Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BLE",
    "Name": "BlackRock Municipal Income Trust II",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BLK",
    "Name": "BlackRock Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BLL",
    "Name": "Ball Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BLW",
    "Name": "Blackrock Limited Duration Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BLX",
    "Name": "Banco Latinoamericano de Comercio Exterior S.A.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BMA",
    "Name": "Banco Macro S.A.  ADR (representing Ten Class B Common Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BME",
    "Name": "Blackrock Health Sciences Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BMEZ",
    "Name": "BlackRock Health Sciences Trust II Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BMI",
    "Name": "Badger Meter Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BML^G",
    "Name": "Bank of America Corporation Bank of America Corporation Depositary Shares (Each representing a 1/1200th interest in a share of Floating Rate Non-Cumulative Preferred Stock  Series 1)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BML^H",
    "Name": "Bank of America Corporation Bank of America Corporation Depositary Shares (Each representing a 1/1200th interest in a Share of Floating Rate Non-Cumulative Preferred Stock Series 2)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BML^J",
    "Name": "Bank of America Corporation Bank of America Corporation Depositary Shares (Each representing a 1/1200th interest in a Share of Floating Rate Non-Cumulative Preferred Stock Series 4)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BML^L",
    "Name": "Bank of America Corporation Bank of America Corporation Depositary Shares (Each representing a 1/1200th Interest in a Share of Floating Rate Non-Cumulative Preferred Stock Series 5)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BMO",
    "Name": "Bank Of Montreal Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BMY",
    "Name": "Bristol-Myers Squibb Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BNED",
    "Name": "Barnes & Noble Education Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BNL",
    "Name": "Broadstone Net Lease Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BNS",
    "Name": "Bank Nova Scotia Halifax Pfd 3 Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BNY",
    "Name": "BlackRock New York Municipal Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BOAC",
    "Name": "Bluescape Opportunities Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BOE",
    "Name": "Blackrock Enhanced Global Dividend Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BOH",
    "Name": "Bank of Hawaii Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BOOT",
    "Name": "Boot Barn Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BORR",
    "Name": "Borr Drilling Limited Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BOX",
    "Name": "Box Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BP",
    "Name": "BP p.l.c. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BPMP",
    "Name": "BP Midstream Partners LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BPT",
    "Name": "BP Prudhoe Bay Royalty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BQ",
    "Name": "Boqii Holding Limited American Depositary Shares representing Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BR",
    "Name": "Broadridge Financial Solutions Inc.Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRBR",
    "Name": "BellRing Brands Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRC",
    "Name": "Brady Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRFS",
    "Name": "BRF S.A.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRK/A",
    "Name": "Berkshire Hathaway Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRK/B",
    "Name": "Berkshire Hathaway Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRMK",
    "Name": "Broadmark Realty Capital Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRO",
    "Name": "Brown & Brown Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRT",
    "Name": "BRT Apartments Corp. (MD) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BRX",
    "Name": "Brixmor Property Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSA",
    "Name": "BrightSphere Investment Group Inc. 5.125% Notes due 2031",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSAC",
    "Name": "Banco Santander - Chile ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSBR",
    "Name": "Banco Santander Brasil SA American Depositary Shares each representing one unit",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSD",
    "Name": "BlackRock Strategic Municipal Trust Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSE",
    "Name": "Blackrock New York Municipal Income Quality Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSIG",
    "Name": "BrightSphere Investment Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSL",
    "Name": "Blackstone Senior Floating Rate Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSM",
    "Name": "Black Stone Minerals L.P. Common units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSMX",
    "Name": "Banco Santander Mexico S.A. Institucion de Banca Multiple Grupo Financiero Santander Mexico",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSN",
    "Name": "Broadstone Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BST",
    "Name": "BlackRock Science and Technology Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSTZ",
    "Name": "BlackRock Science and Technology Trust II Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSX",
    "Name": "Boston Scientific Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BSX^A",
    "Name": "Boston Scientific Corporation 5.50% Mandatory Convertible Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BTA",
    "Name": "BlackRock Long-Term Municipal Advantage Trust BlackRock Long-Term Municipal Advantage Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BTI",
    "Name": "British American Tobacco  Industries p.l.c. Common Stock ADR",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BTO",
    "Name": "John Hancock Financial Opportunities Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BTT",
    "Name": "BlackRock Municipal 2030 Target Term Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BTU",
    "Name": "Peabody Energy Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BTZ",
    "Name": "BlackRock Credit Allocation Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BUD",
    "Name": "Anheuser-Busch Inbev SA Sponsored ADR (Belgium)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BUI",
    "Name": "BlackRock Utility Infrastructure & Power Opportunities Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BUR",
    "Name": "Burford Capital Limited Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BURL",
    "Name": "Burlington Stores Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BV",
    "Name": "BrightView Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BVH",
    "Name": "Bluegreen Vacations Holding Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BVN",
    "Name": "Buenaventura Mining Company Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BW",
    "Name": "Babcock & Wilcox Enterprises Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BWA",
    "Name": "BorgWarner Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BWG",
    "Name": "BrandywineGLOBAL Global Income Opportunities Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BWSN",
    "Name": "Babcock & Wilcox Enterprises Inc. 8.125% Senior Notes due 2026",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BWXT",
    "Name": "BWX Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BX",
    "Name": "The Blackstone Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXC",
    "Name": "Bluelinx Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXG",
    "Name": "Bluegreen Vacations Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXMT",
    "Name": "Blackstone Mortgage Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXMX",
    "Name": "Nuveen S&P 500 Buy-Write Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXP",
    "Name": "Boston Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXP^B",
    "Name": "Boston Properties Inc. Depositary Shares each representing 1/100th of a share of the Issuer's 5.25% Sockeries B Cumulative Redeemable Preferred St",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXS",
    "Name": "BancorpSouth Bank Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BXS^A",
    "Name": "BancorpSouth Bank 5.50% Series A Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BY",
    "Name": "Byline Bancorp Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BYD",
    "Name": "Boyd Gaming Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BYM",
    "Name": "Blackrock Municipal Income Quality Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BZH",
    "Name": "Beazer Homes USA Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "BZM",
    "Name": "BlackRock Maryland Municipal Bond Trust Common shares of beneficial interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "C",
    "Name": "Citigroup Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "C^J",
    "Name": "Citigroup Inc. Dep Shs Repstg 1/1000 Pfd Ser J Fixed/Fltg",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "C^K",
    "Name": "Citigroup Inc. Dep Shs Repstg 1/1000th Pfd Ser K",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "C^N",
    "Name": "Citigroup Capital XIII 7.875% Fixed rate Floating Rate trust Preferred Securities (TruPS)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAAP",
    "Name": "Corporacion America Airports SA Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CABO",
    "Name": "Cable One Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CACI",
    "Name": "CACI International Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CADE",
    "Name": "Cadence Bancorporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAE",
    "Name": "CAE Inc. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAF",
    "Name": "Morgan Stanley China A Share Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAG",
    "Name": "ConAgra Brands Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAH",
    "Name": "Cardinal Health Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAI",
    "Name": "CAI International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAI^A",
    "Name": "CAI International Inc. 8.50% Series A Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAI^B",
    "Name": "CAI International Inc. 8.50% Series B Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAJ",
    "Name": "Canon Inc. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAL",
    "Name": "Caleres Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CALX",
    "Name": "Calix Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CANG",
    "Name": "Cango Inc. American Depositary Shares  each representing two (2) Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAP",
    "Name": "Capitol Investment Corp. V Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAPL",
    "Name": "CrossAmerica Partners LP Common Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CARR",
    "Name": "Carrier Global Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CARS",
    "Name": "Cars.com Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAS",
    "Name": "Cascade Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CAT",
    "Name": "Caterpillar Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CATO",
    "Name": "Cato Corporation (The) Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CB",
    "Name": "Chubb Limited  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBAH",
    "Name": "CBRE Acquisition Holdings Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBB",
    "Name": "Cincinnati Bell Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBB^B",
    "Name": "Cincinnati Bell Inc. Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBD",
    "Name": "Companhia Brasileira de Distribuicao American Depsitary Shares; each representing one Common Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBH",
    "Name": "Virtus AllianzGI Convertible & Income 2024 Target Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBRE",
    "Name": "CBRE Group Inc Common Stock Class A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBT",
    "Name": "Cabot Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBU",
    "Name": "Community Bank System Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CBZ",
    "Name": "CBIZ Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CC",
    "Name": "Chemours Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCAC",
    "Name": "CITIC Capital Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCEP",
    "Name": "Coca-Cola European Partners plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCI",
    "Name": "Crown Castle International Corp. (REIT) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCIV",
    "Name": "Churchill Capital Corp IV Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCJ",
    "Name": "Cameco Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCK",
    "Name": "Crown Holdings Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCL",
    "Name": "Carnival Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCM",
    "Name": "Concord Medical Services Holdings Limited ADS (Each represents three ordinary shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCO",
    "Name": "Clear Channel Outdoor Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCS",
    "Name": "Century Communities Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCU",
    "Name": "Compania Cervecerias Unidas S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCV",
    "Name": "Churchill Capital Corp V Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCX",
    "Name": "Churchill Capital Corp II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CCZ",
    "Name": "Comcast Holdings ZONES",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CDAY",
    "Name": "Ceridian HCM Holding Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CDE",
    "Name": "Coeur Mining Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CDR",
    "Name": "Cedar Realty Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CDR^B",
    "Name": "Cedar Realty Trust Inc. 7.25% Series B Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CDR^C",
    "Name": "Cedar Realty Trust Inc. 6.50% Series C Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CE",
    "Name": "Celanese Corporation Celanese Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEA",
    "Name": "China Eastern Airlines Corporation Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEE",
    "Name": "The Central and Eastern Europe Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEIX",
    "Name": "CONSOL Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CELP",
    "Name": "Cypress Environmental Partners L.P. Common Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEM",
    "Name": "ClearBridge MLP and Midstream Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEN",
    "Name": "Center Coast Brookfield MLP & Energy Infrastructure Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEPU",
    "Name": "Central Puerto S.A. American Depositary Shares (each represents ten Common Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEQP",
    "Name": "Crestwood Equity Partners LP",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CEQP^",
    "Name": "Crestwood Equity Partners LP Preferred Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CF",
    "Name": "CF Industries Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CFG",
    "Name": "Citizens Financial Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CFG^D",
    "Name": "Citizens Financial Group Inc. Depositary Shares each representing a 1/40th Interest in a Share of 6.350% Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred Stock Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CFG^E",
    "Name": "Citizens Financial Group Inc. Depositary Shares Each Representing 1/40th Interest in a Share of 5.000% Fixed-Rate Non-Cumulative Perpetual Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CFR",
    "Name": "Cullen/Frost Bankers Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CFR^B",
    "Name": "Cullen/Frost Bankers Inc. Depositary Shares each representing a 1/40th ownership interest in a share of 4.450% non-cumulative perpetual preferred stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CFX",
    "Name": "Colfax Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CFXA",
    "Name": "Colfax Corporation 5.75% Tangible Equity Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CGA",
    "Name": "China Green Agriculture Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHCT",
    "Name": "Community Healthcare Trust Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHD",
    "Name": "Church & Dwight Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHE",
    "Name": "Chemed Corp",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHGG",
    "Name": "Chegg Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHH",
    "Name": "Choice Hotels International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHMI",
    "Name": "Cherry Hill Mortgage Investment Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHMI^A",
    "Name": "Cherry Hill Mortgage Investment Corporation 8.20% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHMI^B",
    "Name": "Cherry Hill Mortgage Investment Corporation 8.250% Series B Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHN",
    "Name": "China Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHPT",
    "Name": "ChargePoint Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHRA",
    "Name": "Charah Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHS",
    "Name": "Chico's FAS Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHT",
    "Name": "Chunghwa Telecom Co. Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CHWY",
    "Name": "Chewy Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CI",
    "Name": "Cigna Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIA",
    "Name": "Citizens Inc. Class A Common Stock ($1.00 Par)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIB",
    "Name": "BanColombia S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIEN",
    "Name": "Ciena Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIF",
    "Name": "MFS Intermediate High Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIG",
    "Name": "Comp En De Mn Cemig ADS American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CII",
    "Name": "Blackrock Capital and Income Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIM",
    "Name": "Chimera Investment Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIM^A",
    "Name": "Chimera Investment Corporation 8.00% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIM^B",
    "Name": "Chimera Investment Corporation 8.00% Series B Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIM^C",
    "Name": "Chimera Investment Corporation 7.75% Series C Fixed-to-Floating Rate  Cumulative Redeemable  Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIM^D",
    "Name": "Chimera Investment Corporation 8.00% Series D Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CINR",
    "Name": "Ciner Resources LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIO",
    "Name": "City Office REIT Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIO^A",
    "Name": "City Office REIT Inc. 6.625% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIR",
    "Name": "CIRCOR International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIT",
    "Name": "CIT Group Inc (DEL) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIT^B",
    "Name": "CIT Group Inc (DEL) 5.625 % Non-Cumulative Perpetual Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CIXX",
    "Name": "CI Financial Corp. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CKH",
    "Name": "SEACOR Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CL",
    "Name": "Colgate-Palmolive Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLAS",
    "Name": "Class Acceleration Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLB",
    "Name": "Core Laboratories N.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLDR",
    "Name": "Cloudera Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLDT",
    "Name": "Chatham Lodging Trust (REIT) Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLF",
    "Name": "Cleveland-Cliffs Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLGX",
    "Name": "CoreLogic Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLH",
    "Name": "Clean Harbors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLI",
    "Name": "Mack-Cali Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLII",
    "Name": "Climate Change Crisis Real Impact I Acquisition Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLIM",
    "Name": "Climate Real Impact Solutions II Acquisition Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLNC",
    "Name": "Colony Credit Real Estate Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLNY",
    "Name": "Colony Capital Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLNY^G",
    "Name": "Colony Capital Inc. 7.50% Series G cumulative redeemable perpetual preferred stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLNY^H",
    "Name": "Colony Capital Inc. 7.125% Series H cumulative redeemable perpetual preferred stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLNY^I",
    "Name": "Colony Capital Inc. 7.15% Series I Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLNY^J",
    "Name": "Colony Capital Inc. 7.125% Series J Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLPR",
    "Name": "Clipper Realty Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLR",
    "Name": "Continental Resources Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLS",
    "Name": "Celestica Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLVT",
    "Name": "Clarivate Plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLW",
    "Name": "Clearwater Paper Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CLX",
    "Name": "Clorox Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CM",
    "Name": "Canadian Imperial Bank of Commerce Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMA",
    "Name": "Comerica Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMC",
    "Name": "Commercial Metals Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMCM",
    "Name": "Cheetah Mobile Inc. American Depositary Shares each representing 10 Class Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMD",
    "Name": "Cantel Medical Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMG",
    "Name": "Chipotle Mexican Grill Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMI",
    "Name": "Cummins Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMO",
    "Name": "Capstead Mortgage Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMO^E",
    "Name": "Capstead Mortgage Corporation Pfd Ser E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMP",
    "Name": "Compass Minerals Intl Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMRE",
    "Name": "Costamare Inc. Common Stock $0.0001 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMRE^B",
    "Name": "Costamare Inc. Perpetual Preferred Stock Series B (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMRE^C",
    "Name": "Costamare Inc. Perpetual Preferred Series C (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMRE^D",
    "Name": "Costamare Inc. 8.75% Series D Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMRE^E",
    "Name": "Costamare Inc. 8.875% Series E Cumulative Redeemable Perpetual Preferred Stock par value $0.0001",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMS",
    "Name": "CMS Energy Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMS^B",
    "Name": "CMS Energy Corporation Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMSA",
    "Name": "CMS Energy Corporation 5.625% Junior Subordinated Notes due 2078",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMSC",
    "Name": "CMS Energy Corporation 5.875% Junior Subordinated Notes due 2078",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMSD",
    "Name": "CMS Energy Corporation 5.875% Junior Subordinated Notes due 2079",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CMU",
    "Name": "MFS Municipal Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNA",
    "Name": "CNA Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNC",
    "Name": "Centene Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CND",
    "Name": "Concord Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNF",
    "Name": "CNFinance Holdings Limited American Depositary Shares each representing  twenty (20) Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNHI",
    "Name": "CNH Industrial N.V. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNI",
    "Name": "Canadian National Railway Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNK",
    "Name": "Cinemark Holdings Inc Cinemark Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNMD",
    "Name": "CONMED Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNNE",
    "Name": "Cannae Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNO",
    "Name": "CNO Financial Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNO^A",
    "Name": "CNO Financial Group Inc. 5.125% Subordinated Debentures due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNP",
    "Name": "CenterPoint Energy Inc (Holding Co) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNP^B",
    "Name": "CenterPoint Energy Inc. Depositary Shares Each Representing a 1/20th Interest in a Share of 7.00% Series B Mandatory Convertible Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNQ",
    "Name": "Canadian Natural Resources Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNR",
    "Name": "Cornerstone Building Brands Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNS",
    "Name": "Cohen & Steers Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CNX",
    "Name": "CNX Resources Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CO",
    "Name": "Global Cord Blood Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CODI",
    "Name": "D/B/A Compass Diversified Holdings Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CODI^A",
    "Name": "Compass Diversified Holdings 7.250% Series A Preferred Shares representing beneficial interest in Compass Diversified Holdings",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CODI^B",
    "Name": "Compass Diversified Holdings 7.875% Series B Fixed-to-Floating Rate Cumulative Preferred Shares representing beneficial interests in Compass Diversified Holdings",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CODI^C",
    "Name": "Compass Diversified Holdings 7.875% Series C Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COE",
    "Name": "China Online Education Group American depositary shares each representing 15 Class A ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COF",
    "Name": "Capital One Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COF^G",
    "Name": "Capital One Financial Corporation Depositary Shares Each Representing a 1/40th Interest in a Share of Fixed Rate Non-Cumulative Perpetual Preferred Stock Series G",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COF^H",
    "Name": "Capital One Financial Corporation Depositary Shares Each Representing 1/40th Interest in a Share of Fixed Rate Non-Cumulative Perpetual Preferred Stock Series H",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COF^I",
    "Name": "Capital One Financial Corporation Depositary shares each representing a 1/40th interest in a share of Fixed Rate Non-Cumulative Perpetual Preferred Stock Series I of the Issuer",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COF^J",
    "Name": "Capital One Financial Corporation Depositary Shares Each Representing a 1/40th Interest in a Share of Fixed Rate Non- Cumulative Perpetual Preferred Stock Series J",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COF^K",
    "Name": "Capital One Financial Corporation Depositary Shares Each Representing a 1/40th Ownership Interest in a Share of Fixed Rate Non-Cumulative Perpetual Preferred Stock Series K",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COG",
    "Name": "Cabot Oil & Gas Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COLD",
    "Name": "Americold Realty Trust Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COO",
    "Name": "The Cooper Companies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COP",
    "Name": "ConocoPhillips Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COR",
    "Name": "CoreSite Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CORR",
    "Name": "CorEnergy Infrastructure Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CORR^A",
    "Name": "CorEnergy Infrastructure Trust Inc. Depositary Shares each representing a 1/100th fractional interest of a share of 7.375% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "COTY",
    "Name": "Coty Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CP",
    "Name": "Canadian Pacific Railway Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPA",
    "Name": "Copa Holdings S.A. Copa Holdings S.A. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPAC",
    "Name": "Cementos Pacasmayo S.A.A. American Depositary Shares (Each representing five Common Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPB",
    "Name": "Campbell Soup Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPE",
    "Name": "Callon Petroleum Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPF",
    "Name": "Central Pacific Financial Corp New",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPG",
    "Name": "Crescent Point Energy Corporation Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPK",
    "Name": "Chesapeake Utilities Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPLG",
    "Name": "CorePoint Lodging Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPNG",
    "Name": "Coupang Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPRI",
    "Name": "Capri Holdings Limited Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPS",
    "Name": "Cooper-Standard Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPSR",
    "Name": "Capstar Special Purpose Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CPT",
    "Name": "Camden Property Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CR",
    "Name": "Crane Co. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRC",
    "Name": "California Resources Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRD/A",
    "Name": "Crawford & Company",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRD/B",
    "Name": "Crawford & Company",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRH",
    "Name": "CRH PLC American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRHC",
    "Name": "Cohn Robbins Holdings Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRI",
    "Name": "Carter's Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRK",
    "Name": "Comstock Resources Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRL",
    "Name": "Charles River Laboratories International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRM",
    "Name": "Salesforce.com Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRS",
    "Name": "Carpenter Technology Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRT",
    "Name": "Cross Timbers Royalty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRU",
    "Name": "Crucible Acquisition Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CRY",
    "Name": "CryoLife Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CS",
    "Name": "Credit Suisse Group American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSAN",
    "Name": "Cosan S.A. ADR",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSL",
    "Name": "Carlisle Companies Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSLT",
    "Name": "Castlight Health Inc. Class B Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSPR",
    "Name": "Casper Sleep Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSR",
    "Name": "D/B/A Centerspace Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSR^C",
    "Name": "D/B/A Centerspace 6.625% Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSTA",
    "Name": "Constellation Acquisition Corp I",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSTM",
    "Name": "Constellium SE Ordinary Shares (France)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSU",
    "Name": "Capital Senior Living Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CSV",
    "Name": "Carriage Services Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTA^A",
    "Name": "E.I. du Pont de Nemours and Company Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTA^B",
    "Name": "E.I. du Pont de Nemours and Company Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTAC",
    "Name": "Cerberus Telecom Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTB",
    "Name": "Cooper Tire & Rubber Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTBB",
    "Name": "Qwest Corporation 6.5% Notes due 2056",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTDD",
    "Name": "Qwest Corporation 6.75% Notes due 2057",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTK",
    "Name": "CooTek (Cayman) Inc. American Depositary Shares each representing 50 Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTLT",
    "Name": "Catalent Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTO",
    "Name": "CTO Realty Growth Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTR",
    "Name": "ClearBridge MLP and Midstream Total Return Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTS",
    "Name": "CTS Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTT",
    "Name": "CatchMark Timber Trust Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CTVA",
    "Name": "Corteva Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUB",
    "Name": "Cubic Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUBB",
    "Name": "Customers Bancorp Inc 5.375% Subordinated Notes Due 2034",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUBE",
    "Name": "CubeSmart Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUBI",
    "Name": "Customers Bancorp Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUBI^C",
    "Name": "Customers Bancorp Inc Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUBI^D",
    "Name": "Customers Bancorp Inc Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred Stock Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUBI^E",
    "Name": "Customers Bancorp Inc Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUBI^F",
    "Name": "Customers Bancorp Inc Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred Stock Series F",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUK",
    "Name": "Carnival Plc ADS ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CULP",
    "Name": "Culp Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CURO",
    "Name": "CURO Group Holdings Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CUZ",
    "Name": "Cousins Properties Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CVA",
    "Name": "Covanta Holding Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CVE",
    "Name": "Cenovus Energy Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CVEO",
    "Name": "Civeo Corporation (Canada) Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CVI",
    "Name": "CVR Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CVNA",
    "Name": "Carvana Co. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CVS",
    "Name": "CVS Health Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CVX",
    "Name": "Chevron Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CW",
    "Name": "Curtiss-Wright Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CWEN",
    "Name": "Clearway Energy Inc. Class C Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CWH",
    "Name": "Camping World Holdings Inc. Class A Commom Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CWK",
    "Name": "Cushman & Wakefield plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CWT",
    "Name": "California Water Service Group Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CX",
    "Name": "Cemex S.A.B. de C.V. Sponsored ADR",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CXE",
    "Name": "MFS High Income Municipal Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CXH",
    "Name": "MFS Investment Grade Municipal Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CXP",
    "Name": "Columbia Property Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CXW",
    "Name": "CoreCivic Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CYD",
    "Name": "China Yuchai International Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "CYH",
    "Name": "Community Health Systems Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "D",
    "Name": "Dominion Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DAC",
    "Name": "Danaos Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DAL",
    "Name": "Delta Air Lines Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DAN",
    "Name": "Dana Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DAO",
    "Name": "Youdao Inc. American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DAR",
    "Name": "Darling Ingredients Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DASH",
    "Name": "DoorDash Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DAVA",
    "Name": "Endava plc American Depositary Shares (each representing one Class A Ordinary Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DB",
    "Name": "Deutsche Bank AG Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DBD",
    "Name": "Diebold Nixdorf Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DBI",
    "Name": "Designer Brands Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DBL",
    "Name": "DoubleLine Opportunistic Credit Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DCF",
    "Name": "BNY Mellon Alcentra Global Credit Income 2024 Target Term Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DCI",
    "Name": "Donaldson Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DCO",
    "Name": "Ducommun Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DCP",
    "Name": "DCP Midstream  LP Common Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DCP^B",
    "Name": "DCP Midstream LP 7.875% Series B Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DCP^C",
    "Name": "DCP Midstream LP 7.95% Series C Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DCUE",
    "Name": "Dominion Energy Inc. 2019 Series A Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DD",
    "Name": "DuPont de Nemours Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DDD",
    "Name": "3D Systems Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DDF",
    "Name": "Delaware Investments Dividend & Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DDS",
    "Name": "Dillard's Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DDT",
    "Name": "Dillard's Capital Trust I",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DE",
    "Name": "Deere & Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DEA",
    "Name": "Easterly Government Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DECK",
    "Name": "Deckers Outdoor Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DEH",
    "Name": "D8 Holdings Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DEI",
    "Name": "Douglas Emmett Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DELL",
    "Name": "Dell Technologies Inc. Class C Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DEN",
    "Name": "Denbury Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DEO",
    "Name": "Diageo plc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DESP",
    "Name": "Despegar.com Corp. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DEX",
    "Name": "Delaware Enhanced Global Dividend Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DFIN",
    "Name": "Donnelley Financial Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DFNS",
    "Name": "LGL Systems Acquisition Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DFP",
    "Name": "Flaherty & Crumrine Dynamic Preferred and Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DFS",
    "Name": "Discover Financial Services Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DG",
    "Name": "Dollar General Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DGNR",
    "Name": "Dragoneer Growth Opportunities Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DGX",
    "Name": "Quest Diagnostics Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DHF",
    "Name": "BNY Mellon High Yield Strategies Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DHI",
    "Name": "D.R. Horton Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DHR",
    "Name": "Danaher Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DHR^A",
    "Name": "Danaher Corporation 4.75% Mandatory Convertible Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DHR^B",
    "Name": "Danaher Corporation 5.00% Mandatory Convertible Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DHT",
    "Name": "DHT Holdings Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DHX",
    "Name": "DHI Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DIAX",
    "Name": "Nuveen Dow 30SM Dynamic Overwrite Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DIN",
    "Name": "Dine Brands Global Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DIS",
    "Name": "Walt Disney Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DK",
    "Name": "Delek US Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DKL",
    "Name": "Delek Logistics Partners L.P. Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DKS",
    "Name": "Dick's Sporting Goods Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLB",
    "Name": "Dolby Laboratories Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLNG",
    "Name": "Dynagas LNG Partners LP Common Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLNG^A",
    "Name": "Dynagas LNG Partners LP 9.00% Series A Cumulative Redeemable Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLNG^B",
    "Name": "Dynagas LNG Partners LP 8.75% Series B Fixed to Floating Rate Cumulative Redeemable Perpetual Preferred Units liquidation preference $25.00 per Uni",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLR",
    "Name": "Digital Realty Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLR^C",
    "Name": "Digital Realty Trust Inc. 6.625% Series C Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLR^J",
    "Name": "Digital Realty Trust Inc. 5.250% Series J Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLR^K",
    "Name": "Digital Realty Trust Inc. 5.850% Series K Cumulative Redeemable Preferred Stock par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLR^L",
    "Name": "Digital Realty Trust Inc. 5.200% Series L Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLX",
    "Name": "Deluxe Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DLY",
    "Name": "DoubleLine Yield Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DM",
    "Name": "Desktop Metal Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DMB",
    "Name": "BNY Mellon Municipal Bond Infrastructure Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DMO",
    "Name": "Western Asset Mortgage Opportunity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DMS",
    "Name": "Digital Media Solutions Inc. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DMYD",
    "Name": "dMY Technology Group Inc. II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DMYI",
    "Name": "dMY Technology Group Inc. III Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DNB",
    "Name": "Dun & Bradstreet Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DNMR",
    "Name": "Danimer Scientific Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DNOW",
    "Name": "NOW Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DNP",
    "Name": "DNP Select Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DOC",
    "Name": "Physicians Realty Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DOOR",
    "Name": "Masonite International Corporation Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DOV",
    "Name": "Dover Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DOW",
    "Name": "Dow Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DPG",
    "Name": "Duff & Phelps Utility and Infrastructure Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DPZ",
    "Name": "Domino's Pizza Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DQ",
    "Name": "DAQO New Energy Corp. American Depositary Shares each representing five ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DRD",
    "Name": "DRDGOLD Limited American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DRE",
    "Name": "Duke Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DRH",
    "Name": "Diamondrock Hospitality Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DRH^A",
    "Name": "Diamondrock Hospitality Company 8.250% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DRI",
    "Name": "Darden Restaurants Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DRQ",
    "Name": "Dril-Quip Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DRUA",
    "Name": "Dominion Energy Inc. 2016 Series A 5.25% Enhanced Junior Subordinated Notes due 2076",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DS",
    "Name": "Drive Shack Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DS^B",
    "Name": "Drive Shack Inc. Preferred Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DS^C",
    "Name": "Drive Shack Inc. Preferred Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DS^D",
    "Name": "Drive Shack Inc. Pfd Ser D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DSE",
    "Name": "Duff & Phelps Select MLP and Midstream Energy Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DSL",
    "Name": "DoubleLine Income Solutions Fund Common Shares of Beneficial Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DSM",
    "Name": "BNY Mellon Strategic Municipal Bond Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DSSI",
    "Name": "Diamond S Shipping Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DSU",
    "Name": "Blackrock Debt Strategies Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DSX",
    "Name": "Diana Shipping inc. common stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DSX^B",
    "Name": "Diana Shipping Inc. Perpetual Preferred Shares Series B (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DT",
    "Name": "Dynatrace Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTB",
    "Name": "DTE Energy Company 2020 Series G 4.375% Junior Subordinated Debentures due 2080",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTE",
    "Name": "DTE Energy Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTF",
    "Name": "DTF Tax-Free Income Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTJ",
    "Name": "DTE Energy Company 2016 Series B 5.375% Junior Subordinated Debentures due 2076",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTLA^",
    "Name": "Brookfield DTLA Inc. 7.625% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTP",
    "Name": "DTE Energy Company 6.25% Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTW",
    "Name": "DTE Energy Company 2017 Series E 5.25% Junior Subordinated Debentures due 2077",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DTY",
    "Name": "DTE Energy Company 2016 Series F 6.00% Junior Subordinated Debentures due 2076",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DUK",
    "Name": "Duke Energy Corporation (Holding Company) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DUK^A",
    "Name": "Duke Energy Corporation Depositary Shares each representing a 1/1000th interest in a share of 5.75% Series A Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DUKB",
    "Name": "Duke Energy Corporation 5.625% Junior Subordinated Debentures due 2078",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DUKH",
    "Name": "Duke Energy Corporation 5.125% Junior Subordinated Debentures due 2073",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DVA",
    "Name": "DaVita Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DVD",
    "Name": "Dover Motorsports Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DVN",
    "Name": "Devon Energy Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DWIN",
    "Name": "Delwinds Insurance Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DX",
    "Name": "Dynex Capital Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DX^C",
    "Name": "Dynex Capital Inc. 6.900% Series C Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DXC",
    "Name": "DXC Technology Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DY",
    "Name": "Dycom Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "DYFN",
    "Name": "Angel Oak Dynamic Financial Strategies Income Term Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "E",
    "Name": "ENI S.p.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EAF",
    "Name": "GrafTech International Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EAI",
    "Name": "Entergy Arkansas LLC First Mortgage Bonds 4.875% Series Due September 1 2066",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EARN",
    "Name": "Ellington Residential Mortgage REIT Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EAT",
    "Name": "Brinker International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EB",
    "Name": "Eventbrite Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EBF",
    "Name": "Ennis Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EBR",
    "Name": "Centrais Electricas Brasileiras S A American Depositary Shares (Each representing one Common Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EBS",
    "Name": "Emergent Biosolutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EC",
    "Name": "Ecopetrol S.A. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ECC",
    "Name": "Eagle Point Credit Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ECCB",
    "Name": "Eagle Point Credit Company Inc. 7.75% Series B Term Preferred Stock due 2026",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ECCX",
    "Name": "Eagle Point Credit Company Inc. 6.6875% Notes due 2028",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ECCY",
    "Name": "Eagle Point Credit Company Inc. 6.75% Notes due 2027",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ECL",
    "Name": "Ecolab Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ECOM",
    "Name": "ChannelAdvisor Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ED",
    "Name": "Consolidated Edison Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EDD",
    "Name": "Morgan Stanley Emerging Markets Domestic Debt Fund Inc. Morgan Stanley Emerging Markets Domestic Debt Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EDF",
    "Name": "Stone Harbor Emerging Markets Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EDI",
    "Name": "Stone Harbor Emerging Markets Total Income Fund Common Shares of Beneficial Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EDN",
    "Name": "Empresa Distribuidora Y Comercializadora Norte S.A. (Edenor) Empresa Distribuidora Y Comercializadora Norte S.A. (Edenor) American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EDU",
    "Name": "New Oriental Education & Technology Group Inc. Sponsored ADR representing 1 Ordinary Share (Cayman Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EEA",
    "Name": "The European Equity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EEX",
    "Name": "Emerald Holding Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EFC",
    "Name": "Ellington Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EFC^A",
    "Name": "Ellington Financial Inc. 6.750% Series A Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EFF",
    "Name": "Eaton vance Floating-Rate Income Plus Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EFL",
    "Name": "Eaton Vance Floating-Rate 2022 Target Term Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EFR",
    "Name": "Eaton Vance Senior Floating-Rate Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EFT",
    "Name": "Eaton Vance Floating Rate Income Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EFX",
    "Name": "Equifax Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EGF",
    "Name": "Blackrock Enhanced Government Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EGHT",
    "Name": "8x8 Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EGO",
    "Name": "Eldorado Gold Corporation Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EGP",
    "Name": "EastGroup Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EGY",
    "Name": "VAALCO Energy Inc.  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EHC",
    "Name": "Encompass Health Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EHI",
    "Name": "Western Asset Global High Income Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EHT",
    "Name": "Eaton Vance 2021 Target Term Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EIC",
    "Name": "Eagle Point Income Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EIG",
    "Name": "Employers Holdings Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EIX",
    "Name": "Edison International Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EL",
    "Name": "Estee Lauder Companies Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELAN",
    "Name": "Elanco Animal Health Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELAT",
    "Name": "Elanco Animal Health Incorporated 5.00% Tangible Equity Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELC",
    "Name": "Entergy Louisiana Inc. Collateral Trust Mortgage Bonds 4.875 % Series due September 1 2066",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELF",
    "Name": "e.l.f. Beauty Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELP",
    "Name": "Companhia Paranaense de Energia (COPEL) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELS",
    "Name": "Equity Lifestyle Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELVT",
    "Name": "Elevate Credit Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ELY",
    "Name": "Callaway Golf Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EMD",
    "Name": "Western Asset Emerging Markets Debt Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EME",
    "Name": "EMCOR Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EMF",
    "Name": "Templeton Emerging Markets Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EMN",
    "Name": "Eastman Chemical Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EMO",
    "Name": "ClearBridge Energy Midstream Opportunity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EMP",
    "Name": "Entergy Mississippi LLC First Mortgage Bonds 4.90% Series Due October 1 2066",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EMPW",
    "Name": "Empower Ltd. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EMR",
    "Name": "Emerson Electric Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENB",
    "Name": "Enbridge Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENBA",
    "Name": "Enbridge Inc 6.375% Fixed-to-Floating Rate Subordinated Notes Series 2018-B due 2078",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENBL",
    "Name": "Enable Midstream Partners LP Common Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENIA",
    "Name": "Enel Americas S.A. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENIC",
    "Name": "Enel Chile S.A. American Depositary Shares (Each representing 50 shares of Common Stock)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENJ",
    "Name": "Entergy New Orleans LLC First Mortgage Bonds 5.0% Series due December 1 2052",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENLC",
    "Name": "EnLink Midstream LLC Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENO",
    "Name": "Entergy New Orleans LLC First Mortgage Bonds 5.50% Series due April 1 2066",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENPC",
    "Name": "Executive Network Partnering Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENR",
    "Name": "Energizer Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENR^A",
    "Name": "Energizer Holdings Inc. 7.50% Series A Mandatory Convertible Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENS",
    "Name": "EnerSys Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENV",
    "Name": "Envestnet Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENVA",
    "Name": "Enova International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ENZ",
    "Name": "Enzo Biochem Inc. Common Stock ($0.01 Par Value)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EOD",
    "Name": "Wells Fargo Global Dividend Opportunity Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EOG",
    "Name": "EOG Resources Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EOI",
    "Name": "Eaton Vance Enhance Equity Income Fund Eaton Vance Enhanced Equity Income Fund Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EOS",
    "Name": "Eaton Vance Enhance Equity Income Fund II Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EOT",
    "Name": "Eaton Vance Municipal Income Trust EATON VANCE NATIONAL MUNICIPAL OPPORTUNITIES TRUST",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EP^C",
    "Name": "El Paso Corporation Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPAC",
    "Name": "Enerpac Tool Group Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPAM",
    "Name": "EPAM Systems Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPC",
    "Name": "Edgewell Personal Care Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPD",
    "Name": "Enterprise Products Partners L.P. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPR",
    "Name": "EPR Properties Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPR^C",
    "Name": "EPR Properties 5.75% Series C Cumulative Convertible Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPR^E",
    "Name": "EPR Properties Series E Cumulative Conv Pfd Shs Ser E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPR^G",
    "Name": "EPR Properties 5.750% Series G Cumulative Redeemable Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPRT",
    "Name": "Essential Properties Realty Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EPWR",
    "Name": "Empowerment & Inclusion Capital I Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQC",
    "Name": "Equity Commonwealth Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQC^D",
    "Name": "Equity Commonwealth 6.50% Pfd Conv Shs Ser D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQD",
    "Name": "Equity Distribution Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQH",
    "Name": "Equitable Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQH^A",
    "Name": "Equitable Holdings Inc. Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQH^C",
    "Name": "Equitable Holdings Inc. Depositary Shares each representing a 1/1000th interest in a share of Fixed Rate Noncumulative Perpetual Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQNR",
    "Name": "Equinor ASA",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQR",
    "Name": "Equity Residential Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQS",
    "Name": "Equus Total Return Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EQT",
    "Name": "EQT Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ERF",
    "Name": "Enerplus Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ERJ",
    "Name": "Embraer S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ES",
    "Name": "Eversource Energy (D/B/A) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESE",
    "Name": "ESCO Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESGC",
    "Name": "Eros STX Global Corporation A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESI",
    "Name": "Element Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESNT",
    "Name": "Essent Group Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESRT",
    "Name": "Empire State Realty Trust Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESS",
    "Name": "Essex Property Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESTC",
    "Name": "Elastic N.V. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ESTE",
    "Name": "Earthstone Energy Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ET",
    "Name": "Energy Transfer LP Common Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETB",
    "Name": "Eaton Vance Tax-Managed Buy-Write Income Fund Eaton Vance Tax-Managed Buy-Write Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETG",
    "Name": "Eaton Vance Tax-Advantaged Global Dividend Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETH",
    "Name": "Ethan Allen Interiors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETI^",
    "Name": "Entergy Texas Inc 5.375% Series A Preferred Stock Cumulative No Par Value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETJ",
    "Name": "Eaton Vance Risk-Managed Diversified Equity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETM",
    "Name": "Entercom Communications Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETN",
    "Name": "Eaton Corporation PLC Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETO",
    "Name": "Eaton Vance Tax-Advantage Global Dividend Opp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETP^C",
    "Name": "Energy Transfer Operating L.P. Series C Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETP^D",
    "Name": "Energy Transfer Operating L.P. 7.625% Series D Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETP^E",
    "Name": "Energy Transfer Operating L.P. Series E Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETR",
    "Name": "Entergy Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETRN",
    "Name": "Equitrans Midstream Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETV",
    "Name": "Eaton Vance Corporation Eaton Vance Tax-Managed Buy-Write Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETW",
    "Name": "Eaton Vance Corporation Eaton Vance Tax-Managed Global Buy-Write Opportunites Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETWO",
    "Name": "E2open Parent Holdings Inc.Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETX",
    "Name": "Eaton Vance Municipal Income 2028 Term Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ETY",
    "Name": "Eaton Vance Tax-Managed Diversified Equity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EURN",
    "Name": "Euronav NV Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVA",
    "Name": "Enviva Partners LP Common units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVC",
    "Name": "Entravision Communications Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVF",
    "Name": "Eaton Vance Senior Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVG",
    "Name": "Eaton Vance Short Diversified Income Fund Eaton Vance Short Duration Diversified Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVH",
    "Name": "Evolent Health Inc Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVN",
    "Name": "Eaton Vance Municipal Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVR",
    "Name": "Evercore Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVRG",
    "Name": "Evergy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVRI",
    "Name": "Everi Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVT",
    "Name": "Eaton Vance Tax Advantaged Dividend Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EVTC",
    "Name": "Evertec Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EW",
    "Name": "Edwards Lifesciences Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EXD",
    "Name": "Eaton Vance Tax-Managed Buy-Write Strategy Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EXG",
    "Name": "Eaton Vance Tax-Managed Global Diversified Equity Income Fund Eaton Vance Tax-Managed Global Diversified Equity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EXK",
    "Name": "Endeavour Silver Corporation Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EXP",
    "Name": "Eagle Materials Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EXPR",
    "Name": "Express Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EXR",
    "Name": "Extra Space Storage Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "EXTN",
    "Name": "Exterran Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "F",
    "Name": "Ford Motor Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "F^B",
    "Name": "Ford Motor Company 6.20% Notes due June 1 2059",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "F^C",
    "Name": "Ford Motor Company 6% Notes due December 1 2059",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FAF",
    "Name": "First American Corporation (New) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FAII",
    "Name": "Fortress Value Acquisition Corp. II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FAM",
    "Name": "First Trust/Aberdeen Global Opportunity Income Fund First Trust/Aberdeen Global Opportunity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FBC",
    "Name": "Flagstar Bancorp Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FBHS",
    "Name": "Fortune Brands Home & Security Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FBK",
    "Name": "FB Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FBP",
    "Name": "First BanCorp. New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FC",
    "Name": "Franklin Covey Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FCAX",
    "Name": "Fortress Capital Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FCF",
    "Name": "First Commonwealth Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FCN",
    "Name": "FTI Consulting Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FCPT",
    "Name": "Four Corners Property Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FCRW",
    "Name": "First Eagle Alternative Capital BDC Inc. 6.125% Notes Due 2023",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FCT",
    "Name": "First Trust Senior Floating Rate Income Fund II Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FCX",
    "Name": "Freeport-McMoRan Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FDEU",
    "Name": "First Trust Dynamic Europe Equity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FDP",
    "Name": "Fresh Del Monte Produce Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FDX",
    "Name": "FedEx Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FE",
    "Name": "FirstEnergy Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FEDU",
    "Name": "Four Seasons Education (Cayman) Inc. American Depositary Shares each two ADSs representing one ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FEI",
    "Name": "First Trust MLP and Energy Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FENG",
    "Name": "Phoenix New Media Limited American Depositary Shares each representing 8 Class A ordinary shares.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FEO",
    "Name": "First Trust/Aberdeen Emerging Opportunity Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FERG",
    "Name": "Ferguson plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FET",
    "Name": "Forum Energy Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FF",
    "Name": "FutureFuel Corp.  Common shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FFA",
    "Name": "First Trust Enhanced Equity Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FFC",
    "Name": "Flaherty & Crumrine Preferred and Income Securities Fund Incorporated",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FFG",
    "Name": "FBL Financial Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FGB",
    "Name": "First Trust Specialty Finance and Financial Opportunities Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FGNA",
    "Name": "FG New America Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHI",
    "Name": "Federated Hermes Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHN",
    "Name": "First Horizon Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHN^A",
    "Name": "First Horizon Corporation Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHN^B",
    "Name": "First Horizon Corporation Depositary Shares each representing a 1/400th interest in a share of Non-Cumulative Perpetual Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHN^C",
    "Name": "First Horizon Corporation Depositary Shares each representing a 1/400th interest in a share of Non-Cumulative Perpetual Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHN^D",
    "Name": "First Horizon Corporation Depositary Shares each representing a 1/400th interest in a share of Non-Cumulative Perpetual Preferred Stock Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHN^E",
    "Name": "First Horizon Corporation Depositary Shares each representing a 1/4000th interest in a share of Non-Cumulative Perpetual Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FHS",
    "Name": "First High-School Education Group Co. Ltd. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FI",
    "Name": "Frank's International N.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FICO",
    "Name": "Fair Isaac Corproation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FIF",
    "Name": "First Trust Energy Infrastructure Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FINS",
    "Name": "Angel Oak Financial Strategies Income Term Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FINV",
    "Name": "FinVolution Group American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FIS",
    "Name": "Fidelity National Information Services Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FIV",
    "Name": "First Trust Senior Floating Rate 2022 Target Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FIX",
    "Name": "Comfort Systems USA Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FL",
    "Name": "Foot Locker Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLC",
    "Name": "Flaherty & Crumrine Total Return Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLNG",
    "Name": "FLEX LNG Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLO",
    "Name": "Flowers Foods Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLOW",
    "Name": "SPX FLOW Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLR",
    "Name": "Fluor Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLS",
    "Name": "Flowserve Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLT",
    "Name": "FleetCor Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FLY",
    "Name": "Fly Leasing Limited",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FMAC",
    "Name": "FirstMark Horizon Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FMC",
    "Name": "FMC Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FMN",
    "Name": "Federated Hermes Premier Municipal Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FMO",
    "Name": "Fiduciary/Claymore Energy Infrastructure Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FMS",
    "Name": "Fresenius Medical Care AG Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FMX",
    "Name": "Fomento Economico Mexicano S.A.B. de C.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FMY",
    "Name": "First Trust Motgage Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FN",
    "Name": "Fabrinet Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FNB",
    "Name": "F.N.B. Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FNB^E",
    "Name": "F.N.B. Corporation Depositary Shares each representing a 1/40th interest in a share of Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred  Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FND",
    "Name": "Floor & Decor Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FNF",
    "Name": "FNF Group of Fidelity National Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FNV",
    "Name": "Franco-Nevada Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FOE",
    "Name": "Ferro Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FOF",
    "Name": "Cohen & Steers Closed-End Opportunity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FOR",
    "Name": "Forestar Group Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FOUR",
    "Name": "Shift4 Payments Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FPAC",
    "Name": "Far Peak Acquisition Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FPF",
    "Name": "First Trust Intermediate Duration Preferred & Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FPH",
    "Name": "Five Point Holdings LLC Class A Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FPI",
    "Name": "Farmland Partners Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FPI^B",
    "Name": "Farmland Partners Inc. Series B Participating Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FPL",
    "Name": "First Trust New Opportunities MLP & Energy Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FR",
    "Name": "First Industrial Realty Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRA",
    "Name": "Blackrock Floating Rate Income Strategies Fund Inc  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRC",
    "Name": "FIRST REPUBLIC BANK Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRC^G",
    "Name": "FIRST REPUBLIC BANK Depositary Shares each representing a 1/40th interest in a share of 5.50% Noncumulative Perpetual Series G Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRC^H",
    "Name": "FIRST REPUBLIC BANK Depositary Shares each representing a 1/40th interest in a share of 5.125% Noncumulative Perpetual Series H Preferred Stock par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRC^I",
    "Name": "FIRST REPUBLIC BANK Depositary Shares each representing a 1/40th interest in a share of 5.50% Noncumulative Perpetual Series I Preferred Stock par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRC^J",
    "Name": "FIRST REPUBLIC BANK Depositary Shares Each Representing a 1/40th Interest in a Share of 4.70% Noncumulative Perpetual Series J Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRC^K",
    "Name": "FIRST REPUBLIC BANK Depositary Shares Each Representing a 1/40th Interest in a Share of 4.125% Noncumulative Perpetual Series K Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRC^L",
    "Name": "FIRST REPUBLIC BANK Depositary Shares Each Representing a 1/40th Interest in a Share of 4.250% Noncumulative Perpetual Series L Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRO",
    "Name": "Frontline Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRT",
    "Name": "Federal Realty Investment Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRT^C",
    "Name": "Federal Realty Investment Trust Depositary Shares each representing a 1/1000th interest in a 5.000% Series C Cumulative Redeemable Preferred Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FRX",
    "Name": "Forest Road Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSD",
    "Name": "First Trust High Income Long Short Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSK",
    "Name": "FS KKR Capital Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSKR",
    "Name": "FS KKR Capital Corp. II Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSLF",
    "Name": "First Eagle Senior Loan Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSLY",
    "Name": "Fastly Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSM",
    "Name": "Fortuna Silver Mines Inc Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSR",
    "Name": "Fisker Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FSS",
    "Name": "Federal Signal Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FST",
    "Name": "FAST Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FT",
    "Name": "Franklin Universal Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTAI",
    "Name": "Fortress Transportation and Infrastructure Investors LLC Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTAI^A",
    "Name": "Fortress Transportation and Infrastructure Investors LLC 8.25% Fixed to Floating Rate Series A Cumulative Perpetual Redeemable Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTAI^B",
    "Name": "Fortress Transportation and Infrastructure Investors LLC 8.00% Fixed-to-Floating Rate Series B Cumulative Perpetual Redeemable Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTCH",
    "Name": "Farfetch Limited Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTHY",
    "Name": "First Trust High Yield Opportunities 2027 Term Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTI",
    "Name": "TechnipFMC plc Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTK",
    "Name": "Flotek Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTS",
    "Name": "Fortis Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTV",
    "Name": "Fortive Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FTV^A",
    "Name": "Fortive Corporation 5.00% Mandatory Convertible Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FUBO",
    "Name": "fuboTV Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FUL",
    "Name": "H. B. Fuller Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FUN",
    "Name": "Cedar Fair L.P. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FUSE",
    "Name": "Fusion Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FVRR",
    "Name": "Fiverr International Ltd. Ordinary Shares no par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "FVT",
    "Name": "Fortress Value Acquisition Corp. III Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "G",
    "Name": "Genpact Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GAB",
    "Name": "Gabelli Equity Trust Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GAB^G",
    "Name": "Gabelli Equity Trust Inc. (The) Series G Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GAB^H",
    "Name": "Gabelli Equity Trust Inc. (The) Pfd Ser H",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GAB^J",
    "Name": "Gabelli Equity Trust Inc. (The) 5.45% Series J Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GAB^K",
    "Name": "Gabelli Equity Trust Inc. (The) 5.00% Series K Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GAM",
    "Name": "General American Investors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GAM^B",
    "Name": "General American Investors Company Inc. Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GATO",
    "Name": "Gatos Silver Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GATX",
    "Name": "GATX Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GB",
    "Name": "Global Blue Group Holding AG Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GBAB",
    "Name": "Guggenheim Taxable Municipal Bond & Investment Grade Debt Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GBL",
    "Name": "Gamco Investors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GBX",
    "Name": "Greenbrier Companies Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GCI",
    "Name": "Gannett Co. Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GCO",
    "Name": "Genesco Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GCP",
    "Name": "GCP Applied Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GCV",
    "Name": "Gabelli Convertible and Income Securities Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GD",
    "Name": "General Dynamics Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDDY",
    "Name": "GoDaddy Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDL",
    "Name": "GDL Fund The Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDL^C",
    "Name": "The GDL Fund Series C Cumulative Puttable and Callable Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDO",
    "Name": "Western Asset Global Corporate Defined Opportunity Fund Inc. Western Asset Global Corporate Defined Opportunity Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDOT",
    "Name": "Green Dot Corporation Class A Common Stock $0.001 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDV",
    "Name": "Gabelli Dividend & Income Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDV^G",
    "Name": "Gabelli Dividend 5.25% Series G Cumulative Preferred Shares par value $0.001 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GDV^H",
    "Name": "The Gabelli Dividend & Income Trust 5.375% Series H Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GE",
    "Name": "General Electric Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GEF",
    "Name": "Greif Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GEL",
    "Name": "Genesis Energy L.P. Common Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GEN",
    "Name": "Genesis Healthcare Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GEO",
    "Name": "Geo Group Inc (The) REIT",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GER",
    "Name": "Goldman Sachs MLP Energy Renaissance Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GES",
    "Name": "Guess? Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GF",
    "Name": "New Germany Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GFF",
    "Name": "Griffon Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GFI",
    "Name": "Gold Fields Limited American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GFL",
    "Name": "GFL Environmental Inc. Subordinate voting shares no par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GFLU",
    "Name": "GFL Environmental Inc. Tangible Equity Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GFX",
    "Name": "Golden Falcon Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGB",
    "Name": "Gerdau S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGG",
    "Name": "Graco Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGM",
    "Name": "Guggenheim Credit Allocation Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGT",
    "Name": "Gabelli Multi-Media Trust Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGT^E",
    "Name": "Gabelli Multi-Media Trust Inc. (The) 5.125% Series E Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGT^G",
    "Name": "Gabelli Multi-Media Trust Inc. (The) 5.125% Series G Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGZ",
    "Name": "Gabelli Global Small and Mid Cap Value Trust (The) Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GGZ^A",
    "Name": "Gabelli Global Small and Mid Cap Value Trust (The) 5.450% Series A Cumulative Preferred Shares (Liquidation Preference $25.00 per share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GHC",
    "Name": "Graham Holdings Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GHG",
    "Name": "GreenTree Hospitality Group Ltd. American depositary shares each representing one Class A ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GHL",
    "Name": "Greenhill & Co. Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GHLD",
    "Name": "Guild Holdings Company Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GHM",
    "Name": "Graham Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GHY",
    "Name": "PGIM Global High Yield Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GIB",
    "Name": "CGI Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GIK",
    "Name": "GigCapital3 Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GIL",
    "Name": "Gildan Activewear Inc. Class A Sub. Vot. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GIM",
    "Name": "Templeton Global Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GIS",
    "Name": "General Mills Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GIX",
    "Name": "GigCapital2 Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GJH",
    "Name": "Synthetic Fixed-Income Securities Inc 6.375% (STRATS) Cl A-1",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GJO",
    "Name": "Synthetic Fixed-Income Securities Inc. Synthetic Fixed-Income Securities Inc. on behalf of STRATS(SM) Trust for Wal-Mart Stores Inc. Securities Series 2004-5",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GJP",
    "Name": "Synthetic Fixed-Income Securities Inc. Synthetic Fixed-Income Securities Inc. on behalf of STRATS (SM) Trust for Dominion Resources Inc. Securities Series 2005-6 Floating Rate Structured Repackaged Asset-Backed Trust Securities (STRATS) Certificates",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GJR",
    "Name": "Synthetic Fixed-Income Securities Inc. STRATS Trust for Procter&Gamble Securities Series 2006-1",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GJS",
    "Name": "Goldman Sachs Group Securities STRATS Trust for Goldman Sachs Group Securities Series 2006-2",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GJT",
    "Name": "Synthetic Fixed-Income Securities Inc. Synthetic Fixed-Income Securities Inc. Floating Rate Structured Repackaged Asset-Backed Trust Securities Certificates Series 2006-3",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GKOS",
    "Name": "Glaukos Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GL",
    "Name": "Globe Life Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GL^C",
    "Name": "Globe Life Inc. 6.125% Junior Subordinated Debentures due 2056",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLEO",
    "Name": "Galileo Acquisition Corp. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLOB",
    "Name": "Globant S.A. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLOG",
    "Name": "GasLog Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLOG^A",
    "Name": "GasLog LP. 8.75% Series A Cumulative Redeemable Perpetual Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLOP",
    "Name": "GasLog Partners LP Common Units representing limited partnership interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLOP^A",
    "Name": "GasLog Partners LP 8.625% Series A Cumulative Redeemable Perpetual Fixed to Floating Rate Preference Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLOP^B",
    "Name": "GasLog Partners LP 8.200% Series B Cumulative Redeemable Perpetual Fixed to Floating Rate Preference Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLOP^C",
    "Name": "GasLog Partners LP 8.500% Series C Cumulative Redeemable Perpetual Fixed to Floating Rate Preference Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLP",
    "Name": "Global Partners LP Global Partners LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLP^A",
    "Name": "Global Partners LP 9.75% Series A Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLT",
    "Name": "Glatfelter Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GLW",
    "Name": "Corning Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GM",
    "Name": "General Motors Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GME",
    "Name": "GameStop Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GMED",
    "Name": "Globus Medical Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GMRE",
    "Name": "Global Medical REIT Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GMRE^A",
    "Name": "Global Medical REIT Inc. Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GMS",
    "Name": "GMS Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GMTA",
    "Name": "GATX Corporation 5.625% Senior Notes due 2066",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNE",
    "Name": "Genie Energy Ltd. Class B Common Stock Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNE^A",
    "Name": "Genie Energy Ltd. Series 2012 - A Preferred Stock $0.01 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNK",
    "Name": "Genco Shipping & Trading Limited Ordinary Shares New (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNL",
    "Name": "Global Net Lease Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNL^A",
    "Name": "Global Net Lease Inc. 7.25% Series A Cumulative Redeemable Preferred Stock $0.01 par value per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNL^B",
    "Name": "Global Net Lease Inc. 6.875% Series B Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNPK",
    "Name": "Genesis Park Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNRC",
    "Name": "Generac Holdlings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNT",
    "Name": "GAMCO Natural Resources Gold & Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNT^A",
    "Name": "GAMCO Natural Resources Gold & Income Tust  5.20% Series A Cumulative Preferred Shares (Liquidation Preference $25.00 per share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GNW",
    "Name": "Genworth Financial Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GOAC",
    "Name": "GO Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GOF",
    "Name": "Guggenheim Strategic Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GOL",
    "Name": "Gol Linhas Aereas Inteligentes S.A. Sponsored ADR representing 2 Pfd Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GOLD",
    "Name": "Barrick Gold Corporation Common Stock (BC)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GOLF",
    "Name": "Acushnet Holdings Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GOOS",
    "Name": "Canada Goose Holdings Inc. Subordinate Voting Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPC",
    "Name": "Genuine Parts Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPI",
    "Name": "Group 1 Automotive Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPJA",
    "Name": "Georgia Power Company Series 2017A 5.00% Junior Subordinated Notes due October 1 2077",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPK",
    "Name": "Graphic Packaging Holding Company",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPM",
    "Name": "Guggenheim Enhanced Equity Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPMT",
    "Name": "Granite Point Mortgage Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPN",
    "Name": "Global Payments Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPRK",
    "Name": "Geopark Ltd Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPS",
    "Name": "Gap Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GPX",
    "Name": "GP Strategies Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GRA",
    "Name": "W.R. Grace & Co. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GRC",
    "Name": "Gorman-Rupp Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GRUB",
    "Name": "GrubHub Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GRX",
    "Name": "The Gabelli Healthcare & Wellness Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GS",
    "Name": "Goldman Sachs Group Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GS^A",
    "Name": "Goldman Sachs Group Inc. (The) Depositary Shares each representing 1/1000th Interest in a Share of Floating Rate Non-Cumulative Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GS^C",
    "Name": "Goldman Sachs Group Inc. (The) Depositary Share repstg 1/1000th Preferred Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GS^D",
    "Name": "Goldman Sachs Group Inc. (The) Dep Shs repstg 1/1000 Pfd Ser D Fltg",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GS^J",
    "Name": "Goldman Sachs Group Inc Depositary Shs Repstg 1/1000th Pfd Ser J Fixed to Fltg Rate",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GS^K",
    "Name": "Goldman Sachs Group Inc. (The) Dep Shs Repstg 1/1000 Int Sh Fxd/Fltg Non Cum Pfd Stk Ser K",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GS^N",
    "Name": "Goldman Sachs Group Inc. (The) Depositary Shares Each Representing 1/1000th Interest in a Share of 6.30% Non-Cumulative Preferred Stock Series N",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GSAH",
    "Name": "GS Acquisition Holdings Corp II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GSBD",
    "Name": "Goldman Sachs BDC Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GSK",
    "Name": "GlaxoSmithKline PLC Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GSL",
    "Name": "Global Ship Lease Inc New Class A Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GSL^B",
    "Name": "Global Ship Lease Inc. Depository Shares Representing 1/100th Perpetual Preferred Series B% (Marshall Island)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GSLD",
    "Name": "Global Ship Lease Inc. 8.00% Senior Notes due 2024",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GSX",
    "Name": "GSX Techedu Inc. American Depositary Shares three of which representing two Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GTES",
    "Name": "Gates Industrial Corporation plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GTLS",
    "Name": "Chart Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GTN",
    "Name": "Gray Television Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GTS",
    "Name": "Triple-S Management Corporation Class B Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GTT",
    "Name": "GTT Communications Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GTY",
    "Name": "Getty Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GUT",
    "Name": "Gabelli Utility Trust (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GUT^A",
    "Name": "Gabelli Utility Trust (The) 5.625% Series A Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GUT^C",
    "Name": "Gabelli Utility Trust (The) 5.375% Series C Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GVA",
    "Name": "Granite Construction Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GWB",
    "Name": "Great Western Bancorp Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GWRE",
    "Name": "Guidewire Software Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "GWW",
    "Name": "W.W. Grainger Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "H",
    "Name": "Hyatt Hotels Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HAE",
    "Name": "Haemonetics Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HAL",
    "Name": "Halliburton Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HASI",
    "Name": "Hannon Armstrong Sustainable Infrastructure Capital Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HAYW",
    "Name": "Hayward Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HBB",
    "Name": "Hamilton Beach Brands Holding Company Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HBI",
    "Name": "Hanesbrands Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HBM",
    "Name": "Hudbay Minerals Inc. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HCA",
    "Name": "HCA Healthcare Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HCC",
    "Name": "Warrior Met Coal Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HCHC",
    "Name": "HC2 Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HCI",
    "Name": "HCI Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HCXY",
    "Name": "Hercules Capital Inc. 6.25% Notes due 2033",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HCXZ",
    "Name": "Hercules Capital Inc. 5.25% Notes due 2025",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HD",
    "Name": "Home Depot Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HDB",
    "Name": "HDFC Bank Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HE",
    "Name": "Hawaiian Electric Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HEI",
    "Name": "Heico Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HEI/A",
    "Name": "Heico Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HEP",
    "Name": "Holly Energy Partners L.P. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HEQ",
    "Name": "John Hancock Hedged Equity & Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HES",
    "Name": "Hess Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HESM",
    "Name": "Hess Midstream LP Class A Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HEXO",
    "Name": "HEXO Corp. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HFC",
    "Name": "HollyFrontier Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HFRO",
    "Name": "Highland Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HFRO^A",
    "Name": "Highland Income Fund 5.375% Series A Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HGH",
    "Name": "Hartford Financial Services Group Inc. (The) 7.875% Fixed to Floating Rate Junior Subordinated Debentures due 2042",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HGLB",
    "Name": "Highland Global Allocation Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HGV",
    "Name": "Hilton Grand Vacations Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HHC",
    "Name": "Howard Hughes Corporation (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HI",
    "Name": "Hillenbrand Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIE",
    "Name": "Miller/Howard High Income Equity Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIG",
    "Name": "Hartford Financial Services Group Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIG^G",
    "Name": "Hartford Financial Services Group Inc. (The) Depositary Shares each representing a 1/1000th interest in a share of 6.000% Non-Cumulative Preferred Stock Series G $0.01 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIGA",
    "Name": "H.I.G. Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HII",
    "Name": "Huntington Ingalls Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIL",
    "Name": "Hill International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIMS",
    "Name": "Hims & Hers Health Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIO",
    "Name": "Western Asset High Income Opportunity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIW",
    "Name": "Highwoods Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HIX",
    "Name": "Western Asset High Income Fund II Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HKIB",
    "Name": "AMTD International Inc. American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HL",
    "Name": "Hecla Mining Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HL^B",
    "Name": "Hecla Mining Company Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HLF",
    "Name": "Herbalife Nutrition Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HLI",
    "Name": "Houlihan Lokey Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HLT",
    "Name": "Hilton Worldwide Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HLX",
    "Name": "Helix Energy Solutions Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HMC",
    "Name": "Honda Motor Company Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HMLP",
    "Name": "Hoegh LNG Partners LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HMLP^A",
    "Name": "Hoegh LNG Partners LP 8.75% Series A Cumulative Redeemable Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HMN",
    "Name": "Horace Mann Educators Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HMY",
    "Name": "Harmony Gold Mining Company Limited",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HNGR",
    "Name": "Hanger Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HNI",
    "Name": "HNI Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HNP",
    "Name": "Huaneng Power Intl Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HOG",
    "Name": "Harley-Davidson Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HOME",
    "Name": "At Home Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HON",
    "Name": "Honeywell International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HOV",
    "Name": "Hovnanian Enterprises Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HP",
    "Name": "Helmerich & Payne Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPE",
    "Name": "Hewlett Packard Enterprise Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPF",
    "Name": "John Hancock Pfd Income Fund II Pfd Income Fund II",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPI",
    "Name": "John Hancock Preferred Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPP",
    "Name": "Hudson Pacific Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPQ",
    "Name": "HP Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPR",
    "Name": "HighPoint Resources Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPS",
    "Name": "John Hancock Preferred Income Fund III Preferred Income Fund III",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HPX",
    "Name": "HPX Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HQH",
    "Name": "Tekla Healthcare Investors Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HQL",
    "Name": "TeklaLife Sciences Investors Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HR",
    "Name": "Healthcare Realty Trust Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HRB",
    "Name": "H&R Block Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HRC",
    "Name": "Hill-Rom Holdings Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HRI",
    "Name": "Herc Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HRL",
    "Name": "Hormel Foods Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HRTG",
    "Name": "Heritage Insurance Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HSBC",
    "Name": "HSBC Holdings plc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HSC",
    "Name": "Harsco Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HSY",
    "Name": "The Hershey Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HT",
    "Name": "Hersha Hospitality Trust Class A Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HT^C",
    "Name": "Hersha Hospitality Trust 6.875% Series C Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HT^D",
    "Name": "Hersha Hospitality Trust 6.50% Series D Cumulative Redeemable Preferred Shares of Beneficial Interest $0.01 par value per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HT^E",
    "Name": "Hersha Hospitality Trust 6.50% Series E Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HTA",
    "Name": "Healthcare Trust of America Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HTD",
    "Name": "John Hancock Tax Advantaged Dividend Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HTFA",
    "Name": "Horizon Technology Finance Corporation 6.25% Notes due 2022",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HTGC",
    "Name": "Hercules Capital Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HTH",
    "Name": "Hilltop Holdings Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HTPA",
    "Name": "Highland Transcend Partners I Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HTY",
    "Name": "John Hancock Tax-Advantaged Global Shareholder Yield Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HUBB",
    "Name": "Hubbell Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HUBS",
    "Name": "HubSpot Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HUM",
    "Name": "Humana Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HUN",
    "Name": "Huntsman Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HUYA",
    "Name": "HUYA Inc. American depositary shares each  representing one Class A ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HVT",
    "Name": "Haverty Furniture Companies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HVT/A",
    "Name": "Haverty Furniture Companies Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HWM",
    "Name": "Howmet Aerospace Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HXL",
    "Name": "Hexcel Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HY",
    "Name": "Hyster-Yale Materials Handling Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HYB",
    "Name": "New America High Income Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HYI",
    "Name": "Western Asset High Yield Defined Opportunity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HYLN",
    "Name": "Hyliion Holdings Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HYT",
    "Name": "Blackrock Corporate High Yield Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HZAC",
    "Name": "Horizon Acquisition Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HZN",
    "Name": "Horizon Global Corporation Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HZO",
    "Name": "MarineMax Inc.  (FL) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "HZON",
    "Name": "Horizon Acquisition Corporation II Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IAA",
    "Name": "IAA Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IACA",
    "Name": "ION Acquisition Corp 1 Ltd. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IAE",
    "Name": "Voya Asia Pacific High Dividend Equity Income Fund ING Asia Pacific High Dividend Equity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IAG",
    "Name": "Iamgold Corporation Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IBA",
    "Name": "Industrias Bachoco S.A.B. de C.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IBM",
    "Name": "International Business Machines Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IBN",
    "Name": "ICICI Bank Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IBP",
    "Name": "Installed Building Products Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ICD",
    "Name": "Independence Contract Drilling Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ICE",
    "Name": "Intercontinental Exchange Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ICL",
    "Name": "ICL Group Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IDA",
    "Name": "IDACORP Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IDE",
    "Name": "Voya Infrastructure Industrials and Materials Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IDT",
    "Name": "IDT Corporation Class B Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IEX",
    "Name": "IDEX Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IFF",
    "Name": "Internationa Flavors & Fragrances Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IFFT",
    "Name": "International Flavors & Fragrances Inc. 6.00% Tangible Equity Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IFN",
    "Name": "India Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IFS",
    "Name": "Intercorp Financial Services Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IGA",
    "Name": "Voya Global Advantage and Premium Opportunity Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IGD",
    "Name": "Voya Global Equity Dividend and Premium Opportunity Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IGI",
    "Name": "Western Asset Investment Grade Defined Opportunity Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IGR",
    "Name": "CBRE Clarion Global Real Estate Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IGT",
    "Name": "International Game Technology Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IH",
    "Name": "iHuman Inc. American depositary shares each representing five Class A ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IHC",
    "Name": "Independence Holding Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IHD",
    "Name": "Voya Emerging Markets High Income Dividend Equity Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IHG",
    "Name": "Intercontinental Hotels Group American Depositary Shares (Each representing one Ordinary Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IHIT",
    "Name": "Invesco High Income 2023 Target Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IHTA",
    "Name": "Invesco High Income 2024 Target Term Fund Common Shares of Beneficial Interest No par value per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IIAC",
    "Name": "Investindustrial Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IID",
    "Name": "Voya International High Dividend Equity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IIF",
    "Name": "Morgan Stanley India Investment Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IIIN",
    "Name": "Insteel Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IIM",
    "Name": "Invesco Value Municipal Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IIPR",
    "Name": "Innovative Industrial Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IIPR^A",
    "Name": "Innovative Industrial Properties Inc. 9.00% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IMAX",
    "Name": "Imax Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IMPX",
    "Name": "AEA-Bridges Impact Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INFO",
    "Name": "IHS Markit Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INFY",
    "Name": "Infosys Limited American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ING",
    "Name": "ING Group N.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INGR",
    "Name": "Ingredion Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INN",
    "Name": "Summit Hotel Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INN^D",
    "Name": "Summit Hotel Properties Inc. 6.45% Series D Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INN^E",
    "Name": "Summit Hotel Properties Inc. 6.250% Series E Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INSI",
    "Name": "Insight Select Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INSP",
    "Name": "Inspire Medical Systems Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INSW",
    "Name": "International Seaways Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INSW^A",
    "Name": "International Seaways Inc. 8.50% Senior Notes due June 30 2023",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INT",
    "Name": "World Fuel Services Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "INVH",
    "Name": "Invitation Homes Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IO",
    "Name": "Ion Geophysical Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IP",
    "Name": "International Paper Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IPG",
    "Name": "Interpublic Group of Companies Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IPI",
    "Name": "Intrepid Potash Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IPOD",
    "Name": "Social Capital Hedosophia Holdings Corp. IV Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IPOE",
    "Name": "Social Capital Hedosophia Holdings Corp. V Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IPOF",
    "Name": "Social Capital Hedosophia Holdings Corp. VI Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IQI",
    "Name": "Invesco Quality Municipal Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IQV",
    "Name": "IQVIA Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IR",
    "Name": "Ingersoll Rand Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IRL",
    "Name": "New Ireland Fund Inc (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IRM",
    "Name": "Iron Mountain Incorporated (Delaware)Common Stock REIT",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IRR",
    "Name": "Voya Natural Resources Equity Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IRS",
    "Name": "IRSA Inversiones Y Representaciones S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IRT",
    "Name": "Independence Realty Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ISD",
    "Name": "PGIM High Yield Bond Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IT",
    "Name": "Gartner Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ITCB",
    "Name": "Itau CorpBanca American Depositary Shares (each representing 1500 shares of Common Stock no par value)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ITGR",
    "Name": "Integer Holdings Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ITT",
    "Name": "ITT Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ITUB",
    "Name": "Itau Unibanco Banco Holding SA American Depositary Shares (Each repstg 500 Preferred shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ITW",
    "Name": "Illinois Tool Works Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVAN",
    "Name": "Ivanhoe Capital Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVC",
    "Name": "Invacare Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVH",
    "Name": "Ivy High Income Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVR",
    "Name": "INVESCO MORTGAGE CAPITAL INC Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVR^A",
    "Name": "Invesco Mortgage Capital Inc. Pfd Ser A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVR^B",
    "Name": "Invesco Mortgage Capital Inc. Preferred Series B Cum Fxd to Fltg",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVR^C",
    "Name": "INVESCO MORTGAGE CAPITAL INC 7.5% Fixed-to-Floating Series C Cumulative Redeemable Preferred Stock Liquation Preference $25.00 per Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IVZ",
    "Name": "Invesco Ltd Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "IX",
    "Name": "Orix Corp Ads Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "J",
    "Name": "Jacobs Engineering Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JAX",
    "Name": "J. Alexander's Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JBGS",
    "Name": "JBG SMITH Properties Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JBL",
    "Name": "Jabil Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JBT",
    "Name": "John Bean Technologies Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JCE",
    "Name": "Nuveen Core Equity Alpha Fund Nuveen Core Equity Alpha Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JCI",
    "Name": "Johnson Controls International plc Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JCO",
    "Name": "Nuveen Credit Opportunities 2022 Target Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JDD",
    "Name": "Nuveen Diversified Dividend and Income Fund Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JE",
    "Name": "Just Energy Group Inc. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JEF",
    "Name": "Jefferies Financial Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JELD",
    "Name": "JELD-WEN Holding Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JEMD",
    "Name": "Nuveen Emerging Markets Debt 2022 Target Term Fund Common Shares of Beneficial Interest $0.01 par value per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JEQ",
    "Name": "Aberdeen Japan Equity Fund Inc.  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JFR",
    "Name": "Nuveen Floating Rate Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JGH",
    "Name": "Nuveen Global High Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JHAA",
    "Name": "Nuveen Corporate Income 2023 Target Term Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JHB",
    "Name": "Nuveen Corporate Income November 2021 Target Term Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JHG",
    "Name": "Janus Henderson Group plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JHI",
    "Name": "John Hancock Investors Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JHS",
    "Name": "John Hancock Income Securities Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JHX",
    "Name": "James Hardie Industries plc American Depositary Shares (Ireland)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JIH",
    "Name": "Juniper Industrial Holdings Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JILL",
    "Name": "J. Jill Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JKS",
    "Name": "JinkoSolar Holding Company Limited American Depositary Shares (each representing 4 Common Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JLL",
    "Name": "Jones Lang LaSalle Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JLS",
    "Name": "Nuveen Mortgage and Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JMIA",
    "Name": "Jumia Technologies AG American Depositary Shares each representing two Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JMM",
    "Name": "Nuveen Multi-Market Income Fund (MA)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JMP",
    "Name": "JMP Group LLC Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JNJ",
    "Name": "Johnson & Johnson Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JNPR",
    "Name": "Juniper Networks Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JOE",
    "Name": "St. Joe Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JOF",
    "Name": "Japan Smaller Capitalization Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JP",
    "Name": "Jupai Holdings Limited American Depositary Shares each representing six ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPC",
    "Name": "Nuveen Preferred & Income Opportunities Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPI",
    "Name": "Nuveen Preferred and Income Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPM",
    "Name": "JP Morgan Chase & Co. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPM^C",
    "Name": "J P Morgan Chase & Co Depositary Shares each representing a 1/400th interest in a share of 6.00% Non-Cumulative  Preferred Stock Series EE",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPM^D",
    "Name": "J P Morgan Chase & Co Depositary Shares each representing a 1/400th  interest in a share of 5.75% Non-Cumulative  Preferred Stock Series DD",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPM^G",
    "Name": "J P Morgan Chase & Co Depositary Shares each representing a 1/400th interest in a share of 6.10% Non-Cumulative Preferred Stock Series AA",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPM^H",
    "Name": "J P Morgan Chase & Co Depositary Shares each representing a 1/400th interest in a share of 6.15% Non-Cumulative Preferred Stock Series BB",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPM^J",
    "Name": "J P Morgan Chase & Co Depositary Shares each representing a 1/400th interest in a share of JPMorgan Chase & Co. 4.75% Non-Cumulative Preferred Stock Series GG",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPS",
    "Name": "Nuveen Preferred & Income Securities Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JPT",
    "Name": "Nuveen Preferred and Income 2022 Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JQC",
    "Name": "Nuveen Credit Strategies Income Fund Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JRI",
    "Name": "Nuveen Real Asset Income and Growth Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JRO",
    "Name": "Nuveen Floating Rate Income Opportuntiy Fund Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JRS",
    "Name": "Nuveen Real Estate Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JSD",
    "Name": "Nuveen Short Duration Credit Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JT",
    "Name": "Jianpu Technology Inc. American depositary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JTA",
    "Name": "Nuveen Tax-Advantaged Total Return Strategy Fund Common Share of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JTD",
    "Name": "Nuveen Tax-Advantaged Dividend Growth Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JW/A",
    "Name": "John Wiley & Sons Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JW/B",
    "Name": "John Wiley & Sons Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JWN",
    "Name": "Nordstrom Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "JWS",
    "Name": "Jaws Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "K",
    "Name": "Kellogg Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KAI",
    "Name": "Kadant Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KAMN",
    "Name": "Kaman Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KAR",
    "Name": "KAR Auction Services Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KB",
    "Name": "KB Financial Group Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KBH",
    "Name": "KB Home Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KBR",
    "Name": "KBR Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEN",
    "Name": "Kenon Holdings Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEP",
    "Name": "Korea Electric Power Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEX",
    "Name": "Kirby Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEY",
    "Name": "KeyCorp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEY^I",
    "Name": "KeyCorp Depositary Shares Each Representing a 1/40th Ownership Interest in a Share of Fixed-to-Floating Rate Perpetual Non-Cumulative Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEY^J",
    "Name": "KeyCorp Depositary Shares each representing a 1/40th ownership interest in a share of Fixed Rate Perpetual Non-Cumulative Preferred Stock Series F",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEY^K",
    "Name": "KeyCorp Depositary Shares each representing a 1/40th ownership interest in a share of Fixed Rate Perpetual Non-Cumulative Preferred Stock Series G",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KEYS",
    "Name": "Keysight Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KF",
    "Name": "Korea Fund Inc. (The) New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KFS",
    "Name": "Kingsway Financial Services Inc. Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KFY",
    "Name": "Korn Ferry Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KGC",
    "Name": "Kinross Gold Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KIM",
    "Name": "Kimco Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KIM^L",
    "Name": "Kimco Realty Corporation Class L Depositary Shares each of which represents a one-one thousandth fractional interest in a share of 5.125% Class L Cumulative Redeemable Preferred Stock liquidation preference $25000.00 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KIM^M",
    "Name": "Kimco Realty Corporation Class M Depositary Shares each of which represents a one-one thousandth fractional interest in a share of 5.25% Class M Cumulative Redeemable Preferred Stock liquidation preference $25000.00 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KIO",
    "Name": "KKR Income Opportunities Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KKR",
    "Name": "KKR & Co. Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KKR^A",
    "Name": "KKR & Co. Inc. 6.75% Series A Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KKR^B",
    "Name": "KKR & Co. Inc. 6.50% Series B Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KKR^C",
    "Name": "KKR & Co. Inc. 6.00% Series C Mandatory Convertible Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KL",
    "Name": "Kirkland Lake Gold Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KMB",
    "Name": "Kimberly-Clark Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KMF",
    "Name": "Kayne Anderson NextGen Energy & Infrastructure Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KMI",
    "Name": "Kinder Morgan Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KMPR",
    "Name": "Kemper Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KMT",
    "Name": "Kennametal Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KMX",
    "Name": "CarMax Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KN",
    "Name": "Knowles Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KNL",
    "Name": "Knoll Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KNOP",
    "Name": "KNOT Offshore Partners LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KNX",
    "Name": "Knight-Swift Transportation Holdings Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KO",
    "Name": "Coca-Cola Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KODK",
    "Name": "Eastman Kodak Company Common New",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KOF",
    "Name": "Coca Cola Femsa S.A.B. de C.V.  American Depositary Shares each representing 10 Units (each Unit consists of 3 Series B Shares and 5 Series L Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KOP",
    "Name": "Koppers Holdings Inc. Koppers Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KOS",
    "Name": "Kosmos Energy Ltd. Common Shares (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KR",
    "Name": "Kroger Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KRA",
    "Name": "Kraton Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KRC",
    "Name": "Kilroy Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KREF",
    "Name": "KKR Real Estate Finance Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KRG",
    "Name": "Kite Realty Group Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KRO",
    "Name": "Kronos Worldwide Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KRP",
    "Name": "Kimbell Royalty Partners Common Units Representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KSM",
    "Name": "DWS Strategic Municipal Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KSS",
    "Name": "Kohl's Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KSU",
    "Name": "Kansas City Southern Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KSU^",
    "Name": "Kansas City Southern Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KT",
    "Name": "KT Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KTB",
    "Name": "Kontoor Brands Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KTF",
    "Name": "DWS Municipal Income Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KTH",
    "Name": "Structures Products Cp 8% CorTS Issued by Peco Energy Cap Tr II Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KTN",
    "Name": "Structured Products Corp 8.205% CorTS 8.205% Corporate Backed Trust Securities (CorTS)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KUKE",
    "Name": "Kuke Music Holding Limited American Depositary Shares each representing one Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KW",
    "Name": "Kennedy-Wilson Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KWAC",
    "Name": "Kingswood Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KWR",
    "Name": "Quaker Chemical Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "KYN",
    "Name": "Kayne Anderson Energy Infrastructure Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "L",
    "Name": "Loews Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LAC",
    "Name": "Lithium Americas Corp. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LAD",
    "Name": "Lithia Motors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LADR",
    "Name": "Ladder Capital Corp Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LAIX",
    "Name": "LAIX Inc. American Depositary Shares each  representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LAZ",
    "Name": "Lazard LTD. Lazard LTD. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LB",
    "Name": "L Brands Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LBRT",
    "Name": "Liberty Oilfield Services Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LC",
    "Name": "LendingClub Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LCI",
    "Name": "Lannett Co Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LCII",
    "Name": "LCI Industries",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LDI",
    "Name": "loanDepot Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LDL",
    "Name": "Lydall Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LDOS",
    "Name": "Leidos Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LDP",
    "Name": "Cohen & Steers Limited Duration Preferred and Income Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEA",
    "Name": "Lear Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEAF",
    "Name": "Leaf Group Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEAP",
    "Name": "Ribbit LEAP Ltd. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEE",
    "Name": "Lee Enterprises Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEG",
    "Name": "Leggett & Platt Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEJU",
    "Name": "Leju Holdings Limited American Depositary Shares each representing one Ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEN",
    "Name": "Lennar Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEO",
    "Name": "BNY Mellon Strategic Municipals Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LEVI",
    "Name": "Levi Strauss & Co Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LFC",
    "Name": "China Life Insurance Company Limited American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LFT",
    "Name": "Lument Finance Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LGI",
    "Name": "Lazard Global Total Return and Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LH",
    "Name": "Laboratory Corporation of America Holdings Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LHC",
    "Name": "Leo Holdings Corp. II Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LHX",
    "Name": "L3Harris Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LII",
    "Name": "Lennox International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LIN",
    "Name": "Linde plc Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LINX",
    "Name": "Linx S.A. American Depositary Shares each representing one common share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LITB",
    "Name": "LightInTheBox Holding Co. Ltd. American Depositary Shares each representing 2 ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LL",
    "Name": "Lumber Liquidators Holdings Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LLY",
    "Name": "Eli Lilly and Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LMND",
    "Name": "Lemonade Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LMT",
    "Name": "Lockheed Martin Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LNC",
    "Name": "Lincoln National Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LND",
    "Name": "Brasilagro Brazilian Agric Real Estate Co Sponsored ADR (Brazil)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LNFA",
    "Name": "L&amp;F Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LNN",
    "Name": "Lindsay Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LOKB",
    "Name": "Live Oak Acquisition Corp. II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LOMA",
    "Name": "Loma Negra Compania Industrial Argentina Sociedad Anonima ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LOW",
    "Name": "Lowe's Companies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LPG",
    "Name": "Dorian LPG Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LPI",
    "Name": "Laredo Petroleum Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LPL",
    "Name": "LG Display Co Ltd AMERICAN DEPOSITORY SHARES",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LPX",
    "Name": "Louisiana-Pacific Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LRN",
    "Name": "Stride Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LSI",
    "Name": "Life Storage Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LSPD",
    "Name": "Lightspeed POS Inc. Subordinate Voting Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LTC",
    "Name": "LTC Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LTHM",
    "Name": "Livent Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LU",
    "Name": "Lufax Holding Ltd American Depositary Shares two of which representing one Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LUB",
    "Name": "Luby's Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LUMN",
    "Name": "Lumen Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LUV",
    "Name": "Southwest Airlines Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LVS",
    "Name": "Las Vegas Sands Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LW",
    "Name": "Lamb Weston Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LXP",
    "Name": "Lexington Realty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LXP^C",
    "Name": "Lexington Realty Trust  Preferred Conv. Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LXU",
    "Name": "LSB Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LYB",
    "Name": "LyondellBasell Industries NV Ordinary Shares Class A (Netherlands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LYG",
    "Name": "Lloyds Banking Group Plc American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LYV",
    "Name": "Live Nation Entertainment Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "LZB",
    "Name": "La-Z-Boy Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "M",
    "Name": "Macy's Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MA",
    "Name": "Mastercard Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAA",
    "Name": "Mid-America Apartment Communities Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAA^I",
    "Name": "Mid-America Apartment Communities Inc. 8.50% Series I Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAC",
    "Name": "Macerich Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAIN",
    "Name": "Main Street Capital Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAN",
    "Name": "ManpowerGroup Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MANU",
    "Name": "Manchester United Ltd. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAS",
    "Name": "Masco Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MATX",
    "Name": "Matson Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAV",
    "Name": "Pioneer Municipal High Income Advantage Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAX",
    "Name": "MediaAlpha Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MAXR",
    "Name": "Maxar Technologies Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MBI",
    "Name": "MBIA Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MBT",
    "Name": "Mobile TeleSystems PJSC",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MC",
    "Name": "Moelis & Company Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCA",
    "Name": "Blackrock MuniYield California Quality Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCB",
    "Name": "Metropolitan Bank Holding Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCD",
    "Name": "McDonald's Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCI",
    "Name": "Barings Corporate Investors Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCK",
    "Name": "McKesson Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCN",
    "Name": "Madison Covered Call & Equity Strategy Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCO",
    "Name": "Moody's Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCR",
    "Name": "MFS Charter Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCS",
    "Name": "Marcus Corporation (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MCY",
    "Name": "Mercury General Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MD",
    "Name": "Mednax Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDC",
    "Name": "M.D.C. Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDLA",
    "Name": "Medallia Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDLQ",
    "Name": "Medley LLC 7.25% Notes due 2024",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDLX",
    "Name": "Medley LLC 6.875% Senior Notes due 2026",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDLY",
    "Name": "Medley Management Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDP",
    "Name": "Meredith Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDT",
    "Name": "Medtronic plc. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MDU",
    "Name": "MDU Resources Group Inc. Common Stock (Holding Company)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MEC",
    "Name": "Mayville Engineering Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MED",
    "Name": "MEDIFAST INC Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MEG",
    "Name": "Montrose Environmental Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MEI",
    "Name": "Methode Electronics Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MEN",
    "Name": "Blackrock MuniEnhanced Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MER^K",
    "Name": "Bank of America Corporation Income Capital Obligation Notes initially due December 15 2066",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MET",
    "Name": "MetLife Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MET^A",
    "Name": "MetLife Inc. Preferred Series A Floating Rate",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MET^E",
    "Name": "MetLife Inc. Depositary shares each representing a 1/1000th interest in a share of the Issuera??s 5.625% Non-Cumulative Preferred Stock Series E.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MET^F",
    "Name": "MetLife Inc. Depositary Shares each representing a 1/1000th interest in a share of 4.75% Non-Cumulative Preferred Stock Series F",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFA",
    "Name": "MFA Financial Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFA^B",
    "Name": "MFA Financial Inc. Preferred Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFA^C",
    "Name": "MFA Financial Inc. 6.50% Series C Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFC",
    "Name": "Manulife Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFD",
    "Name": "Macquarie First Trust Global Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFG",
    "Name": "Mizuho Financial Group Inc. Sponosred ADR (Japan)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFGP",
    "Name": "Micro Focus Intl PLC ADS each representing One Ord Sh",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFL",
    "Name": "Blackrock MuniHoldings Investment Quality Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFM",
    "Name": "MFS Municipal Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFT",
    "Name": "Blackrock MuniYield Investment Quality Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MFV",
    "Name": "MFS Special Value Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MG",
    "Name": "Mistras Group Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGA",
    "Name": "Magna International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGF",
    "Name": "MFS Government Markets Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGM",
    "Name": "MGM Resorts International Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGP",
    "Name": "MGM Growth Properties LLC Class A common shares representing limited liability company interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGR",
    "Name": "Affiliated Managers Group Inc. 5.875% Junior Subordinated Notes due 2059",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGRB",
    "Name": "Affiliated Managers Group Inc. 4.750% Junior Subordinated Notes due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGU",
    "Name": "Macquarie Global Infrastructure Total Return Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MGY",
    "Name": "Magnolia Oil & Gas Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MH^A",
    "Name": "Maiden Holdings Ltd. Pref Shs Ser A (Bermuda)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MH^C",
    "Name": "Maiden Holdings North America Ltd. 7.125% Non-Cumulative Preference Shares Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MH^D",
    "Name": "Maiden Holdings Ltd. 6.700% Non-Cumulative Preference Shares Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHD",
    "Name": "Blackrock MuniHoldings Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHE",
    "Name": "BlackRock Massachusetts Tax-Exempt Trust",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHF",
    "Name": "Western Asset Municipal High Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHI",
    "Name": "Pioneer Municipal High Income Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHK",
    "Name": "Mohawk Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHLA",
    "Name": "Maiden Holdings Ltd. 6.625% Notes due 2046",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHN",
    "Name": "Blackrock MuniHoldings New York Quality Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHNC",
    "Name": "Maiden Holdings North America Ltd. 7.75% Notes due 2043",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MHO",
    "Name": "M/I Homes Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MIC",
    "Name": "Macquarie Infrastructure Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MIE",
    "Name": "Cohen & Steers MLP Income and Energy Opportunity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MIN",
    "Name": "MFS Intermediate Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MITT",
    "Name": "AG Mortgage Investment Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MITT^A",
    "Name": "AG Mortgage Investment Trust Inc. 8.25% Preferred Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MITT^B",
    "Name": "AG Mortgage Investment Trust Inc. Preferred Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MITT^C",
    "Name": "AG Mortgage Investment Trust Inc. 8.00% Series C Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock $0.01 par value per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MIXT",
    "Name": "MiX Telematics Limited American Depositary Shares each representing 25 Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MIY",
    "Name": "Blackrock MuniYield Michigan Quality Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MKC",
    "Name": "McCormick & Company Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MKL",
    "Name": "Markel Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MLI",
    "Name": "Mueller Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MLM",
    "Name": "Martin Marietta Materials Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MLP",
    "Name": "Maui Land & Pineapple Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MLR",
    "Name": "Miller Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMC",
    "Name": "Marsh & McLennan Companies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMD",
    "Name": "MainStay MacKay DefinedTerm Municipal Opportunities Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMI",
    "Name": "Marcus & Millichap Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMM",
    "Name": "3M Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMP",
    "Name": "Magellan Midstream Partners L.P. Limited Partnership",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMS",
    "Name": "Maximus Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMT",
    "Name": "MFS Multimarket Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MMU",
    "Name": "Western Asset Managed Municipals Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MN",
    "Name": "Manning & Napier Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MNP",
    "Name": "Western Asset Municipal Partners Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MNR",
    "Name": "Monmouth Real Estate Investment Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MNR^C",
    "Name": "Monmouth Real Estate Investment Corporation 6.125% Series C Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MNRL",
    "Name": "Brigham Minerals Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MNSO",
    "Name": "MINISO Group Holding Limited American Depositary Shares each representing four Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MO",
    "Name": "Altria Group Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MOD",
    "Name": "Modine Manufacturing Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MODN",
    "Name": "Model N Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MOGU",
    "Name": "MOGU Inc. American Depositary Shares (each  representing 25 Class A Ordinary Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MOH",
    "Name": "Molina Healthcare Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MOS",
    "Name": "Mosaic Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MOTV",
    "Name": "Motive Capital Corp Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MOV",
    "Name": "Movado Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MP",
    "Name": "MP Materials Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MPA",
    "Name": "Blackrock MuniYield Pennsylvania Quality Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MPC",
    "Name": "Marathon Petroleum Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MPLN",
    "Name": "MultiPlan Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MPLX",
    "Name": "MPLX LP Common Units Representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MPV",
    "Name": "Barings Participation Investors Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MPW",
    "Name": "Medical Properties Trust Inc. common stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MPX",
    "Name": "Marine Products Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MQT",
    "Name": "Blackrock MuniYield Quality Fund II Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MQY",
    "Name": "Blackrock MuniYield Quality Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MRC",
    "Name": "MRC Global Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MRK",
    "Name": "Merck & Company Inc. Common Stock (new)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MRO",
    "Name": "Marathon Oil Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MS",
    "Name": "Morgan Stanley Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MS^A",
    "Name": "Morgan Stanley Dep Shs repstg 1/1000 Pfd Ser A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MS^E",
    "Name": "Morgan Stanley DEPOSITARY SHARES REP 1/1000TH SHARES FIXED/FLTG PREFERRED STOCK SERIES E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MS^F",
    "Name": "Morgan Stanley Dep Shs Rpstg 1/1000th Int Prd Ser F Fxd to Flag",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MS^I",
    "Name": "Morgan Stanley Depository Shares Representing 1/1000th Preferred Series 1 Fixed to Floating Non (Cum)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MS^K",
    "Name": "Morgan Stanley Depositary Shares each representing 1/1000th of a share of Fixed-to-Floating Rate Non-Cumulative Preferred Stock  Series K",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MS^L",
    "Name": "Morgan Stanley Depositary Shares each representing 1/1000th of a share of 4.875% Non-Cumulative Preferred Stock Series L",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSA",
    "Name": "MSA Safety Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSB",
    "Name": "Mesabi Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSC",
    "Name": "Studio City International Holdings Limited American depositary shares each representing four  Class A ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSCI",
    "Name": "MSCI Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSD",
    "Name": "Morgan Stanley Emerging Markets Debt Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSGE",
    "Name": "Madison Square Garden Entertainment Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSGN",
    "Name": "MSG Networks Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSGS",
    "Name": "Madison Square Garden Sports Corp. Class A Common Stock (New)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSI",
    "Name": "Motorola Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSM",
    "Name": "MSC Industrial Direct Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MSP",
    "Name": "Datto Holding Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MT",
    "Name": "Arcelor Mittal NY Registry Shares NEW",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTB",
    "Name": "M&T Bank Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTCN",
    "Name": "ArcelorMittal 5.50% Mandatorily Convertible Subordinated Notes due 2023",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTD",
    "Name": "Mettler-Toledo International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTDR",
    "Name": "Matador Resources Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTG",
    "Name": "MGIC Investment Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTH",
    "Name": "Meritage Homes Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTL",
    "Name": "Mechel PAO American Depositary Shares (Each rep. 1 common shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTL^",
    "Name": "Mechel PAO American Depositary Shares (each representing one-half of a Preferred Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTN",
    "Name": "Vail Resorts Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTOR",
    "Name": "Meritor Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTR",
    "Name": "Mesa Royalty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTRN",
    "Name": "Materion Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTT",
    "Name": "Western Asset Municipal Defined Opportunity Trust Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTW",
    "Name": "Manitowoc Company Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTX",
    "Name": "Minerals Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MTZ",
    "Name": "MasTec Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUA",
    "Name": "Blackrock MuniAssets Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUC",
    "Name": "Blackrock MuniHoldings California Quality Fund Inc.  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUE",
    "Name": "Blackrock MuniHoldings Quality Fund II Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUFG",
    "Name": "Mitsubishi UFJ Financial Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUI",
    "Name": "Blackrock Muni Intermediate Duration Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUJ",
    "Name": "Blackrock MuniHoldings New Jersey Quality Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUR",
    "Name": "Murphy Oil Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUSA",
    "Name": "Murphy USA Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MUX",
    "Name": "McEwen Mining Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MVF",
    "Name": "Blackrock MuniVest Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MVO",
    "Name": "MV Oil Trust Units of Beneficial Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MVT",
    "Name": "Blackrock MuniVest Fund II Inc.  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MWA",
    "Name": "MUELLER WATER PRODUCTS Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MX",
    "Name": "Magnachip Semiconductor Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MXE",
    "Name": "Mexico Equity and Income Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MXF",
    "Name": "Mexico Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MXL",
    "Name": "MaxLinear Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYC",
    "Name": "Blackrock MuniYield California Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYD",
    "Name": "Blackrock MuniYield Fund Inc.  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYE",
    "Name": "Myers Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYF",
    "Name": "Blackrock MuniYield Investment Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYI",
    "Name": "Blackrock MuniYield Quality Fund III Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYJ",
    "Name": "Blackrock MuniYield New Jersey Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYN",
    "Name": "Blackrock MuniYield New York Quality Fund Inc.Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYOV",
    "Name": "Myovant Sciences Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MYTE",
    "Name": "MYT Netherlands Parent B.V. American Depositary Shares each representing one Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "MZA",
    "Name": "Blackrock MuniYield Arizona Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAC",
    "Name": "Nuveen California Quality Municipal Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAD",
    "Name": "Nuveen Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAN",
    "Name": "Nuveen New York Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAPA",
    "Name": "The Duckhorn Portfolio Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAT",
    "Name": "Nordic American Tankers Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAV",
    "Name": "Navistar International Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAV^D",
    "Name": "Navistar International Corporation Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NAZ",
    "Name": "Nuveen Arizona Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NBB",
    "Name": "Nuveen Taxable Municipal Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NBHC",
    "Name": "National Bank Holdings Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NBR",
    "Name": "Nabors Industries Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NBR^A",
    "Name": "Nabors Industries Ltd. 6.00% Mandatory Convertible Preferred Shares Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NC",
    "Name": "NACCO Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NCA",
    "Name": "Nuveen California Municipal Value Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NCLH",
    "Name": "Norwegian Cruise Line Holdings Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NCR",
    "Name": "NCR Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NCV",
    "Name": "Virtus AllianzGI Convertible & Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NCV^A",
    "Name": "Virtus AllianzGI Convertible & Income Fund 5.625% Series A Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NCZ",
    "Name": "Virtus AllianzGI Convertible & Income Fund II Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NCZ^A",
    "Name": "Virtus AllianzGI Convertible & Income Fund II 5.50% Series A Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NDMO",
    "Name": "Nuveen Dynamic Municipal Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NDP",
    "Name": "Tortoise Energy Independence Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEA",
    "Name": "Nuveen AMT-Free Quality Municipal Income Fund Common Shares of Beneficial Interest Par Value $.01",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEE",
    "Name": "NextEra Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEE^K",
    "Name": "NextEra Energy Inc. Series K Junior Subordinated Debentures due June 1 2076",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEE^N",
    "Name": "NextEra Energy Inc. Series N Junior Subordinated Debentures due March 1 2079",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEE^O",
    "Name": "NextEra Energy Inc. 4.872% Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEE^P",
    "Name": "NextEra Energy Inc. 5.279% Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEE^Q",
    "Name": "NextEra Energy Inc. 6.219% Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEM",
    "Name": "Newmont Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEP",
    "Name": "NextEra Energy Partners LP Common Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NET",
    "Name": "Cloudflare Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NETI",
    "Name": "Eneti Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEU",
    "Name": "NewMarket Corp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEV",
    "Name": "Nuveen Enhanced Municipal Value Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEW",
    "Name": "Puxin Limited American Depositary Shares each representing two Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEWR",
    "Name": "New Relic Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEX",
    "Name": "NexTier Oilfield Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NEXA",
    "Name": "Nexa Resources S.A. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NFG",
    "Name": "National Fuel Gas Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NFH",
    "Name": "New Frontier Health Corporation Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NFJ",
    "Name": "Virtus Dividend Interest & Premium Strategy Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGA",
    "Name": "Northern Genesis Acquisition Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGAB",
    "Name": "Northern Genesis Acquisition Corp. II Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGG",
    "Name": "National Grid Transco PLC National Grid PLC (NEW) American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGL",
    "Name": "NGL ENERGY PARTNERS LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGL^B",
    "Name": "NGL ENERGY PARTNERS LP 9.00% Class B Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units representing limited partnership interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGL^C",
    "Name": "NGL ENERGY PARTNERS LP 9.625% Class C Fixed-to-Floating Rate Cumulative  Redeemable Perpetual Preferred Units representing  limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGS",
    "Name": "Natural Gas Services Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGVC",
    "Name": "Natural Grocers by Vitamin Cottage Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NGVT",
    "Name": "Ingevity Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NHF",
    "Name": "NexPoint Strategic Opportunities Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NHF^A",
    "Name": "NexPoint Strategic Opportunities Fund 5.50% Series A Cumulative Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NHI",
    "Name": "National Health Investors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NI",
    "Name": "NiSource Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NI^B",
    "Name": "NiSource Inc Depositary Shares representing 1/1000th ownership interest in a share of 6.50% Series B Preferred Stock and 1/1000th ownership interest in a share of Series B-1 Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NID",
    "Name": "Nuveen Intermediate Duration Municipal Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NIE",
    "Name": "Virtus AllianzGI Equity & Convertible Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NIM",
    "Name": "Nuveen Select Maturities Municipal Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NINE",
    "Name": "Nine Energy Service Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NIO",
    "Name": "NIO Inc. American depositary shares each  representing one Class A ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NIQ",
    "Name": "Nuveenn Intermediate Duration Quality Municipal Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NJR",
    "Name": "NewJersey Resources Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NKE",
    "Name": "Nike Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NKG",
    "Name": "Nuveen Georgia Quality Municipal Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NKX",
    "Name": "Nuveen California AMT-Free Quality Municipal Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NL",
    "Name": "NL Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NLS",
    "Name": "Nautilus Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NLSN",
    "Name": "Nielsen N.V. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NLY",
    "Name": "Annaly Capital Management Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NLY^F",
    "Name": "Annaly Capital Management Inc 6.95% Series F",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NLY^G",
    "Name": "Annaly Capital Management Inc 6.50% Series G Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NLY^I",
    "Name": "Annaly Capital Management Inc 6.750% Series I Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NM",
    "Name": "Navios Maritime Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NM^G",
    "Name": "Navios Maritime Holdings Inc. Sponsored ADR Representing 1/100th Perpetual Preferred Series G (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NM^H",
    "Name": "Navios Maritime Holdings Inc. Sponsored ADR Representing 1/100th Perp. Preferred Series H%",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMCO",
    "Name": "Nuveen Municipal Credit Opportunities Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMI",
    "Name": "Nuveen Municipal Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMK^C",
    "Name": "Niagara Mohawk Holdings Inc. Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMM",
    "Name": "Navios Maritime Partners LP Common Units Representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMR",
    "Name": "Nomura Holdings Inc ADR American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMS",
    "Name": "Nuveen Minnesota Quality Municipal Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMT",
    "Name": "Nuveen Massachusetts Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMY",
    "Name": "Nuveen Maryland Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NMZ",
    "Name": "Nuveen Municipal High Income Opportunity Fund Common Stock $0.01 par value per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NNA",
    "Name": "Navios Maritime Acquisition Corporation Common stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NNI",
    "Name": "Nelnet Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NNN",
    "Name": "National Retail Properties Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NNN^F",
    "Name": "National Retail Properties Depositary Shares each representing a 1/100th interest in a share of 5.20% Series F Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NNY",
    "Name": "Nuveen New York Municipal Value Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOA",
    "Name": "North American Construction Group Ltd. Common Shares (no par)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOAH",
    "Name": "Noah Holdings Limited",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOC",
    "Name": "Northrop Grumman Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOK",
    "Name": "Nokia Corporation Sponsored American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOM",
    "Name": "Nuveen Missouri Quality Municipal Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOMD",
    "Name": "Nomad Foods Limited Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOV",
    "Name": "NOV Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOVA",
    "Name": "Sunnova Energy International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NOW",
    "Name": "ServiceNow Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NP",
    "Name": "Neenah Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NPK",
    "Name": "National Presto Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NPO",
    "Name": "EnPro Industries Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NPTN",
    "Name": "NeoPhotonics Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NPV",
    "Name": "Nuveen Virginia Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NQP",
    "Name": "Nuveen Pennsylvania Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NR",
    "Name": "Newpark Resources Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NREF",
    "Name": "NexPoint Real Estate Finance Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NREF^A",
    "Name": "NexPoint Real Estate Finance Inc. 8.50% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRG",
    "Name": "NRG Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRGX",
    "Name": "PIMCO Energy and Tactical Credit Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRK",
    "Name": "Nuveen New York AMT-Free Quality Municipal Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRP",
    "Name": "Natural Resource Partners LP Limited Partnership",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRT",
    "Name": "North European Oil Royality Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRUC",
    "Name": "National Rural Utilities Cooperative Finance Corporation 5.500% Subordinated Notes due 2064 (Subordinated Deferrable Interest Notes)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRZ",
    "Name": "New Residential Investment Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRZ^A",
    "Name": "New Residential Investment Corp. 7.50% Series A Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRZ^B",
    "Name": "New Residential Investment Corp. 7.125% Series B Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NRZ^C",
    "Name": "New Residential Investment Corp. 6.375% Series C Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NS",
    "Name": "Nustar Energy L.P.  Common Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NS^A",
    "Name": "Nustar Energy L.P. 8.50% Series A Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NS^B",
    "Name": "Nustar Energy L.P. 7.625% Series B Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NS^C",
    "Name": "Nustar Energy L.P. 9.00% Series C Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSA",
    "Name": "National Storage Affiliates Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSA^A",
    "Name": "National Storage Affiliates Trust 6.000% Series A Cumulative Redeemable Preferred Shares of Beneficial Interest (Liquidation Preference $25.00 per share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSC",
    "Name": "Norfolk Southern Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSCO",
    "Name": "Nesco Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSH",
    "Name": "NavSight Holdings Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSL",
    "Name": "Nuveen Senior Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSP",
    "Name": "Insperity Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSS",
    "Name": "NuStar Logistics L.P. 7.625% Fixed-to-Floating Rate Subordinated Notes due 2043",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NSTB",
    "Name": "Northern Star Investment Corp. II Class A Common stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NTB",
    "Name": "Bank of N.T. Butterfield & Son Limited (The) Voting Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NTCO",
    "Name": "Natura &Co Holding S.A. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NTG",
    "Name": "Tortoise Midstream Energy Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NTP",
    "Name": "Nam Tai Property Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NTR",
    "Name": "Nutrien Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NTST",
    "Name": "NetSTREIT Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NTZ",
    "Name": "Natuzzi S.p.A.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NUE",
    "Name": "Nucor Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NUO",
    "Name": "Nuveen Ohio Quality Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NUS",
    "Name": "Nu Skin Enterprises Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NUV",
    "Name": "Nuveen Municipal Value Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NUVB",
    "Name": "Nuvation Bio Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NUW",
    "Name": "Nuveen AMT-Free Municipal Value Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVG",
    "Name": "Nuveen AMT-Free Municipal Credit Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVGS",
    "Name": "Navigator Holdings Ltd. Ordinary Shares (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVO",
    "Name": "Novo Nordisk A/S Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVR",
    "Name": "NVR Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVRO",
    "Name": "Nevro Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVS",
    "Name": "Novartis AG Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVST",
    "Name": "Envista Holdings Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVT",
    "Name": "nVent Electric plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NVTA",
    "Name": "Invitae Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NWG",
    "Name": "NatWest Group plc American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NWHM",
    "Name": "New Home Company Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NWN",
    "Name": "Northwest Natural Holding Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NX",
    "Name": "Quanex Building Products Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NXC",
    "Name": "Nuveen California Select Tax-Free Income Portfolio Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NXJ",
    "Name": "Nuveen New Jersey Qualified Municipal Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NXN",
    "Name": "Nuveen New York Select Tax-Free Income Portfolio Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NXP",
    "Name": "Nuveen Select Tax Free Income Portfolio Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NXQ",
    "Name": "Nuveen Select Tax Free Income Portfolio II Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NXR",
    "Name": "Nuveen Select Tax Free Income Portfolio III Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NXRT",
    "Name": "NexPoint Residential Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NYC",
    "Name": "New York City REIT Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NYCB",
    "Name": "New York Community Bancorp Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NYCB^A",
    "Name": "New York Community Bancorp Inc. Depositary shares each representing a 1/40th interest in a share of Fixed-to-Floating Rate Series A Noncumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NYCB^U",
    "Name": "New York Community Bancorp Inc. New York Community Capital Tr V (BONUSES)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NYT",
    "Name": "New York Times Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NYV",
    "Name": "Nuveen New York Municipal Value Fund 2 Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "NZF",
    "Name": "Nuveen Municipal Credit Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "O",
    "Name": "Realty Income Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OACB",
    "Name": "Oaktree Acquisition Corp. II Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OAK^A",
    "Name": "Oaktree Capital Group LLC 6.625% Series A Preferred units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OAK^B",
    "Name": "Oaktree Capital Group LLC 6.550% Series B Preferred Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OC",
    "Name": "Owens Corning Inc Common Stock New",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OCA",
    "Name": "Omnichannel Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OCFT",
    "Name": "OneConnect Financial Technology Co. Ltd. American Depositary Shares each representing three ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OCN",
    "Name": "Ocwen Financial Corporation NEW Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ODC",
    "Name": "Oil-Dri Corporation Of America Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OEC",
    "Name": "Orion Engineered Carbons S.A Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OFC",
    "Name": "Corporate Office Properties Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OFG",
    "Name": "OFG Bancorp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OFG^A",
    "Name": "OFG Bancorp Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OFG^B",
    "Name": "OFG Bancorp 7.0% Non Cumulative Monthly Income Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OFG^D",
    "Name": "OFG Bancorp 7.125% Non-Cumulative Perpetual Preferred Stock. Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OGE",
    "Name": "OGE Energy Corp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OGS",
    "Name": "ONE Gas Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OHI",
    "Name": "Omega Healthcare Investors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OI",
    "Name": "O-I Glass Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OIA",
    "Name": "Invesco Municipal Income Opportunities Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OII",
    "Name": "Oceaneering International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OIS",
    "Name": "Oil States International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OKE",
    "Name": "ONEOK Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OLN",
    "Name": "Olin Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OLO",
    "Name": "Olo Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OLP",
    "Name": "One Liberty Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OMC",
    "Name": "Omnicom Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OMF",
    "Name": "OneMain Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OMI",
    "Name": "Owens & Minor Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ONE",
    "Name": "OneSmart International Education Group Limited ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ONTF",
    "Name": "ON24 Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ONTO",
    "Name": "Onto Innovation Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OOMA",
    "Name": "Ooma Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OPP",
    "Name": "RiverNorth/DoubleLine Strategic Opportunity Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OPP^A",
    "Name": "RiverNorth/DoubleLine Strategic Opportunity Fund Inc. 4.375% Series A Cumulative Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OPY",
    "Name": "Oppenheimer Holdings Inc. Class A Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OR",
    "Name": "Osisko Gold Royalties Ltd Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ORA",
    "Name": "Ormat Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ORAN",
    "Name": "Orange",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ORC",
    "Name": "Orchid Island Capital Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ORCC",
    "Name": "Owl Rock Capital Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ORCL",
    "Name": "Oracle Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ORI",
    "Name": "Old Republic International Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ORN",
    "Name": "Orion Group Holdings Inc. Common",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OSCR",
    "Name": "Oscar Health Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OSG",
    "Name": "Overseas Shipholding Group Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OSH",
    "Name": "Oak Street Health Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OSK",
    "Name": "Oshkosh Corporation (Holding Company)Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OTIS",
    "Name": "Otis Worldwide Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OUST",
    "Name": "Ouster Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OUT",
    "Name": "OUTFRONT Media Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OVV",
    "Name": "Ovintiv Inc. (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OXM",
    "Name": "Oxford Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "OXY",
    "Name": "Occidental Petroleum Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PAC",
    "Name": "Grupo Aeroportuario Del Pacifico S.A. B. de C.V. Grupo Aeroportuario Del Pacifico S.A. de C.V. (each representing 10 Series B shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PACE",
    "Name": "TPG Pace Tech Opportunities Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PACK",
    "Name": "Ranpak Holdings Corp Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PAG",
    "Name": "Penske Automotive Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PAGS",
    "Name": "PagSeguro Digital Ltd. Class A Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PAI",
    "Name": "Western Asset Investment Grade Income Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PAM",
    "Name": "Pampa Energia S.A. Pampa Energia S.A.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PANW",
    "Name": "Palo Alto Networks Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PAR",
    "Name": "PAR Technology Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PARR",
    "Name": "Par Pacific Holdings Inc.  Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PAYC",
    "Name": "Paycom Software Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PB",
    "Name": "Prosperity Bancshares Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBA",
    "Name": "Pembina Pipeline Corp. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBC",
    "Name": "Prospect Capital Corporation 6.875% Notes due 2029",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBF",
    "Name": "PBF Energy Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBFX",
    "Name": "PBF Logistics LP Common Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBH",
    "Name": "Prestige Consumer Healthcare Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBI",
    "Name": "Pitney Bowes Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBI^B",
    "Name": "Pitney Bowes Inc 6.70% Notes Due 2043",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBR",
    "Name": "Petroleo Brasileiro S.A.- Petrobras Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBT",
    "Name": "Permian Basin Royalty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PBY",
    "Name": "Prospect Capital Corporation 6.25% Notes due 2028",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCF",
    "Name": "High Income Securities Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCG",
    "Name": "Pacific Gas & Electric Co. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCGU",
    "Name": "Pacific Gas & Electric Co. Equity Unit",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCI",
    "Name": "PIMCO Dynamic Credit and Mortgage Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCK",
    "Name": "Pimco California Municipal Income Fund II Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCM",
    "Name": "PCM Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCN",
    "Name": "Pimco Corporate & Income Strategy Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCPC",
    "Name": "Periphas Capital Partnering Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PCQ",
    "Name": "PIMCO California Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PD",
    "Name": "PagerDuty Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PDAC",
    "Name": "Peridot Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PDI",
    "Name": "PIMCO Dynamic Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PDM",
    "Name": "Piedmont Office Realty Trust Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PDO",
    "Name": "PIMCO Dynamic Income Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PDS",
    "Name": "Precision Drilling Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PDT",
    "Name": "John Hancock Premium Dividend Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEAK",
    "Name": "Healthpeak Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEB",
    "Name": "Pebblebrook Hotel Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEB^C",
    "Name": "Pebblebrook Hotel Trust 6.50% Series C Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEB^D",
    "Name": "Pebblebrook Hotel Trust 6.375% Series D Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEB^E",
    "Name": "Pebblebrook Hotel Trust 6.375% Series E Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEB^F",
    "Name": "Pebblebrook Hotel Trust 6.3% Series F Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEG",
    "Name": "Public Service Enterprise Group Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEI",
    "Name": "Pennsylvania Real Estate Investment Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEI^B",
    "Name": "Pennsylvania Real Estate Investment Trust Cumulative Redeemable Perpetual Preferred Shares Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEI^C",
    "Name": "Pennsylvania Real Estate Investment Trust 7.20% Series C Cumulative Redeemable Perpetual Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEI^D",
    "Name": "Pennsylvania Real Estate Investment Trust 6.875% Series D Cumulative Redeemable Perpetual Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEN",
    "Name": "Penumbra Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PEO",
    "Name": "Adams Natural Resources Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFD",
    "Name": "Flaherty & Crumrine Preferred and Income Fund Incorporated",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFE",
    "Name": "Pfizer Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFGC",
    "Name": "Performance Food Group Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFH",
    "Name": "Prudential Financial Inc. 4.125% Junior Subordinated Notes due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFL",
    "Name": "PIMCO Income Strategy Fund Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFN",
    "Name": "PIMCO Income Strategy Fund II",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFO",
    "Name": "Flaherty & Crumrine Preferred and Income Opportunity Fund Incorporated",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFS",
    "Name": "Provident Financial Services Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PFSI",
    "Name": "PennyMac Financial Services Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PG",
    "Name": "Procter & Gamble Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PGP",
    "Name": "Pimco Global Stocksplus & Income Fund Pimco Global StocksPlus & Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PGR",
    "Name": "Progressive Corporation (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PGRE",
    "Name": "Paramount Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PGTI",
    "Name": "PGT Innovations Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PGZ",
    "Name": "Principal Real Estate Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PH",
    "Name": "Parker-Hannifin Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHD",
    "Name": "Pioneer Floating Rate Trust Pioneer Floating Rate Trust Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHG",
    "Name": "Koninklijke Philips N.V. NY Registry Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHI",
    "Name": "PLDT Inc. Sponsored ADR",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHK",
    "Name": "Pimco High Income Fund Pimco High Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHM",
    "Name": "PulteGroup Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHR",
    "Name": "Phreesia Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHT",
    "Name": "Pioneer High Income Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PHX",
    "Name": "PHX Minerals Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PIAI",
    "Name": "Prime Impact Acquisition I Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PII",
    "Name": "Polaris Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PIM",
    "Name": "Putnam Master Intermediate Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PINE",
    "Name": "Alpine Income Property Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PING",
    "Name": "Ping Identity Holding Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PINS",
    "Name": "Pinterest Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PIPP",
    "Name": "Pine Island Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PIPR",
    "Name": "Piper Sandler Companies Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PJT",
    "Name": "PJT Partners Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PK",
    "Name": "Park Hotels & Resorts Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PKE",
    "Name": "Park Aerospace Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PKG",
    "Name": "Packaging Corporation of America Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PKI",
    "Name": "PerkinElmer Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PKO",
    "Name": "Pimco Income Opportunity Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PKX",
    "Name": "POSCO Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PLAN",
    "Name": "Anaplan Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PLD",
    "Name": "Prologis Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PLNT",
    "Name": "Planet Fitness Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PLOW",
    "Name": "Douglas Dynamics Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PLT",
    "Name": "Plantronics Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PLTR",
    "Name": "Palantir Technologies Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PLYM",
    "Name": "Plymouth Industrial REIT Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PM",
    "Name": "Philip Morris International Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMF",
    "Name": "PIMCO Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PML",
    "Name": "Pimco Municipal Income Fund II Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMM",
    "Name": "Putnam Managed Municipal Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMO",
    "Name": "Putnam Municipal Opportunities Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMT",
    "Name": "PennyMac Mortgage Investment Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMT^A",
    "Name": "PennyMac Mortgage Investment Trust 8.125% Series A Fixed-to-Floating Rate Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMT^B",
    "Name": "PennyMac Mortgage Investment Trust 8.00% Series B Fixed-to-Floating Rate Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMVC",
    "Name": "PMV Consumer Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PMX",
    "Name": "PIMCO Municipal Income Fund III Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNC",
    "Name": "PNC Financial Services Group Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNC^P",
    "Name": "PNC Financial Services Group Inc. (The) Depositary Shares Representing 1/4000th Perpetual Preferred Series P",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNF",
    "Name": "PIMCO New York Municipal Income Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNI",
    "Name": "Pimco New York Municipal Income Fund II Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNM",
    "Name": "PNM Resources Inc. (Holding Co.) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNR",
    "Name": "Pentair plc. Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNTM",
    "Name": "Pontem Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PNW",
    "Name": "Pinnacle West Capital Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "POR",
    "Name": "Portland General Electric Co Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "POST",
    "Name": "Post Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PPG",
    "Name": "PPG Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PPL",
    "Name": "PPL Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PPR",
    "Name": "Voya Prime Rate Trust Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PPT",
    "Name": "Putnam Premier Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PPX",
    "Name": "PPL Capital Funding Inc. 2013 Series B Junior Subordinated Notes due 2073",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PQG",
    "Name": "PQ Group Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRA",
    "Name": "ProAssurance Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRE^G",
    "Name": "PartnerRe Ltd. 6.50% Series G Cumulative Redeemable Preferred Shares $1.00 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRE^H",
    "Name": "PartnerRe Ltd. 7.25% Series H Cumulative Redeemable Preferred Shares $1.00 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRE^I",
    "Name": "PartnerRe Ltd. 5.875% Series I Non-Cumulative Redeemable Preferred Shares $1.00 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRE^J",
    "Name": "PartnerRe Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRG",
    "Name": "PROG Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRGO",
    "Name": "Perrigo Company plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRI",
    "Name": "Primerica Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRIF^A",
    "Name": "Priority Income Fund Inc. 6.375% Series A Term Preferred Stock due 2025",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRIF^B",
    "Name": "Priority Income Fund Inc. 6.25% Series B Term Preferred Stock due 2023  par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRIF^C",
    "Name": "Priority Income Fund Inc. 6.625% Series C Term Preferred Stock due 2024 par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRIF^D",
    "Name": "Priority Income Fund Inc. 7.00% Series D Term Preferred Stock due 2029",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRIF^E",
    "Name": "Priority Income Fund Inc. 6.375% Series E Preferred Stock Due 2024",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRIF^F",
    "Name": "Priority Income Fund Inc. 6.625% Series F Term Preferred Stock due 2027",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRLB",
    "Name": "Proto Labs Inc. Common stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRMW",
    "Name": "Primo Water Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRO",
    "Name": "PROS Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PROS",
    "Name": "ProSight Global Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRPB",
    "Name": "CC Neuberger Principal Holdings II Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRS",
    "Name": "Prudential Financial Inc. 5.625% Junior Subordinated Notes due 2058",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRSP",
    "Name": "Perspecta Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRT",
    "Name": "PermRock Royalty Trust Trust Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRTY",
    "Name": "Party City Holdco Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PRU",
    "Name": "Prudential Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA",
    "Name": "Public Storage Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^C",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 5.125% Cumulative Preferred Share of Beneficial Interest Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^D",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 4.95% Cumulative Preferred Share of Beneficial Interest Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^E",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 4.90% Cumulative Preferred Share of Beneficial Interest Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^F",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 5.15% Cumulative Preferred Share of Beneficial Interest Series F par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^G",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 5.05% Cumulative Preferred Share of Beneficial Interest Series G",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^H",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a  5.60% Cumulative Preferred  Share of Beneficial Interest Series H",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^I",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 4.875% Cumulative Preferred Share of Beneficial Interest Series I par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^J",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 4.700% Cumulative Preferred Share of Beneficial Interest Series J par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^K",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 4.75% Cumulative Preferred Share of Beneficial Interest Series K",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^L",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 4.625% Cumulative Preferred Share of Beneficial Interest Series L par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^M",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 4.125% Cumulative Preferred Share of Beneficial Interest Series M",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^N",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 3.875% Cumulative Preferred Share of Beneficial Interest Series N",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSA^O",
    "Name": "Public Storage Depositary Shares Each Representing 1/1000 of a 3.900% Cumulative Preferred Share of Beneficial Interest Series O",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSB",
    "Name": "PS Business Parks Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSB^W",
    "Name": "PS Business Parks Inc. Depositary Shares Each Representing 1/1000 of a Share of 5.20% Cumulative Preferred Stock Series W",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSB^X",
    "Name": "PS Business Parks Inc. Depositary Shares Each Representing 1/1000 of a Share of 5.25% Cumulative Preferred Stock Series X",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSB^Y",
    "Name": "PS Business Parks Inc. 5.20% Cumulative Preferred Stock Series Y",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSB^Z",
    "Name": "PS Business Parks Inc. Depositary Shares Each Representing 1/1000 of a Share of 4.875% Cumulative Preferred Stock Series Z  par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSF",
    "Name": "Cohen & Steers Select Preferred and Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSN",
    "Name": "Parsons Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSO",
    "Name": "Pearson Plc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSTG",
    "Name": "Pure Storage Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSTH",
    "Name": "Pershing Square Tontine Holdings Ltd. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSTL",
    "Name": "Postal Realty Trust Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSX",
    "Name": "Phillips 66 Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PSXP",
    "Name": "Phillips 66 Partners LP Common Units representing limited partner interest in the Partnership",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PTA",
    "Name": "Cohen & Steers Tax-Advantaged Preferred Securities and Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PTR",
    "Name": "PetroChina Company Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PTY",
    "Name": "Pimco Corporate & Income Opportunity Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PUK",
    "Name": "Prudential Public Limited Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PUK^",
    "Name": "Prudential Public Limited Company 6.75% Perpetual Subordinated Captial Security",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PUK^A",
    "Name": "Prudential Public Limited Company 6.50% Perpetual Subordinated Capital Securities Exchangeable at the Issuer's Option Into Non-Cumulative Dollar Denominated Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PUMP",
    "Name": "ProPetro Holding Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PV",
    "Name": "Primavera Capital Acquisition Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PVG",
    "Name": "Pretium Resources Inc. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PVH",
    "Name": "PVH Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PVL",
    "Name": "Permianville Royalty Trust Trust Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PWR",
    "Name": "Quanta Services Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PXD",
    "Name": "Pioneer Natural Resources Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PYN",
    "Name": "PIMCO New York Municipal Income Fund III Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PYS",
    "Name": "Merrill Lynch Depositor Inc PPlus Tr Ser RRD-1 Tr Ctf Cl A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PYT",
    "Name": "PPlus Tr GSC-2 Tr Ctf Fltg Rate",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PZC",
    "Name": "PIMCO California Municipal Income Fund III Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "PZN",
    "Name": "Pzena Investment Management Inc Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QD",
    "Name": "Qudian Inc. American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QFTA",
    "Name": "Quantum FinTech Acquisition Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QGEN",
    "Name": "Qiagen N.V. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QS",
    "Name": "QuantumScape Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QSR",
    "Name": "Restaurant Brands International Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QTS",
    "Name": "QTS Realty Trust Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QTS^A",
    "Name": "QTS Realty Trust Inc. 7.125% Series A Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QTS^B",
    "Name": "QTS Realty Trust Inc. 6.50% Series B Cumulative Convertible Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QTWO",
    "Name": "Q2 Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QUAD",
    "Name": "Quad Graphics Inc Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QUOT",
    "Name": "Quotient Technology Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QVCC",
    "Name": "QVC Inc. 6.250% Senior Secured Notes due 2068",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "QVCD",
    "Name": "QVC Inc. 6.375% Senior Secured Notes due 2067",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "R",
    "Name": "Ryder System Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RA",
    "Name": "Brookfield Real Assets Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RAAS",
    "Name": "Cloopen Group Holding Limited American Depositary Shares each representing two Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RACE",
    "Name": "Ferrari N.V. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RAD",
    "Name": "Rite Aid Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RAMP",
    "Name": "LiveRamp Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RBA",
    "Name": "Ritchie Bros. Auctioneers Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RBAC",
    "Name": "RedBall Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RBC",
    "Name": "Regal Beloit Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RBLX",
    "Name": "Roblox Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RC",
    "Name": "Ready Capital Corproation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCA",
    "Name": "Ready Capital Corporation 7.00% Convertible Senior Notes due 2023",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCB",
    "Name": "Ready Capital Corporation 6.20% Senior Notes due 2026",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCC",
    "Name": "Ready Capital Corporation 5.75% Senior Notes due 2026",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCI",
    "Name": "Rogers Communication Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCL",
    "Name": "D/B/A Royal Caribbean Cruises Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCP",
    "Name": "Ready Capital Corporation 6.50% Senior Notes due 2021",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCS",
    "Name": "PIMCO Strategic Income Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RCUS",
    "Name": "Arcus Biosciences Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RDN",
    "Name": "Radian Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RDS/B",
    "Name": "Royal Dutch Shell PLC",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RDY",
    "Name": "Dr. Reddy's Laboratories Ltd Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RE",
    "Name": "Everest Re Group Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RELX",
    "Name": "RELX PLC PLC American Depositary Shares (Each representing One Ordinary Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RENN",
    "Name": "Renren Inc. American Depositary Shares each representing fifteen Class A ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RES",
    "Name": "RPC Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REV",
    "Name": "Revlon Inc. New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REVG",
    "Name": "REV Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REX",
    "Name": "REX American Resources Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REXR",
    "Name": "Rexford Industrial Realty Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REXR^A",
    "Name": "Rexford Industrial Realty Inc. 5.875% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REXR^B",
    "Name": "Rexford Industrial Realty Inc. 5.875% Series B Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REXR^C",
    "Name": "Rexford Industrial Realty Inc. 5.625% Series C Cumulative Redeemable Preferred Stock par value $0.01 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "REZI",
    "Name": "Resideo Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RF",
    "Name": "Regions Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RF^A",
    "Name": "Regions Financial Corporation Depositary Shares Representing 1/40th Perpetual Preferred Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RF^B",
    "Name": "Regions Financial Corporation Depositary Shares Representing 1/40th Perpetual Preferred Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RF^C",
    "Name": "Regions Financial Corporation Depositary Shares each Representing a 1/40th Interest in a  Share of 5.700% Fixed-to-Floating Rate Non-Cumulative  Perpetual Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RFI",
    "Name": "Cohen & Steers Total Return Realty Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RFL",
    "Name": "Rafael Holdings Inc. Class B Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RFM",
    "Name": "RiverNorth Flexible Municipal Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RFMZ",
    "Name": "RiverNorth Flexible Municipal Income Fund II Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RFP",
    "Name": "Resolute Forest Products Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RGA",
    "Name": "Reinsurance Group of America Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RGR",
    "Name": "Sturm Ruger & Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RGS",
    "Name": "Regis Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RGT",
    "Name": "Royce Global Value Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RH",
    "Name": "RH Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RHI",
    "Name": "Robert Half International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RHP",
    "Name": "Ryman Hospitality Properties Inc. (REIT)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RICE",
    "Name": "Rice Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RIG",
    "Name": "Transocean Ltd (Switzerland) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RIO",
    "Name": "Rio Tinto Plc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RIV",
    "Name": "RiverNorth Opportunities Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RJF",
    "Name": "Raymond James Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RKT",
    "Name": "Rocket Companies Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RL",
    "Name": "Ralph Lauren Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RLGY",
    "Name": "Realogy Holdings Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RLI",
    "Name": "RLI Corp. Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RLJ",
    "Name": "RLJ Lodging Trust Common Shares of Beneficial Interest $0.01 par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RLJ^A",
    "Name": "RLJ Lodging Trust $1.95 Series A Cumulative Convertible  Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RLX",
    "Name": "RLX Technology Inc. American Depositary Shares each representing the right to receive one (1) Class A ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RM",
    "Name": "Regional Management Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RMAX",
    "Name": "RE/MAX Holdings Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RMD",
    "Name": "ResMed Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RMI",
    "Name": "RiverNorth Opportunistic Municipal Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RMM",
    "Name": "RiverNorth Managed Duration Municipal Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RMO",
    "Name": "Romeo Power Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RMPL^",
    "Name": "RiverNorth Specialty Finance Corporation 5.875%",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RMT",
    "Name": "Royce Micro-Cap Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RNG",
    "Name": "RingCentral Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RNGR",
    "Name": "Ranger Energy Services Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RNP",
    "Name": "Cohen & Steers REIT and Preferred and Income Fund Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RNR",
    "Name": "RenaissanceRe Holdings Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RNR^E",
    "Name": "RenaissanceRe Holdings Ltd. 5.375% Series E Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RNR^F",
    "Name": "RenaissanceRe Holdings Ltd. Depositary Shares each Representing a 1/1000th Interest in a 5.750% Series F Preference Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ROG",
    "Name": "Rogers Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ROK",
    "Name": "Rockwell Automation Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ROL",
    "Name": "Rollins Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ROP",
    "Name": "Roper Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ROT",
    "Name": "Rotor Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RPAI",
    "Name": "Retail Properties of America Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RPLA",
    "Name": "Replay Acquisition Corp. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RPM",
    "Name": "RPM International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RPT",
    "Name": "RPT Realty Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RPT^D",
    "Name": "RPT Realty 7.25%",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RQI",
    "Name": "Cohen & Steers Quality Income Realty Fund Inc Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RRC",
    "Name": "Range Resources Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RRD",
    "Name": "R.R. Donnelley & Sons Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RS",
    "Name": "Reliance Steel & Aluminum Co. Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RSF",
    "Name": "RiverNorth Specialty Finance Corporation",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RSG",
    "Name": "Republic Services Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RSI",
    "Name": "Rush Street Interactive Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RTP",
    "Name": "Reinvent Technology Partners Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RTPZ",
    "Name": "Reinvent Technology Partners Z Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RTX",
    "Name": "Raytheon Technologies Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RVI",
    "Name": "Retail Value Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RVLV",
    "Name": "Revolve Group Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RVT",
    "Name": "Royce Value Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RWT",
    "Name": "Redwood Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RXN",
    "Name": "Rexnord Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RY",
    "Name": "Royal Bank Of Canada Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RY^T",
    "Name": "Royal Bank Of Canada 6.750% Fixed Rate/Floating Rate Noncumulative First Preferred Shares Series C-2",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RYAM",
    "Name": "Rayonier Advanced Materials Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RYB",
    "Name": "RYB Education Inc. American depositary shares each representing one Class A ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RYI",
    "Name": "Ryerson Holding Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RYN",
    "Name": "Rayonier Inc. REIT Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RZA",
    "Name": "Reinsurance Group of America Incorporated 6.20% Fixed-to-Floating Rate Subordinated Debentures due 2042",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "RZB",
    "Name": "Reinsurance Group of America Incorporated 5.75% Fixed-To-Floating Rate Subordinated Debentures due 2056",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SA",
    "Name": "Seabridge Gold Inc. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAF",
    "Name": "Saratoga Investment Corp 6.25% Notes due 2023",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAFE",
    "Name": "Safehold Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAH",
    "Name": "Sonic Automotive Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAIC",
    "Name": "SCIENCE APPLICATIONS INTERNATIONAL CORPORATION Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAIL",
    "Name": "SailPoint Technologies Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAK",
    "Name": "Saratoga Investment Corp 7.25% Notes due 2025",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAM",
    "Name": "Boston Beer Company Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAN",
    "Name": "Banco Santander S.A. Sponsored ADR (Spain)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAND",
    "Name": "Sandstorm Gold Ltd. Ordinary Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAP",
    "Name": "SAP  SE ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAR",
    "Name": "Saratoga Investment Corp New",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SAVE",
    "Name": "Spirit Airlines Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SB",
    "Name": "Safe Bulkers Inc Common Stock ($0.001 par value)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SB^C",
    "Name": "Safe Bulkers Inc Cumulative Redeemable Perpetual Preferred Series C (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SB^D",
    "Name": "Safe Bulkers Inc Perpetual Preferred Series D (Marshall Islands)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBBA",
    "Name": "Scorpio Tankers Inc. 7.00% Senior Notes due 2025",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBG",
    "Name": "Sandbridge Acquisition Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBH",
    "Name": "Sally Beauty Holdings Inc. (Name to be changed from Sally Holdings Inc.) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBI",
    "Name": "Western Asset Intermediate Muni Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBOW",
    "Name": "SilverBow Resorces Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBR",
    "Name": "Sabine Royalty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBS",
    "Name": "Companhia de saneamento Basico Do Estado De Sao Paulo - Sabesp American Depositary Shares (Each repstg 250 Common Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SBSW",
    "Name": "D/B/A Sibanye-Stillwater Limited ADS",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SC",
    "Name": "Santander Consumer USA Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCCO",
    "Name": "Southern Copper Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCD",
    "Name": "LMP Capital and Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCE^G",
    "Name": "SCE Trust II Trust Preferred Securities",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCE^H",
    "Name": "SCE Trust III Fixed/Floating Rate Trust Preference Securities",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCE^J",
    "Name": "Southern California Edison Company 5.375% Fixed-to-Floating Rate Trust Preference Securities",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCE^K",
    "Name": "Southern California Edison Company 5.45% Fixed-to-Floating Rate Trust Preference Securities",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCE^L",
    "Name": "SCE TRUST VI",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCHW",
    "Name": "Charles Schwab Corporation (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCHW^C",
    "Name": "The Charles Schwab Corporation Depositary Shares each representing 1/40th interest in a share of 6% Non-Cumulative Perpetual Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCHW^D",
    "Name": "The Charles Schwab Corporation Depositary Shares each representing 1/40th interest in a share of 5.95% Non-Cumulative Perpetual Preferred Stock Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCI",
    "Name": "Service Corporation International Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCL",
    "Name": "Stepan Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCM",
    "Name": "Stellus Capital Investment Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCPE",
    "Name": "SC Health Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCS",
    "Name": "Steelcase Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCU",
    "Name": "Sculptor Capital Management Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCVX",
    "Name": "SCVX Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SCX",
    "Name": "L.S. Starrett Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SD",
    "Name": "SandRidge Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SDHY",
    "Name": "PGIM Short Duration High Yield Opportunities Fund Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SE",
    "Name": "Sea Limited American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SEAH",
    "Name": "Sports Entertainment Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SEAS",
    "Name": "SeaWorld Entertainment Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SEE",
    "Name": "Sealed Air Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SEM",
    "Name": "Select Medical Holdings Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SF",
    "Name": "Stifel Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SF^A",
    "Name": "Stifel Financial Corporation Depositary Shares each representing a 1/1000th interest in a share of 6.25% Non-Cumulative Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SF^B",
    "Name": "Stifel Financial Corporation Depositary Shares Each Representing 1/1000th  Interest in a Share of 6.25% Non-Cumulative  Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SF^C",
    "Name": "Stifel Financial Corporation Depositary Shares Each Representing 1/1000th Interest in a Share of 6.125% Non Cumulative Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SFB",
    "Name": "Stifel Financial Corporation 5.20% Senior Notes due 2047",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SFE",
    "Name": "Safeguard Scientifics Inc. New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SFL",
    "Name": "SFL Corporation Ltd",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SFTW",
    "Name": "Osprey Technology Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SFUN",
    "Name": "Fang Holdings Limited American Depositary Shares (Each representing Four Class A Ordinary Shares HK$1.00 par value)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SGFY",
    "Name": "Signify Health Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SGU",
    "Name": "Star Group L.P. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHAK",
    "Name": "Shake Shack Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHG",
    "Name": "Shinhan Financial Group Co Ltd American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHI",
    "Name": "SINOPEC Shangai Petrochemical Company Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHLX",
    "Name": "Shell Midstream Partners L.P. Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHO",
    "Name": "Sunstone Hotel Investors Inc. Sunstone Hotel Investors Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHO^E",
    "Name": "Sunstone Hotel Investors Inc. 6.950% Series E Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHO^F",
    "Name": "Sunstone Hotel Investors Inc. 6.450% Series F Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHOP",
    "Name": "Shopify Inc. Class A Subordinate Voting Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SHW",
    "Name": "Sherwin-Williams Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SI",
    "Name": "Silvergate Capital Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SID",
    "Name": "Companhia Siderurgica Nacional S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SIG",
    "Name": "Signet Jewelers Limited Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SII",
    "Name": "Sprott Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SITC",
    "Name": "SITE Centers Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SITC^A",
    "Name": "SITE Centers Corp. 6.375% Class A Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SITC^K",
    "Name": "SITE Centers Corp. DEPOSITARY SH REPSTG 1/20TH PDF CL K % (United States)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SITE",
    "Name": "SiteOne Landscape Supply Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SIX",
    "Name": "Six Flags Entertainment Corporation New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SJI",
    "Name": "South Jersey Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SJIJ",
    "Name": "South Jersey Industries Inc. 5.625% Junior Subordinated Notes due 2079",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SJIU",
    "Name": "South Jersey Industries Inc. Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SJM",
    "Name": "J.M. Smucker Company (The) New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SJR",
    "Name": "Shaw Communications Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SJT",
    "Name": "San Juan Basin Royalty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SJW",
    "Name": "SJW Group Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SKLZ",
    "Name": "Skillz Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SKM",
    "Name": "SK Telecom Co. Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SKT",
    "Name": "Tanger Factory Outlet Centers Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SKX",
    "Name": "Skechers U.S.A. Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SKY",
    "Name": "Skyline Champion Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SLB",
    "Name": "Schlumberger N.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SLCA",
    "Name": "U.S. Silica Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SLF",
    "Name": "Sun Life Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SLG",
    "Name": "SL Green Realty Corp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SLG^I",
    "Name": "SL Green Realty Corporation Preferred Series I",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SLQT",
    "Name": "SelectQuote Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SM",
    "Name": "SM Energy Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SMAR",
    "Name": "Smartsheet Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SMFG",
    "Name": "Sumitomo Mitsui Financial Group Inc Unsponsored American Depositary Shares (Japan)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SMG",
    "Name": "Scotts Miracle-Gro Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SMHI",
    "Name": "SEACOR Marine Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SMLP",
    "Name": "Summit Midstream Partners LP Common Units Representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SMM",
    "Name": "Salient Midstream Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SMP",
    "Name": "Standard Motor Products Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNA",
    "Name": "Snap-On Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNAP",
    "Name": "Snap Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNDR",
    "Name": "Schneider National Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNE",
    "Name": "Sony Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNN",
    "Name": "Smith & Nephew SNATS Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNOW",
    "Name": "Snowflake Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNP",
    "Name": "China Petroleum & Chemical Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNPR",
    "Name": "Tortoise Acquisition Corp. II Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNR",
    "Name": "New Senior Investment Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNV",
    "Name": "Synovus Financial Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNV^D",
    "Name": "Synovus Financial Corp. Fixed-to-Floating Rate Non-Cumulative Perpetual Preferred Stock Series D Liquation Preference $25.00 per Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNV^E",
    "Name": "Synovus Financial Corp. 5.875% Fixed-Rate Reset Non-Cumulative Perpetual Preferred Stock Series E",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SNX",
    "Name": "Synnex Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SO",
    "Name": "Southern Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOAC",
    "Name": "Sustainable Opportunities Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOGO",
    "Name": "Sogou Inc. American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOI",
    "Name": "Solaris Oilfield Infrastructure Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOJB",
    "Name": "Southern Company (The) Series 2016A 5.25% Junior Subordinated Notes due October 1 2076",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOJC",
    "Name": "Southern Company (The) Series 2017B 5.25% Junior Subordinated Notes due December 1 2077",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOJD",
    "Name": "Southern Company (The) Series 2020A 4.95% Junior Subordinated Notes due January 30 2080",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOJE",
    "Name": "Southern Company (The) Series 2020C 4.20% Junior Subordinated Notes due October 15 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOL",
    "Name": "Renesola Ltd. American Depsitary Shares (Each representing 10 shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOLN",
    "Name": "Southern Company (The) 2019 Series A Corporate Units",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SON",
    "Name": "Sonoco Products Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOR",
    "Name": "Source Capital Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SOS",
    "Name": "SOS Limited American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPB",
    "Name": "Spectrum Brands Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPCE",
    "Name": "Virgin Galactic Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPE",
    "Name": "Special Opportunities Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPE^B",
    "Name": "Special Opportunities Fund Inc. 3.50% Convertible Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPFR",
    "Name": "Jaws Spitfire Acquisition Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPG",
    "Name": "Simon Property Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPG^J",
    "Name": "Simon Property Group Inc. Simon Property Group 8 3/8% Series J Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPGI",
    "Name": "S&P Global Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPH",
    "Name": "Suburban Propane Partners L.P. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPLP",
    "Name": "Steel Partners Holdings LP LTD PARTNERSHIP UNIT",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPLP^A",
    "Name": "Steel Partners Holdings LP 6.0% Series A Preferred Units no par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPNT",
    "Name": "SiriusPoint Ltd. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPNV",
    "Name": "Supernova Partners Acquisition Company Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPOT",
    "Name": "Spotify Technology S.A. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPR",
    "Name": "Spirit Aerosystems Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPRQ",
    "Name": "Spartan Acquisition Corp. II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPXC",
    "Name": "SPX Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SPXX",
    "Name": "Nuveen S&P 500 Dynamic Overwrite Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SQ",
    "Name": "Square Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SQM",
    "Name": "Sociedad Quimica y Minera S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SQNS",
    "Name": "Sequans Communications S.A. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SQZ",
    "Name": "SQZ Biotechnologies Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SR",
    "Name": "Spire Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SR^A",
    "Name": "Spire Inc. Depositary Shares each representing a 1/1000th interest in a share of 5.90% Series A Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRC",
    "Name": "Spirit Realty Capital Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRC^A",
    "Name": "Spirit Realty Capital Inc. 6.000% Series A Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRE",
    "Name": "Sempra Energy Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRE^B",
    "Name": "Sempra Energy 6.75% Mandatory Convertible Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SREA",
    "Name": "Sempra Energy 5.750% Junior Subordinated Notes due 2079",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRG",
    "Name": "Seritage Growth Properties Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRG^A",
    "Name": "Seritage Growth Properties 7.00% Series A Cumulative Redeemable Preferred Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRI",
    "Name": "Stoneridge Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRL",
    "Name": "Scully Royalty Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRLP",
    "Name": "Sprague Resources LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRT",
    "Name": "StarTek Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SRV",
    "Name": "Cushing MLP & Infrastructure Total Return Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SSD",
    "Name": "Simpson Manufacturing Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SSL",
    "Name": "Sasol Ltd. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SSTK",
    "Name": "Shutterstock Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ST",
    "Name": "Sensata Technologies Holding plc Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STAG",
    "Name": "Stag Industrial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STAG^C",
    "Name": "Stag Industrial Inc. 6.875% Series C Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STAR",
    "Name": "iStar Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STAR^D",
    "Name": "iStar Inc. Series D Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STAR^G",
    "Name": "iStar Inc. Series G Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STAR^I",
    "Name": "iStar Inc. Series I Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STC",
    "Name": "Stewart Information Services Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STE",
    "Name": "STERIS plc (Ireland) Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STG",
    "Name": "Sunlands Technology Group American Depositary Shares representing Class A ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STIC",
    "Name": "Northern Star Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STK",
    "Name": "Columbia Seligman Premium Technology Growth Fund Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STL",
    "Name": "Sterling Bancorp",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STL^A",
    "Name": "Sterling Bancorp Depositary Shares each representing ownership of a 1/40th interest in a share of 6.50% Non-Cumulative Perpetual Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STLA",
    "Name": "Stellantis N.V. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STM",
    "Name": "STMicroelectronics N.V. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STN",
    "Name": "Stantec Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STNG",
    "Name": "Scorpio Tankers Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STON",
    "Name": "StoneMor Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STOR",
    "Name": "STORE Capital Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STPC",
    "Name": "Star Peak Corp II Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STPK",
    "Name": "Star Peak Energy Transition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STT",
    "Name": "State Street Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STT^D",
    "Name": "State Street Corporation Depositary Shares representing 1/4000th Perpetual Preferred Series D",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STT^G",
    "Name": "State Street Corporation Depositary shares each representing a 1/4000th ownership interest in a share of Fixed-to-Floating Rate Non-Cumulative",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STWD",
    "Name": "STARWOOD PROPERTY TRUST INC. Starwood Property Trust Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STZ",
    "Name": "Constellation Brands Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "STZ/B",
    "Name": "Constellation Brands Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SU",
    "Name": "Suncor Energy  Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SUI",
    "Name": "Sun Communities Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SUM",
    "Name": "Summit Materials Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SUN",
    "Name": "Sunoco LP Common Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SUP",
    "Name": "Superior Industries International Inc. Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SUPV",
    "Name": "Grupo Supervielle S.A. American Depositary Shares each Representing five Class B shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SUZ",
    "Name": "Suzano S.A. American Depositary Shares (each representing One Ordinary Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWBK",
    "Name": "Switchback II Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWCH",
    "Name": "Switch Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWI",
    "Name": "SolarWinds Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWK",
    "Name": "Stanley Black & Decker Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWM",
    "Name": "Schweitzer-Mauduit International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWN",
    "Name": "Southwestern Energy Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWT",
    "Name": "Stanley Black & Decker Inc. Corporate Unit",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWX",
    "Name": "Southwest Gas Holdings Inc. Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SWZ",
    "Name": "Swiss Helvetia Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SXC",
    "Name": "SunCoke Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SXI",
    "Name": "Standex International Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SXT",
    "Name": "Sensient Technologies Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SYF",
    "Name": "Synchrony Financial Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SYF^A",
    "Name": "Synchrony Financial Depositary Shares each Representing a 1/40th Interest in a Share of 5.625% Fixed Rate Non-Cumulative Perpetual Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SYK",
    "Name": "Stryker Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SYX",
    "Name": "Systemax Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SYY",
    "Name": "Sysco Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "SZC",
    "Name": "Cushing NextGen Infrastructure Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "T",
    "Name": "AT&T Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "T^A",
    "Name": "AT&T Inc. Depositary Shares each representing a 1/1000th interest in a share of 5.000% Perpetual Preferred Stock Series A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "T^C",
    "Name": "AT&T Inc. Depositary Shares each representing a 1/1000th interest in a share of 4.750% Perpetual Preferred Stock Series C",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TAC",
    "Name": "TransAlta Corporation Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TACA",
    "Name": "Trepont Acquisition Corp I Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TAK",
    "Name": "Takeda Pharmaceutical Company Limited American Depositary Shares (each representing 1/2 of a share of Common Stock)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TAL",
    "Name": "TAL Education Group American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TALO",
    "Name": "Talos Energy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TAP",
    "Name": "Molson Coors Beverage Company Class B Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TARO",
    "Name": "Taro Pharmaceutical Industries Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TBA",
    "Name": "Thoma Bravo Advantage Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TBB",
    "Name": "AT&T Inc. 5.350% Global Notes due 2066",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TBC",
    "Name": "AT&T Inc. 5.625% Global Notes due 2067",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TBI",
    "Name": "TrueBlue Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TCI",
    "Name": "Transcontinental Realty Investors Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TCS",
    "Name": "Container Store (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TD",
    "Name": "Toronto Dominion Bank (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDA",
    "Name": "Telephone and Data Systems Inc. 5.875% Senior Notes due 2061",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDC",
    "Name": "Teradata Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDE",
    "Name": "Telephone and Data Systems Inc. 6.875% Senior Notes due 2059",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDF",
    "Name": "Templeton Dragon Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDG",
    "Name": "Transdigm Group Incorporated Transdigm Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDI",
    "Name": "Telephone and Data Systems Inc. Sr Nt",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDJ",
    "Name": "Telephone and Data Systems Inc. 7% Senior Notes due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDOC",
    "Name": "Teladoc Health Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDS",
    "Name": "Telephone and Data Systems Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDS^U",
    "Name": "Telephone and Data Systems Inc. Depositary Shares Each Representing a 1/1000th Interest in a 6.625% Series UU Cumulative Redeemable Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDW",
    "Name": "Tidewater Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TDY",
    "Name": "Teledyne Technologies Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEAF",
    "Name": "Tortoise Essential Assets Income Term Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TECK",
    "Name": "Teck Resources Ltd Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEF",
    "Name": "Telefonica SA Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEI",
    "Name": "Templeton Emerging Markets Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEL",
    "Name": "TE Connectivity Ltd. New Switzerland Registered Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEN",
    "Name": "Tenneco Inc. Class A Voting Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEO",
    "Name": "Telecom Argentina SA",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEVA",
    "Name": "Teva Pharmaceutical Industries Limited American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TEX",
    "Name": "Terex Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFC",
    "Name": "Truist Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFC^H",
    "Name": "Truist Financial Corporation Series H",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFC^I",
    "Name": "Truist Financial Corporation Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFC^O",
    "Name": "Truist Financial Corporation Depositary Shares Each Representing a 1/1000th Interest in a Share of Series O Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFC^R",
    "Name": "Truist Financial Corporation Depositary Shares each representing 1/1000th interest in a share of Series R Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFII",
    "Name": "TFI International Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFSA",
    "Name": "Terra Income Fund VI 7.00% Notes due 2026",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TFX",
    "Name": "Teleflex Incorporated Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TG",
    "Name": "Tredegar Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGH",
    "Name": "Textainer Group Holdings Limited Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGI",
    "Name": "Triumph Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGNA",
    "Name": "TEGNA Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGP",
    "Name": "Teekay LNG Partners L.P.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGP^A",
    "Name": "Teekay LNG Partners L.P. 9.00% Series A Cumulative Redeemable Perpetual Preferred Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGP^B",
    "Name": "Teekay LNG Partners L.P. 8.50% Series B Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGS",
    "Name": "Transportadora de Gas del Sur SA TGS Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TGT",
    "Name": "Target Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "THC",
    "Name": "Tenet Healthcare Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "THG",
    "Name": "Hanover Insurance Group Inc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "THO",
    "Name": "Thor Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "THQ",
    "Name": "Tekla Healthcare Opportunies Fund Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "THR",
    "Name": "Thermon Group Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "THS",
    "Name": "Treehouse Foods Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "THW",
    "Name": "Tekla World Healthcare Fund Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TIMB",
    "Name": "TIM S.A. American Depositary Shares (Each representing 5 Common Shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TINV",
    "Name": "Tiga Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TISI",
    "Name": "Team Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TIXT",
    "Name": "TELUS International (Cda) Inc. Subordinate Voting Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TJX",
    "Name": "TJX Companies Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TK",
    "Name": "Teekay Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TKC",
    "Name": "Turkcell Iletisim Hizmetleri AS Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TKR",
    "Name": "Timken Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TLK",
    "Name": "PT Telekomunikasi Indonesia Tbk",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TLYS",
    "Name": "Tilly's Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TM",
    "Name": "Toyota Motor Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TME",
    "Name": "Tencent Music Entertainment Group American Depositary Shares each representing two Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TMHC",
    "Name": "Taylor Morrison Home Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TMO",
    "Name": "Thermo Fisher Scientific Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TMST",
    "Name": "TimkenSteel Corporation Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TMX",
    "Name": "Terminix Global Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNC",
    "Name": "Tennant Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNET",
    "Name": "TriNet Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNK",
    "Name": "Teekay Tankers Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNL",
    "Name": "Travel   Leisure Co. Common  Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNP",
    "Name": "Tsakos Energy Navigation Ltd Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNP^D",
    "Name": "Tsakos Energy Navigation Ltd 8.75% Series D Cumulative Redeemable Perpetual Preferred Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNP^E",
    "Name": "Tsakos Energy Navigation Ltd Series E Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Shares par value $1.00",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TNP^F",
    "Name": "Tsakos Energy Navigation Ltd Series F Fixed-to-Floating Rate Cumulative Redeemable Perpetual Preferred Shares par value $1.00",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TOL",
    "Name": "Toll Brothers Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TOT",
    "Name": "Total SE",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPB",
    "Name": "Turning Point Brands Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPC",
    "Name": "Tutor Perini Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPGY",
    "Name": "TPG Pace Beneficial Finance Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPH",
    "Name": "Tri Pointe Homes Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPL",
    "Name": "Texas Pacific Land Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPR",
    "Name": "Tapestry Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPVG",
    "Name": "TriplePoint Venture Growth BDC Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPVY",
    "Name": "TriplePoint Venture Growth BDC Corp. 5.75% Notes due 2022",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPX",
    "Name": "Tempur Sealy International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TPZ",
    "Name": "Tortoise Power and Energy Infrastructure Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TR",
    "Name": "Tootsie Roll Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRC",
    "Name": "Tejon Ranch Co Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TREB",
    "Name": "Trebia Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TREC",
    "Name": "Trecora Resources Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TREX",
    "Name": "Trex Company Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRGP",
    "Name": "Targa Resources Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRI",
    "Name": "Thomson Reuters Corp Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRN",
    "Name": "Trinity Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRNO",
    "Name": "Terreno Realty Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TROX",
    "Name": "Tronox Holdings plc Ordinary Shares (UK)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRP",
    "Name": "TC Energy Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRQ",
    "Name": "Turquoise Hill Resources Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRTN",
    "Name": "Triton International Limited Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRTN^A",
    "Name": "Triton International Limited 8.50% Series A Cumulative Redeemable Perpetual  Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRTN^B",
    "Name": "Triton International Limited 8.00% Series B Cumulative Redeemable Perpetual Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRTN^C",
    "Name": "Triton International Limited 7.375% Series C Cumulative Redeemable Perpetual Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRTN^D",
    "Name": "Triton International Limited 6.875% Series D Cumulative Redeemable Perpetual Preference Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRTX",
    "Name": "TPG RE Finance Trust Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRU",
    "Name": "TransUnion Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TRV",
    "Name": "The Travelers Companies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TS",
    "Name": "Tenaris S.A. American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TSE",
    "Name": "Trinseo S.A. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TSI",
    "Name": "TCW Strategic Income Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TSLX",
    "Name": "Sixth Street Specialty Lending Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TSM",
    "Name": "Taiwan Semiconductor Manufacturing Company Ltd.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TSN",
    "Name": "Tyson Foods Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TSQ",
    "Name": "Townsquare Media Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TT",
    "Name": "Trane Technologies plc",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TTC",
    "Name": "Toro Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TTI",
    "Name": "Tetra Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TTM",
    "Name": "Tata Motors Ltd Tata Motors Limited",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TTP",
    "Name": "Tortoise Pipeline & Energy Fund Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TU",
    "Name": "Telus Corporation Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TUFN",
    "Name": "Tufin Software Technologies Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TUP",
    "Name": "Tupperware Brands Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TUYA",
    "Name": "Tuya Inc. American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TV",
    "Name": "Grupo Televisa S.A. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TVC",
    "Name": "Tennessee Valley Authority Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TVE",
    "Name": "Tennessee Valley Authority",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWI",
    "Name": "Titan International Inc. (DE) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWLO",
    "Name": "Twilio Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWN",
    "Name": "Taiwan Fund Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWND",
    "Name": "Tailwind Acquisition Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWO",
    "Name": "Two Harbors Investment Corp",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWO^A",
    "Name": "Two Harbors Investments Corp 8.125% Series A Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock ($25.00 liquidation preference per share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWO^B",
    "Name": "Two Harbors Investments Corp 7.625% Series B Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWO^C",
    "Name": "Two Harbors Investments Corp 7.25% Series C Fixed-to-Floating Rate Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TWTR",
    "Name": "Twitter Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TX",
    "Name": "Ternium S.A. Ternium S.A. American Depositary Shares (each representing ten shares USD1.00 par value)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TXT",
    "Name": "Textron Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TY",
    "Name": "Tri Continental Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TY^",
    "Name": "Tri Continental Corporation Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TYG",
    "Name": "Tortoise Energy Infrastructure Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "TYL",
    "Name": "Tyler Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "U",
    "Name": "Unity Software Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UA",
    "Name": "Under Armour Inc. Class C Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UAA",
    "Name": "Under Armour Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UAN",
    "Name": "CVR Partners LP Common Units representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UBA",
    "Name": "Urstadt Biddle Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UBER",
    "Name": "Uber Technologies Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UBP",
    "Name": "Urstadt Biddle Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UBP^H",
    "Name": "Urstadt Biddle Properties Inc. 6.250% Series H Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UBP^K",
    "Name": "Urstadt Biddle Properties Inc. 5.875% Series K Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UBS",
    "Name": "UBS Group AG Registered Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UDR",
    "Name": "UDR Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UE",
    "Name": "Urban Edge Properties Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UFI",
    "Name": "Unifi Inc. New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UFS",
    "Name": "Domtar Corporation (NEW) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UGI",
    "Name": "UGI Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UGP",
    "Name": "Ultrapar Participacoes S.A. (New) American Depositary Shares (Each representing one Common Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UHS",
    "Name": "Universal Health Services Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UHT",
    "Name": "Universal Health Realty Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UI",
    "Name": "Ubiquiti Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UIS",
    "Name": "Unisys Corporation New Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UL",
    "Name": "Unilever PLC Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UMC",
    "Name": "United Microelectronics Corporation (NEW) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UMH",
    "Name": "UMH Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UMH^C",
    "Name": "UMH Properties Inc. 6.75% Series C Cumulative Redeemable Preferred Stock  Liquidation Preference $25 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UMH^D",
    "Name": "UMH Properties Inc. 6.375% Series D Cumulative Redeemable Preferred Stock Liquidation Preference $25 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UNF",
    "Name": "Unifirst Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UNFI",
    "Name": "United Natural Foods Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UNH",
    "Name": "UnitedHealth Group Incorporated Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UNM",
    "Name": "Unum Group Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UNMA",
    "Name": "Unum Group 6.250% Junior Subordinated Notes due 2058",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UNP",
    "Name": "Union Pacific Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UNVR",
    "Name": "Univar Solutions Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UPS",
    "Name": "United Parcel Service Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "URI",
    "Name": "United Rentals Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USA",
    "Name": "Liberty All-Star Equity Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USAC",
    "Name": "USA Compression Partners LP Common Units Representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USB",
    "Name": "U.S. Bancorp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USB^A",
    "Name": "U.S. Bancorp Depositary Shares Each representing a 1/100th interest in a share of Series A Non-CumulativePerpetual Pfd Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USB^H",
    "Name": "U.S. Bancorp Depositary Shares repstg 1/1000th Pfd Ser B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USB^M",
    "Name": "U.S. Bancorp Depositary Shares Representing 1/1000th Interest in a Shares Series F",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USB^P",
    "Name": "U.S. Bancorp Depositary Shares each representing a 1/1000th interest in a share of Series K Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USB^Q",
    "Name": "U.S. Bancorp Depositary Shares Each Representing a 1/1000th Interest in a Share of Series L Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USB^R",
    "Name": "U.S. Bancorp Depositary Shares Each Representing a 1/1000th Interest in a Share of Series M Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USDP",
    "Name": "USD Partners LP Common Units representing limited partner interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USFD",
    "Name": "US Foods Holding Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USM",
    "Name": "United States Cellular Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USNA",
    "Name": "USANA Health Sciences Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USPH",
    "Name": "U.S. Physical Therapy Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "USX",
    "Name": "U.S. Xpress Enterprises Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UTF",
    "Name": "Cohen & Steers Infrastructure Fund Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UTI",
    "Name": "Universal Technical Institute Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UTL",
    "Name": "UNITIL Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UTZ",
    "Name": "Utz Brands Inc Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UVE",
    "Name": "UNIVERSAL INSURANCE HOLDINGS INC Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UVV",
    "Name": "Universal Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UWMC",
    "Name": "UWM Holdings Corporation Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UZA",
    "Name": "United States Cellular Corporation 6.95% Senior Notes due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UZB",
    "Name": "United States Cellular Corporation 7.25% Senior Notes due 2063",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UZC",
    "Name": "United States Cellular Corporation 7.25% Senior Notes due 2064",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UZD",
    "Name": "United States Cellular Corporation 6.250% Senior Notes due 2069",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "UZE",
    "Name": "United States Cellular Corporation 5.500% Senior Notes due 2070",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "V",
    "Name": "Visa Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VAC",
    "Name": "Marriott Vacations Worldwide Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VALE",
    "Name": "VALE S.A.  American Depositary Shares Each Representing one common share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VAPO",
    "Name": "Vapotherm Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VAR",
    "Name": "Varian Medical Systems Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VBF",
    "Name": "Invesco Bond Fund Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VCIF",
    "Name": "Vertical Capital Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VCRA",
    "Name": "Vocera Communications Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VCV",
    "Name": "Invesco California Value Municipal Income Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VEC",
    "Name": "Vectrus Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VEDL",
    "Name": "Vedanta Limited  American Depositary Shares (Each representing four equity shares)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VEEV",
    "Name": "Veeva Systems Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VEI",
    "Name": "Vine Energy Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VEL",
    "Name": "Velocity Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VER",
    "Name": "VEREIT Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VER^F",
    "Name": "VEREIT Inc. 6.70% Series F Cumulative Redeemable Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VET",
    "Name": "Vermilion Energy Inc. Common (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VFC",
    "Name": "V.F. Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VGAC",
    "Name": "VG Acquisition Corp. Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VGI",
    "Name": "Virtus Global Multi-Sector Income Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VGM",
    "Name": "Invesco Trust for Investment Grade Municipals Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VGR",
    "Name": "Vector Group Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VHC",
    "Name": "VirnetX Holding Corp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VHI",
    "Name": "Valhi Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VIAO",
    "Name": "VIA optronics AG American Depositary Shares each representing one-fifth of an Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VICI",
    "Name": "VICI Properties Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VIPS",
    "Name": "Vipshop Holdings Limited American Depositary Shares each representing two ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VIST",
    "Name": "Vista Oil & Gas S.A.B. de C.V. American Depositary Shares each representing one series A share with no par value",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VIV",
    "Name": "Telefonica Brasil S.A. American Depositary Shares (Each representing One Common Share)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VKQ",
    "Name": "Invesco Municipal Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VLO",
    "Name": "Valero Energy Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VLRS",
    "Name": "Controladora Vuela Compania de Aviacion S.A.B. de C.V. American Depositary Shares each representing ten (10) Ordinary Participation Certificates",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VLT",
    "Name": "Invesco High Income Trust II",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VMC",
    "Name": "Vulcan Materials Company (Holding Company) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VMI",
    "Name": "Valmont Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VMO",
    "Name": "Invesco Municipal Opportunity Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VMW",
    "Name": "Vmware Inc. Common stock Class A",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNCE",
    "Name": "Vince Holding Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNE",
    "Name": "Veoneer Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNO",
    "Name": "Vornado Realty Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNO^K",
    "Name": "Vornado Realty Trust Pfd S K",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNO^L",
    "Name": "Vornado Realty Trust Pfd Ser L %",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNO^M",
    "Name": "Vornado Realty Trust 5.25% Series M Cumulative Redeemable Preferred Shares of Beneficial Interest liquidation preference $25.00 per share no par value per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNO^N",
    "Name": "Vornado Realty Trust 5.25% Series N Cumulative Redeemable Preferred Shares of Beneficial Interest liquidation preference $25.00 per share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNT",
    "Name": "Vontier Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VNTR",
    "Name": "Venator Materials PLC Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VOC",
    "Name": "VOC Energy Trust Units of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VOYA",
    "Name": "Voya Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VOYA^B",
    "Name": "Voya Financial Inc. Depositary Shares each representing a 1/40th interest in a share of 5.35% Fixed-Rate Reset Non-Cumulative Preferred Stock Series B",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VPG",
    "Name": "Vishay Precision Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VPV",
    "Name": "Invesco Pennsylvania Value Municipal Income Trust Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VRS",
    "Name": "Verso Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VRT",
    "Name": "Vertiv Holdings LLC Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VRTV",
    "Name": "Veritiv Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VSH",
    "Name": "Vishay Intertechnology Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VST",
    "Name": "Vistra Corp. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VSTO",
    "Name": "Vista Outdoor Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VTA",
    "Name": "Invesco Credit Opportunities Fund Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VTN",
    "Name": "Invesco Trust for Investment Grade New York Municipals Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VTOL",
    "Name": "Bristow Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VTR",
    "Name": "Ventas Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VVI",
    "Name": "Viad Corp Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VVNT",
    "Name": "Vivint Smart Home Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VVR",
    "Name": "Invesco Senior Income Trust Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VVV",
    "Name": "Valvoline Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "VYGG",
    "Name": "Vy Global Growth Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "W",
    "Name": "Wayfair Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WAB",
    "Name": "Westinghouse Air Brake Technologies Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WAL",
    "Name": "Western Alliance Bancorporation Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WALA",
    "Name": "Western Alliance Bancorporation 6.25% Subordinated Debentures due 2056",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WAT",
    "Name": "Waters Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WBAI",
    "Name": "500.com Limited American Depositary Shares each representing 10 Class A shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WBK",
    "Name": "Westpac Banking Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WBS",
    "Name": "Webster Financial Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WBS^F",
    "Name": "Webster Financial Corporation Depositary Shares Each Representing 1/1000th Interest in a Share of 5.25% Series F Non-Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WBT",
    "Name": "Welbilt Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WCC",
    "Name": "WESCO International Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WCC^A",
    "Name": "WESCO International Inc. Depositary Shares each representing 1/1000th interest in a share of Series A Fixed-Rate Reset Cumulative Perpetual Preferred Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WCN",
    "Name": "Waste Connections Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WD",
    "Name": "Walker & Dunlop Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WDR",
    "Name": "Waddell & Reed Financial Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WEA",
    "Name": "Western Asset Bond Fund Share of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WEC",
    "Name": "WEC Energy Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WEI",
    "Name": "Weidai Ltd. American depositary shares each  representing one (1) Class A ordinary share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WELL",
    "Name": "Welltower Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WES",
    "Name": "Western Midstream Partners LP Common Units Representing Limited Partner Interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WEX",
    "Name": "WEX Inc. common stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WF",
    "Name": "Woori Financial Group Inc. American Depositary Shares (each representing three (3) shares of Common Stock)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC",
    "Name": "Wells Fargo & Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^A",
    "Name": "Wells Fargo & Company Depositary Shares each representing a 1/1000th interest in a share of Non-Cumulative Perpetual Class A Preferred Stock Series AA",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^C",
    "Name": "Wells Fargo & Company Depositary Shares each representing a 1/1000th interest in a share of Non-Cumulative Perpetual Class A Preferred Stock Series CC",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^L",
    "Name": "Wells Fargo & Company Wells Fargo & Company 7.50% Non-Cumulative Perpetual Convertible Class A Preferred Stock Series L",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^N",
    "Name": "Wells Fargo & Company Dep Shs Repstg 1/1000th Perp Pfd Cl A Ser N",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^O",
    "Name": "Wells Fargo & Company Depositary Shares Representing 1/1000th Perpetual Preferred Class A Series O",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^Q",
    "Name": "Wells Fargo & Company Depositary Shares Representing 1/1000th Interest Perpetual Preferred Class A Series Q Fixed to Floating",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^R",
    "Name": "Wells Fargo & Company Dep Shs Repstg 1/1000th Int Perp Pfd Cl A (Ser R Fixed To Flltg)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^X",
    "Name": "Wells Fargo & Company Depositary Shares each representing a 1/1000th interest in a share of Non-Cumulative Perpetual Class A Preferred Stock Series X",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^Y",
    "Name": "Wells Fargo & Company Depositary Shares each representing a 1/1000th interest in a share of Non-Cumulative Perpetual Class A Preferred Stock Series Y",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFC^Z",
    "Name": "Wells Fargo & Company Depositary Shares each representing a 1/1000th interest in a share of Non-Cumulative Perpetual Class A Preferred Stock Series Z",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WFG",
    "Name": "West Fraser Timber Co. Ltd Common stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WGO",
    "Name": "Winnebago Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WH",
    "Name": "Wyndham Hotels & Resorts Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WHD",
    "Name": "Cactus Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WHG",
    "Name": "Westwood Holdings Group Inc Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WHR",
    "Name": "Whirlpool Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WIA",
    "Name": "Western Asset Inflation-Linked Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WIT",
    "Name": "Wipro Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WIW",
    "Name": "Western Asset Inflation-Linked Opportunities & Income Fund",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WK",
    "Name": "Workiva Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WLK",
    "Name": "Westlake Chemical Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WLKP",
    "Name": "Westlake Chemical Partners LP Common Units representing limited partner interests",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WLL",
    "Name": "Whiting Petroleum Corporation Common Stock (New)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WM",
    "Name": "Waste Management Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WMB",
    "Name": "Williams Companies Inc. (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WMC",
    "Name": "Western Asset Mortgage Capital Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WMK",
    "Name": "Weis Markets Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WMS",
    "Name": "Advanced Drainage Systems Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WMT",
    "Name": "Walmart Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WNC",
    "Name": "Wabash National Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WNS",
    "Name": "WNS (Holdings) Limited Sponsored ADR (Jersey)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WOR",
    "Name": "Worthington Industries Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WORK",
    "Name": "Slack Technologies Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WOW",
    "Name": "WideOpenWest Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WPC",
    "Name": "W. P. Carey Inc. REIT",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WPF",
    "Name": "Foley Trasimene Acquisition Corp. Class A CommonStock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WPG",
    "Name": "Washington Prime Group Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WPG^H",
    "Name": "Washington Prime Group Inc. 7.5% Series H Cumulative Redeemable Preferred SBI",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WPG^I",
    "Name": "Washington Prime Group Inc. 6.875% Series I Cumulative Redeemable Preferred SBI",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WPM",
    "Name": "Wheaton Precious Metals Corp Common Shares (Canada)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WPP",
    "Name": "WPP plc American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRB",
    "Name": "W.R. Berkley Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRB^D",
    "Name": "W.R. Berkley Corporation 5.75% Subordinated Debentures due 2056",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRB^E",
    "Name": "W.R. Berkley Corporation 5.70% Subordinated Debentures due 2058",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRB^F",
    "Name": "W.R. Berkley Corporation 5.10% Subordinated Debentures due 2059",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRB^G",
    "Name": "W.R. Berkley Corporation 4.25% Subordinated Debentures due 2060",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRB^H",
    "Name": "W.R. Berkley Corporation 4.125% Subordinated Debentures due 2061",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRE",
    "Name": "Washington Real Estate Investment Trust Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRI",
    "Name": "Weingarten Realty Investors Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WRK",
    "Name": "Westrock Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WSM",
    "Name": "Williams-Sonoma Inc. Common Stock (DE)",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WSO",
    "Name": "Watsco Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WSO/B",
    "Name": "Watsco Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WSR",
    "Name": "Whitestone REIT Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WST",
    "Name": "West Pharmaceutical Services Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WTI",
    "Name": "W&T Offshore Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WTM",
    "Name": "White Mountains Insurance Group Ltd. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WTRG",
    "Name": "Essential Utilities Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WTRU",
    "Name": "Essential Utilities Inc. 6.00% TEU",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WTS",
    "Name": "Watts Water Technologies Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WTTR",
    "Name": "Select Energy Services Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WU",
    "Name": "Western Union Company (The) Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WWE",
    "Name": "World Wrestling Entertainment Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WWW",
    "Name": "Wolverine World Wide Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "WY",
    "Name": "Weyerhaeuser Company Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "X",
    "Name": "United States Steel Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XEC",
    "Name": "Cimarex Energy Co Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XFLT",
    "Name": "XAI Octagon Floating Rate & Alternative Income Term Trust Common Shares of Beneficial Interest",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XHR",
    "Name": "Xenia Hotels & Resorts Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XIN",
    "Name": "Xinyuan Real Estate Co Ltd American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XL",
    "Name": "XL Fleet Corp. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XOM",
    "Name": "Exxon Mobil Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XPEV",
    "Name": "XPeng Inc. American depositary shares each representing two Class A ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XPO",
    "Name": "XPO Logistics Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XPOA",
    "Name": "DPCM Capital Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XRX",
    "Name": "Xerox Holdings Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XYF",
    "Name": "X Financial American Depositary Shares each representing six Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "XYL",
    "Name": "Xylem Inc. Common Stock New",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "Y",
    "Name": "Alleghany Corporation Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YAC",
    "Name": "Yucaipa Acquisition Corporation Class A Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YALA",
    "Name": "Yalla Group Limited American Depositary Shares each representing one Class A Ordinary Share",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YELP",
    "Name": "Yelp Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YETI",
    "Name": "YETI Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YEXT",
    "Name": "Yext Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YPF",
    "Name": "YPF Sociedad Anonima Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YRD",
    "Name": "Yiren Digital Ltd. American Depositary Shares each representing two ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YSG",
    "Name": "Yatsen Holding Limited American Depositary Shares each representing four Class A ordinary shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YUM",
    "Name": "Yum! Brands Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "YUMC",
    "Name": "Yum China Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZBH",
    "Name": "Zimmer Biomet Holdings Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZEN",
    "Name": "Zendesk Inc. Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZEPP",
    "Name": "Zepp Health Corporation American Depositary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZIM",
    "Name": "ZIM Integrated Shipping Services Ltd. Ordinary Shares",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZNH",
    "Name": "China Southern Airlines Company Limited Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZTO",
    "Name": "ZTO Express (Cayman) Inc. American Depositary Shares each representing one Class A ordinary share.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZTR",
    "Name": "Virtus Total Return Fund Inc.",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZTS",
    "Name": "Zoetis Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZUO",
    "Name": "Zuora Inc. Class A Common Stock",
    "": "",
    "__1": "",
    "__2": ""
  },
  {
    "Symbol": "ZYME",
    "Name": "Zymeworks Inc. Common Shares",
    "": "",
    "__1": "",
    "__2": ""
  }
]