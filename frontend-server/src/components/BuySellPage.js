import {useParams} from "react-router-dom";
import React, {useState, useEffect, useRef} from 'react';
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
import {Alert} from "@material-ui/lab";
import getPrice from "./alpacafunctions";



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

    const [symbol, setSymbol] = useState("");
    const [stats, setStats] = useState({});
    const [loaded, setLoaded] = useState(false);
    const trace = useRef({});
    const price = useRef(0);

    if(sym != symbol){
        setLoaded(false);
        setSymbol(sym);
    }


    const APIKEY = 'S80EJ0D7Q3K4PDY8'
    const APICALL =  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=5min&outputsize=compact&apikey=${APIKEY}`


    useEffect(() => {
        if(!loaded) {
            //getting graph data and price
            let xvals = [];
            let low = [];
            let close = [];
            let open = [];
            let high = [];

            const APIKEY = 'S80EJ0D7Q3K4PDY8'
            const APICALL =  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=5min&outputsize=compact&apikey=${APIKEY}`

            fetch(APICALL)
                .then(
                    function (response) {
                        return response.json();
                    }
                ).then(
                function (data) {
                    // console.log(data);
                    for (var key in data['Time Series (5min)']) {
                        xvals.push(key)
                        close.push(data['Time Series (5min)'][key]['4. close']);
                        open.push(data['Time Series (5min)'][key]['1. open']);
                        high.push(data['Time Series (5min)'][key]['2. high']);
                        low.push(data['Time Series (5min)'][key]['3. low']);
                    }
                    price.current = open[open.length-1];

                    return {xvals: xvals, close: close, open: open, high: high, low: low};


                }
            )
                .then(
                    function (data) {
                        trace.current = {
                            x: data.xvals,
                            close: data.close,
                            decreasing: {line: {color: '#F8B192'}},
                            high: data.high,
                            increasing: {line: {color: '#355C7D'}},
                            line: {color: 'rgba(31,119,180,1)'},
                            low: data.low,
                            open: data.open,
                            type: 'candlestick',
                            xaxis: 'x',
                            yaxis: 'y'
                        };
                        setLoaded(true);
                    }
                )
        }
    });


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
    const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD',});

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
                    <Typography variant='h2'>{formatter.format(price.current)}{sym}</Typography>
                    <Plot
                        data={[trace.current]}
                        layout={{
                            width: 750,
                            height: 440,
                            dragmode: 'zoom',
                            margin: {
                                r: 10,
                                t: 25,
                                b: 40,
                                l: 60
                            },
                            showlegend: false,
                            xaxis: {
                                autorange: true,
                                domain: [0, 1],
                                // range: ['2017-01-03 12:00', '2017-02-15 12:00'],
                                // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
                                title: (!loaded) ? 'NO GRAPH DATA' : `${sym}`,
                                type: 'date'
                            },
                            yaxis: {
                                autorange: true,
                                domain: [0, 1],
                                range: [114.609999778, 137.410004222],
                                type: 'linear'
                            }
                        }}
                    />
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