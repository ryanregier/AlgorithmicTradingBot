import $ from "jquery"
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button"

let plot = "http://localhost:3500/html/temp-plot.html"
let vid = "http://localhost:3500/sound/Wellerman_Stock_Market_edition.mp3"
function jQueryCode(){
    $(document).ready(function () {
        $(".html").load(plot)
    });

}

function PortfolioPage(){
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
    return (
        <div>
            <script src={$}></script>
            <h1 className = "html"></h1>

            <Button onClick={playSound}>Play</Button>
            <Button onClick={pauseSound}>Pause</Button>
            <Button onClick={stopSound}>Stop</Button>

            {jQueryCode()}
        </div>
    )
}

export default PortfolioPage;