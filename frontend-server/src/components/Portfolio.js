import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Plot from 'react-plotly.js';
import TradesTable from './TradesTable';
import {getAcctInfo, getPos} from './alpacafunctions';
import {Container, Typography} from "@material-ui/core";
import GoogleLogout  from 'react-google-login';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({

    totalEquity: {
        marginLeft: theme.spacing(25),
    },

    topPaper: {
      width: '100%',
        height: theme.spacing(20),
      background: 'linear-gradient(0deg, #ffffff 5%, #f3f3f3 15%)',
    },

    bigContainer: {
        background: 'linear-gradient(0deg, #fafafa 2%, #ffffff 6%)',
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(35),
        height: theme.spacing(100),
    },

    tradesTable: {
        width: theme.spacing(180),
        paddingTop: theme.spacing(6),
        paddingLeft: theme.spacing(1),
        flexDirection: 'column',
        alignItems: 'flex-start',
    },


    portfolioOverview: {
        paddingTop: theme.spacing(5),

    },

}));

const Http = new XMLHttpRequest();

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD',});
  
const PortfolioPage = () => {
    const [trace, setTrace] = useState({});
    const [totalequity, setEquity] = useState("");
    let xvals = [];
    let yvals = [];
    const classes = useStyles();

    useEffect(async()=>{
        const pos = getPos().then(response=>{
           for(var i=0;i<response.length;i++){
                xvals.push(response[i].symbol);
                yvals.push(response[i].qty);
            }
            return({x:xvals, y:yvals, type:'bar', name:'Positions', color:'#355C7D'});
        }).then(dict=>{setTrace(dict)});
        const acct = getAcctInfo().then((account)=>{
            setEquity(account.equity);   
        });
       

    },[])
 
    return (
        <divM>
            <Paper className={classes.topPaper} sqaure>
                <Typography variant={'h2'} className={classes.portfolioOverview} >
                    Total Equity, Holdings and Trade History
                </Typography>
            </Paper>


            <Grid container className={classes.bigContainer}>
                <Grid item>
                    <Typography variant={'h2'} className={classes.totalEquity} >
                        {formatter.format(totalequity)}
                    </Typography>
                </Grid>

                <Grid item className={classes.dataGraph}>
                    <Plot data={[trace]}/>
                </Grid>

                    <Grid container  className={classes.tradesTable}>
                        <Grid item>
                            <Typography align={'center'}>
                                Trade History
                            </Typography>
                        </Grid>

                        <TradesTable/>


                    </Grid>




            </Grid>




        </divM>
    )
}

export default PortfolioPage;

 