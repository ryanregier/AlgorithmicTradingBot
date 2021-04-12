import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Plot from 'react-plotly.js';
import TradesTable from './TradesTable';



const Http = new XMLHttpRequest();

 

const PortfolioPage = () => {
    const [loaded, setLoaded] = useState(false);
    let xvals = [];
    let yvals = [];
    let trace = {};

    const getData = () => {
        if(!loaded){
            Http.open("GET",`http://localhost:3500/account`);
            Http.send();
            Http.onreadystatechange = function (e) {
                if (this.readyState == 4 && this.status == 200) {
                    const accountdata = JSON.parse(Http.responseText);
                    for(var i=0; i< accountdata.length;i++){
                        xvals.push(accountdata[i].created_at);
                        yvals.push(accountdata[i].portfolio_value);
                    }
                    trace = {x:xvals, y:yvals, type:'scatter'};
                }
            }
            setLoaded(true);
        };
       
    }

    useEffect(()=>{getData();})

   
    return (
        <div>
            {console.log(trace)}
            <Plot data={[trace]}/>
           <TradesTable /> 
        </div>
    )
}

export default PortfolioPage;

 