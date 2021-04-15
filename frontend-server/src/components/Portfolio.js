import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Plot from 'react-plotly.js';
import TradesTable from './TradesTable';
import data from "@alpacahq/alpaca-trade-api/lib/resources/data";

const Http = new XMLHttpRequest();

const PortfolioPage = () => {
    const [trace, setTrace] = useState({})
    let xvals = [];
    let yvals = [];
    
    useEffect(()=>{
        Http.open("GET", `http://localhost:3500/positions`);
        Http.send();
        Http.onreadystatechange = function (e){
            const data = JSON.parse(Http.responseText);
            for(var i=0;i<data.length;i++){
                xvals.push(data[i].sym);
                yvals.push(data[i].qty);
            }
            setTrace({x:xvals, y:yvals, type:'bar'});
        }   
    },[])

   
    return (
        <div>
            {console.log(trace)}
            <Plot data={[trace]}/>
           <TradesTable />
        </div>
    )
}

export default PortfolioPage;

 