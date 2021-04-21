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

    bigContainer: {
        background: 'linear-gradient(0deg, #fafafa 2%, #ffffff 6%)',
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: theme.spacing(5),
        height: theme.spacing(100),
    },

    tradesTable: {
        width: theme.spacing(200),
        alignItems: 'center,'
    },

    dataGraph: {

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
            return({x:xvals, y:yvals, type:'bar', name:'Positions'});
        }).then(dict=>{setTrace(dict)});
        const acct = getAcctInfo().then((account)=>{
            setEquity(account.equity);   
        });
       

    },[])
 
    return (
        <divM>
            <Grid container className={classes.bigContainer}>

                <Grid item>
                    <Typography variant={'h2'} className={classes.totalEquity} >
                        {formatter.format(totalequity)}
                    </Typography>
                </Grid>

                <Grid item className={classes.dataGraph}>
                    <Plot data={[trace]}/>
                </Grid>

                <Container>
                    <TradesTable />
                </Container>

            </Grid>




        </divM>
    )
}

export default PortfolioPage;

 