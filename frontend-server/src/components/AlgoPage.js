import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormControlLabel, Paper, Switch, Zoom} from "@material-ui/core";

const Http = new XMLHttpRequest();

const useStyles = makeStyles((theme) => ({

    Header: {
        margin: theme.spacing(5),
        alignItems: 'center',

    },

    mainTwo: {
        margin: theme.spacing(3),
        alignItems: 'flex-start',
    },

    tma: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(5),
    },

    v: {
        marginLeft: theme.spacing(5),
    },

    reasons: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(3),
    },

    // paper: {
    //     width: '95%',
    //     marginLeft: theme.spacing(3),
    //     height: theme.spacing(20),
    //     background: 'linear-gradient(0deg, #ffffff 5%, #f3f3f3 15%)',
    // }

}));




function AlgoPage({setPage}){

    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <divM>
            <Typography variant={'h2'} className={classes.Header}>
                Algo page
            </Typography>


            <Typography variant={'h6'}  className={classes.mainTwo}>
                The two main algorithms the WSB utilizes are a Triple Moving Averages algorithm and Volume Weighted Average Price (VWAP) algorithm.
            </Typography>

            {/*<Paper className={classes.paper}>*/}
                <Typography align="left" className={classes.tma} paragraph>
                    The triple moving averages algo employs three moving averages of different time periods. A fast, medium, and slow moving average.
                    The algo will use three different time periods to help confirm buy and sell signals as using only two weighted averages (exponential weighted averages in our case)
                    can trigger false signals.
                </Typography>

                <Typography align="left" className={classes.v} paragraph>
                    The VWAP algo provides us with a more accurate depiction of a fair value for a stock by using volume in the weighting of the price. This helps
                    us see if we think a stock is under or overvalued based on the trading price of the equity in relation to the VWAP calculation. A stock may be undervalued if the VWAP is greater than the trading price.
                    The formula for VWAP is (summation of [volume * price])/(summation[volume]).
                </Typography>

            {/*</Paper>*/}

            <Typography align="left" className={classes.reasons} paragraph>
                The reason we utilize algorithmic trading on top of our manual trading is because an algorithm
                is the most effective way to sustainably day trade. Instead of spending constant hours in front of several monitors viewing information flow and manually executing trades, an algorithm
                can calculate much quicker the signals and execute a trade with much better accuracy. We also have our expert trading teams monitoring these algos throughout the market hours to ensure client satisfation and
                reliable profit. We have a top notch quant research team looking for new ways to beat the markets.
            </Typography>


            <div className={classes.root}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="What is the WSB doing right now?"
                />
                <div className={classes.container}>
                    <Zoom in={checked}>
                        <Typography variant={'h3'} color={"red"} >
                            *It is currently making money*
                        </Typography>
                    </Zoom>
                </div>
            </div>

        </divM>

    )
}

export default AlgoPage