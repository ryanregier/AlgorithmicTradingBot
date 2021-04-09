import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Plot from 'react-plotly.js';
import TradesTable from './TradesTable';


const Http = new XMLHttpRequest();


function PortfolioPage() {
   
    return (
        <div>
           <TradesTable /> 
        </div>
    )
}

export default PortfolioPage;

 /*
    const audioTune = new Audio(vid);

    audioTune.volume = .05;
// variable to play audio in loop
    const [playInLoop, setPlayInLoop] = useState(false);

// load audio file on component load
    useEffect(() => {
        audioTune.load();
    }, [])

// set the loop of audio tune
    useEffect(() => {
        audioTune.loop = playInLoop;
    }, [playInLoop])

// play audio sound
    const playSound = () => {
        audioTune.play();
    }

// pause audio sound
    const pauseSound = () => {
        audioTune.pause();
    }

// stop audio sound
    const stopSound = () => {
        audioTune.pause();
        audioTune.currentTime = 0;
    }
//End Sound Test

*/
/*
let vid = "http://localhost:3500/sound/Wellerman_Stock_Market_edition.mp3"

function jQueryCode(){
    $(document).ready(function () {
        $(".html").load(plot)
    });

}
*/
