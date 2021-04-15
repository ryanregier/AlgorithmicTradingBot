import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Plot from 'react-plotly.js';
import TradesTable from './TradesTable';
import {getAcctInfo} from './alpacafunctions';
import { Typography } from "@material-ui/core";


const Http = new XMLHttpRequest();

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD',});
  


const PortfolioPage = () => {
    const [trace, setTrace] = useState({});
    const [totalequity, setEquity] = useState("$");
    let xvals = [];
    let yvals = [];

    useEffect(async()=>{
        Http.open("GET", `http://localhost:3500/positions`);
        Http.send();
        Http.onreadystatechange = function (e){
            const data = JSON.parse(Http.responseText);
            for(var i=0;i<data.length;i++){
                xvals.push(data[i].sym);
                yvals.push(data[i].qty);
            }
            setTrace({x:xvals, y:yvals, type:'bar', name: 'positions'});
            const acct = getAcctInfo().then((account)=>{
                console.log(account)
                setEquity(account.equity);   
            });

           
        }   
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

 