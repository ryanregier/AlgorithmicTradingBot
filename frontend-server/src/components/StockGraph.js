import React,{useEffect, useState, useRef} from 'react';
import Plot from 'react-plotly.js';




const StockGraph = ({symbol}) => {
   //const [trace, setTrace] = useState({});
    const trace = useRef({});
    const layout = useRef({});
    //const [xvalues, setXValues] = useState([]);
    //const [yvalues, setYValues] = useState([]);
    console.log(`sym: ${symbol}`);
    
    const APIKEY = 'S80EJ0D7Q3K4PDY8'
    const APICALL =  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${APIKEY}`

    const getData = () => {
        let xvals = [];
        let low = [];
        let close = [];
        let open = [];
        let high = [];
        let range


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
                    trace.current = ({
                        x: xvals, 
                        close: close, 
                        decreasing: {line: {color: '#7F7F7F'}},
                        high: high,
                        increasing: {line: {color: '#17BECF'}}, 
                        line: {color: 'rgba(31,119,180,1)'},
                        low: low,
                        open: open,
                        type: 'candlestick', 
                        xaxis: 'x', 
                        yaxis: 'y'
                    });
                    console.log(trace);
                    layout.current = {
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
                          range: [xvals[0], xvals[99]], 
                          rangeslider: {range: [xvals[0], xvals[99]]}, 
                          title: 'Date', 
                          type: 'date'
                        }, 
                        yaxis: {
                          autorange: true, 
                          domain: [0, 1], 
                          range: [0, 5000], 
                          type: 'linear'
                        }
                      };

                }
            )
    };

    useEffect(()=>{getData();});


    return (
        <Plot
        data={[trace.current]}
        layout={layout.current}
      />
    )
};

export default StockGraph;