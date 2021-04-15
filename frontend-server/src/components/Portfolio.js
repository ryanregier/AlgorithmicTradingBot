import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Plot from 'react-plotly.js';
import TradesTable from './TradesTable';
import {getAcctInfo, getPos} from './alpacafunctions';
import { Typography } from "@material-ui/core";
import GoogleLogout  from 'react-google-login';


const Http = new XMLHttpRequest();

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD',});
  
const PortfolioPage = () => {
    const [trace, setTrace] = useState({});
    const [totalequity, setEquity] = useState("");
    let xvals = [];
    let yvals = [];

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
        <div>
            <Typography>{formatter.format(totalequity)}</Typography>
            <Plot data={[trace]}/>
           <TradesTable />
        </div>
    )
}

export default PortfolioPage;

 