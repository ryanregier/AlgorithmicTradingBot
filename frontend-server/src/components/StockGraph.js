import { Zoom } from '@material-ui/core';
import React,{useEffect, useState, useRef} from 'react';
import Plot from 'react-plotly.js';




const StockGraph = ({symbol}) => {
    const [loaded, setLoaded] = useState(false); 
    const [sym, setSym] = useState("");
    const trace = useRef({});

    if(sym.localeCompare(symbol) != 0){
      console.log("inside if statement");
      setLoaded(false);
      setSym(symbol);
    }
   
    /*
    let xlow;
    let xhigh;
    let ylow;
    let yhigh;
    */
    
    const APIKEY = 'S80EJ0D7Q3K4PDY8'
    const APICALL =  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${APIKEY}`

    const getData = () => {
      if(!loaded){
        let xvals = [];
        let low = [];
        let close = [];
        let open = [];
        let high = [];


        fetch(APICALL)
            .then(
                function (response){
                    return response.json();
                }
            ).then(
                function(data){
                    console.log(data);
                    
                    for(var key in data['Time Series (5min)']){
                        xvals.push(key)
                        close.push(data['Time Series (5min)'][key]['4. close']);
                        open.push(data['Time Series (5min)'][key]['1. open']);
                        high.push(data['Time Series (5min)'][key]['2. high']);
                        low.push(data['Time Series (5min)'][key]['3. low']);
                    }
                    return {xvals: xvals, close: close, open: open, high: high, low: low};
                    

                }
            )
            .then (
              function(data){
                trace.current = {
                  x: data.xvals, 
                  close: data.close, 
                  decreasing: {line: {color: '#7F7F7F'}},
                  high: data.high,
                  increasing: {line: {color: '#17BECF'}}, 
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
     
    };

    useEffect(()=>{getData();});


    return (
        <Plot
        data={[trace.current]}
        layout={{
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
            range: ['2017-01-03 12:00', '2017-02-15 12:00'], 
            rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']}, 
            title: 'Date', 
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
    )
};

export default StockGraph;