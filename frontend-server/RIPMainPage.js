//import logo from './logo.svg';
//import './App.css';
import Header from './Header.js'
import React from 'react'
import Trades from "./Trades"
import AddTrade  from "./AddTrade"
import {useState} from 'react'
import manualTrade from './alpacafunctions.js'
import Button from './Buttons'
import Images from './Images'
import DownloadLink from "react-download-link";
import React2, { useEffect } from 'react';
import $ from 'jquery';


import logo from '../Images/SB.png'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



// const temp = document.querySelector('input[type="file"]')
// input.addEventListener('load', function(e){
//     const reader = new FileReader()
//     reader.readAsText(input.files[0])
//     reader.onload = function(){
//         console.log(reader.result);
//     }
//
// },false)
let vid = "http://localhost:3500/sound/Wellerman_Stock_Market_edition.mp3"
//let audioTune;
let im1 = "http://localhost:3500/images/info1.jpg";
let im2 = "http://localhost:3500/images/info2.jpg";
let text = "http://localhost:3500/txt/analysis.txt";
let plot = "http://localhost:3500/html/temp-plot.html";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

//Function compponent
function MainPortfolio() {
    const classes = useStyles();
//http://localhost:3000/static/js/C:/Users/William Carrera/Desktop/School/StockBot/AlgorithmicTradingBot/frontend-server/src/Images/SB (1).gif
    //Sound Test
    const audioTune = new Audio(vid);

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



    //This makes our list a part of the component and it is called the State.
    //The list called tasks is no longer unchangable per say
    //We cant dirrectly change it but we can use setTasks to recreate the list

    const [trades, setTrades] = useState([
        {
            id: 1,
            sym: "*Pic of Gamestop*",
            qty: "A lot",
            side: "left",
            type: "Fire type",
            time_in_force: "4 years",
            limit_price: "just a bit"
        },
        {
            id: 2,
            sym: "*Pic of Walmart*",
            qty: "Not a lot",
            side: "right",
            type: "water type",
            time_in_force: "only two months",
            limit_price: "No limit"
        },
        {
            id: 3,
            sym: ":-)",
            qty: "Almost none",
            side: "West Side",
            type: "Poison type",
            time_in_force: "Whole life",
            limit_price: "$100,000"
        },

    ])



    //piece of state
    const [showAddTrade, setShowAskTrades] = useState(false)

    //addtask
    const addTrade = (task) => {
        const id = Math.floor(Math.random()*1000) +1
        //Creat a new Trade Object
        const newTask = {id, ...task}
        //update the task list
        setTrades([...trades,newTask])
        //Call the Alpaca Api function to initialise the trade

        manualTrade(task.sym, task.qty, task.side, task.type, task.time_in_force)


    }

    //Delete Trade
    const deleteTrade= (id) => {
        console.log('delete', id)
        setTrades(trades.filter((task) => task.id !== id))
    }

    function jQueryCode(){
        $(document).ready(function () {
            $(".temp-plot").load(plot)
        });
    }

    return (

        <divM>
            <div>
                <script src={$}></script>
            </div>
            {/*{getSound()}*/}
            {/*{getIm1()}*/}
            {/*{getIm2()}*/}
            {/*{getUrl()}*/}

            {/*<input type="file" onLoad="readFile(this)>">*/}
            {/*<script>*/}
            {/*    function readFile(input) {*/}
            {/*    const file = input.files[0];*/}
            {/*    const reader = new FileReader();*/}
            {/*    reader.readAsText(file);*/}
            {/*    reader.onload = funtion() {*/}

            {/*    };*/}

            {/*    reader.onerro = function(){*/}
            {/*        consol.log(reader.error)*/}
            {/*    };*/}
            {/*}*/}
            {/*</script>*/}


            {/*<div5 dangerouslySetInnerHTML = {__html: reader.result}>*/}
            {/*</div5>*/}

            <div className="toolbar"></div>
            <div className="container">
                <Header title = "Trades Queued" onAdd = {() => setShowAskTrades(!showAddTrade)} showAdd = {showAddTrade}/>
                {/* && is basical ? : with out an else wich is and if else statement*/}
                {showAddTrade && <AddTrade onAdd = {addTrade} />}
                {trades.length > 0 ? <Trades tasks = {trades}
                                             onDelete = {deleteTrade}
                /> : "No Trades"}
            </div>

            <div className = "temp-plot">
                This is a test
            </div>
            <div2>
                <Images image = {im1}/>
            </div2>
            <div3>
                <Images image = {im2}/>
            </div3>
            <div5 className={"logo"}>

            </div5>
            <h3 className="mb-4"></h3>

            <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
            <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
            <input type="button" className="btn btn-danger mr-2" value="Stop" onClick={stopSound}></input>

            <label><input type="checkbox" checked={playInLoop} onChange={e => setPlayInLoop(e.target.checked)} /> Play in Loop</label>
            <div4>

                <DownloadLink
                    label= 'Download_Analysis'
                    filename= 'analysis.txt'
                    exportFile= {() => Promise.resolve(getDataFromURL(text))}
                />
            </div4>
            {jQueryCode()}
        </divM>


    )
}

const getDataFromURL = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                resolve(data)
            });
    });
}, 2000);


//End Sound Test




export default MainPortfolio;
