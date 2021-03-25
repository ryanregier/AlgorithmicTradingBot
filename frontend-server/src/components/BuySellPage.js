import {useParams} from "react-router-dom";
import {React, useState, useEffect} from 'react';
import $ from 'jquery';


/*
To do:
Replace Hard coded array with alpaca call
Make plotly request dynamic
Add section for buy/sell
*/
const Http = new XMLHttpRequest();

const BuySellPage = () =>{
    const [htmlstring, setHTML] = useState("");
    let {sym} = useParams();
    console.log(sym)
    
    let plot = "http://localhost:3500/html/temp-plot.html";

    /*
    useEffect(()=> {
      Http.open("GET", `http://localhost:3500/historical/${sym}`);
      console.log("sending graph request")
      Http.send();
      Http.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
          setHTML(Http.responseText);
          console.log("setHTML ");
        }
      }
    });
*/
  function jQueryCode(){
    $(document).ready(function () {
        $(".temp-plot").load(plot)
    });
  }
    
    return(
      <divM>
        <div>
            <script src={$}></script>
        </div>
      <div className="whattheheck">
        <h1>{sym}</h1>
      </div>
      <div className="temp-plot"></div>
      {jQueryCode()}
      </divM>
    )
}

export default BuySellPage;