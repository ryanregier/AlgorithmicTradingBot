import {useParams} from "react-router-dom";
import {React, useState, useEffect, useRef} from 'react';
import $ from 'jquery';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import StockGraph from './StockGraph';
import Plot from 'react-plotly.js';
import KeyStats from './KeyStats';
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container'
import {GiLockedBox} from "react-icons/all";
import CardMedia from '@material-ui/core';
import {Link as Linker, NavLink, Redirect} from "react-router-dom"
import {Image} from "@material-ui/icons";
import {Paper} from "@material-ui/core";
import manualTrade from "./alpacafunctions";


const Http = new XMLHttpRequest();

const useStyles = makeStyles((theme) => ({

  root: {
      height: '100vh',

  },

  paper: {
      marginTop: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },

  image: {
      backgroundImage: 'url(https://source.unsplash.com/B7rqd7NCe_g)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  },


  avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#121212"
  },

  form: {
      width: '90%', // Fix IE 11 issue.
      marginTop: theme.spacing(2),

  },

  submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#121212",
  },
}));


const BuySellPage = () =>{

    const {sym} = useParams();

    const submitHandler = (e) => {
      e.preventDefault();
      var side;
      if(buyorsell)
        side = 'buy';
      else
        side = 'sell'
      manualTrade(sym,numShares,side,'market','gtc');
      console.log("trade executed");
    };
 

  const[numShares, setNumShares] = useState(0);
  const[buyorsell, setBuySell] = useState(true);

  const classes = useStyles();
  const toggleBuySell = () => {
      setBuySell(!buyorsell);
  };

    return(
      <divM>
        <Typography component='h1' variant='h2 '>{sym}</Typography>
        <StockGraph symbol={sym}/>
      <div className="whattheheck">
      </div>
      <div className="temp-plot"></div>
      <Grid item xs={12} sm={8} md={4} component={Paper} square>
                <div className={classes.paper}>
                    {(buyorsell) ? 
                    <Typography componenet="h1" variant="h5">Buy Shares</Typography>
                    : 
                    <Typography componenet="h1" variant="h5">Sell Shares</Typography>}
                   
                    <form onSubmit={submitHandler} className={classes.form}>
                      <FormControlLabel control={<Switch checked={buyorsell} onChange={toggleBuySell} />}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="amount"
                            label="Shares"
                            name="shares"
                            type ="number"
                            autoFocus
                            onChange={e => setNumShares( e.target.value)}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Execute Trade
                        </Button>
                    </form>
                </div>
            </Grid>
        <KeyStats symbol={sym}/>
      </divM>
    )
}

export default BuySellPage;