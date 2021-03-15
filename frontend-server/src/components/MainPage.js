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

import im1 from '../Images/info1.jpg'
import im2 from '../Images/info2.jpg'
import url from '../Images/analysis.txt'
import logo from '../Images/SB.png'
import vid from '../Images/Wellerman_Stock_Market_edition.mp3'
import { FaLongArrowAltUp } from 'react-icons/fa'

// Class component
// class App extends React.Component{
//     render(){
//         return <h1>Hello from a class</h1>
//     }
// }
// //

//Function compponent
function MainPage({Logout}) {
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
  return (
    <divM>
    <div className="container">
        <Header title = "Trades Queued" onAdd = {() => setShowAskTrades(!showAddTrade)} showAdd = {showAddTrade}/>
        {/* && is basical ? : with out an else wich is and if else statement*/}
        {showAddTrade && <AddTrade onAdd = {addTrade} />}
        {trades.length > 0 ? <Trades tasks = {trades}
                                     onDelete = {deleteTrade}
        /> : "No Trades"}
        <Button color = {"red"} text = {"Logout"} onClick = {Logout}/>
    </div>
    <div2>
         <Images image = {im1}/>
    </div2>
    <div3>
         <Images image = {im2}/>
    </div3>
        <div5 className={"logo"}>
            <Images image = {logo} />
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
          exportFile= {() => Promise.resolve(getDataFromURL(url))}
        />
    </div4>
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




export default MainPage;