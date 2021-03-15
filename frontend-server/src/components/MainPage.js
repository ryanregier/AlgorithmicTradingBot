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

import im1 from '../Images/info1.jpg'
import im2 from '../Images/info2.jpg'
import url from '../Images/analysis.txt'
import logo from '../Images/SB.png'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

//Function compponent
function MainPage({Logout, setAlgoPage}) {
    const classes = useStyles();
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
    <div className="toolbar">
    <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      Wheaton Stock Bot
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
    </div>
    <div className="container">
        <Header title = "Trades Queued" onAdd = {() => setShowAskTrades(!showAddTrade)} showAdd = {showAddTrade}/>
        {/* && is basical ? : with out an else wich is and if else statement*/}
        {showAddTrade && <AddTrade onAdd = {addTrade} />}
        {trades.length > 0 ? <Trades tasks = {trades}
                                     onDelete = {deleteTrade}
        /> : "No Trades"}
        
        <Button color = {""} text = {"Logout"} onClick = {Logout}/>
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
 


export default MainPage;