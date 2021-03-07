//import logo from './logo.svg';
//import './App.css';
import Header from './Header.js'
import React from 'react'
import Trades from "./Trades"
import AddTrade  from "./AddTrade"
import {useState} from 'react'
import AplpacaFunctions from "./alpacafunctions"


// Class component
// class App extends React.Component{
//     render(){
//         return <h1>Hello from a class</h1>
//     }
// }
// //
//Function compponent
function MainPage() {
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



    }

    //Delete Trade
    const deleteTrade= (id) => {
        console.log('delete', id)
        setTrades(trades.filter((task) => task.id !== id))
    }
  return (
    <div className="container">
        <Header title = "Trades Queued" onAdd = {() => setShowAskTrades(!showAddTrade)} showAdd = {showAddTrade}/>
        {/* && is basical ? : with out an else wich is and if else statement*/}
        {showAddTrade && <AddTrade onAdd = {addTrade} />}
        {trades.length > 0 ? <Trades tasks = {trades}
                                     onDelete = {deleteTrade}
        /> : "No Trades"}
    </div>
  )
}

export default MainPage;