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
import Drawer from '@material-ui/core'
import {sizing} from '@material-ui/system'


const Http = new XMLHttpRequest();

const useStyles = makeStyles((theme) => ({

    paper: {
        margin: theme.spacing(5),
        marginLeft: theme.spacing(25),
        width: theme.spacing(30),
        height: theme.spacing(45),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },


    paperRight: {
        margin: theme.spacing(5),
        marginLeft: theme.spacing(5),
        paddingTop: theme.spacing(2),
        width: theme.spacing(45),
        height: theme.spacing(70),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        overflow: 'auto',
    },

    sticky: {
        background: 'linear-gradient(0deg, #fafafa 2%, #ffffff 6%)',
        // backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        //height: theme.spacing(130),
    },

    image: {
        backgroundImage: 'url(https://source.unsplash.com/B7rqd7NCe_g)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    formControl: {
        color: '#555555',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#121212"
    },

    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#121212",
    },

    tickerSymbol: {
        margin: theme.spacing(10),
    },

    stockGraph: {
        margin: theme.spacing(3),
        alignItems: 'center',
    },

    stockInfo: {
        padding: theme.spacing(2),
        fontSize: 16,
    },

    stockHeader: {
        padding: theme.spacing(2),
        fontSize: 45,
    },

}));


const BuySellPage = () => {

    const {sym} = useParams();

    const [stats, setStats] = useState({});

    useEffect(() => {
        console.log('indside useeffect');
        Http.open("GET", `http://localhost:3500/keystats/${sym}`);
        Http.send();
        Http.onreadystatechange = function (e) {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(Http.responseText));
                setStats(JSON.parse(Http.responseText)[0]);
            }
        }
    }, []);


    const submitHandler = (e) => {
        e.preventDefault();
        var side;
        if (buyorsell)
            side = 'buy';
        else
            side = 'sell'
        manualTrade(sym, numShares, side, 'market', 'gtc');
        console.log("trade executed");
    };


    const [numShares, setNumShares] = useState(0);
    const [buyorsell, setBuySell] = useState(true);

    const classes = useStyles();
    const toggleBuySell = () => {
        setBuySell(!buyorsell);
    };

    return (
        <divM>


            <Grid container className={classes.sticky}>

                <Grid item component={Paper} elevation={12}  className={classes.paper}>

                    <form onSubmit={submitHandler} className={classes.form}>

                        {(buyorsell) ?
                            <Typography componenet="h1" variant="h5">Buy Shares</Typography>
                            :
                            <Typography componenet="h1" variant="h5">Sell Shares</Typography>}
                        <FormControlLabel className={classes.formControl}
                                          control={<Switch checked={buyorsell} onChange={toggleBuySell}/>}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="amount"
                            label="Shares"
                            name="shares"
                            type="number"
                            autoFocus
                            onChange={e => setNumShares(e.target.value)}/>
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
                </Grid>

                <Grid item className={classes.tickerSymbol}>
                    <Typography variant='h2'>{sym}</Typography>
                    <StockGraph symbol={sym}/>
                </Grid>


                <Grid item component={Paper} elevation={12} square className={classes.paperRight}>

                    <Typography variant='h1' fontSize={12} align={'center'} className={classes.stockHeader}>
                        {sym} Info
                    </Typography>

                    <Typography variant='h10' align={'left'} className={classes.stockInfo}>
                        <KeyStats symbol={sym}/>
                    </Typography>

                </Grid>

            </Grid>

        </divM>
    )
}

export default BuySellPage;