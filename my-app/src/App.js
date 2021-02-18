//import logo from './logo.svg';
//import './App.css';
import Header from './components/Header.js'
import React from 'react'
import Tasks from "./components/Tasks"
import AddTask  from "./components/AddTask"
import {useState} from 'react'


// Class component
// class App extends React.Component{
//     render(){
//         return <h1>Hello from a class</h1>
//     }
// }
// //
//Function compponent
function App() {
    //This makes our list a part of the component and it is called the State.
    //The list called tasks is no longer unchangable per say
    //We cant dirrectly change it but we can use setTasks to recreate the list

    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Game Stop",
            date: "December 19,2020",
            bought: true,
            amount: 70
        },
        {
            id: 2,
            text: "Tesla",
            date: "January 23, 2021",
            bought: false,
            amount: 30,
        },
        {
            id: 3,
            text: "W.A.M.",
            date: "February 12, 2021",
            bought: true,
            amount: 1000,
        },
        {
            id: 4,
            text: "Game Stop",
            date: "February 1, 2021",
            bought: false,
            amount: 69,
        },
    ])

    //piece of state
    const [showAddTask, setShowAskTask] = useState(false)

    //addtask
    const addTask = (task) => {
        const id = Math.floor(Math.random()*1000) +1
        const newTask = {id, ...task}
        setTasks([...tasks,newTask])
    }

    //Delete Task
    const deleteTask= (id) => {
        console.log('delete', id)
        setTasks(tasks.filter((task) => task.id !== id))
    }
  return (
    <div className="container">
        <Header title = "Trades Queued" onAdd = {() => setShowAskTask(!showAddTask)} showAdd = {showAddTask}/>
        {/* && is basical ? : with out an else wich is and if else statement*/}
        {showAddTask && <AddTask onAdd = {addTask} />}
        {tasks.length > 0 ? <Tasks tasks = {tasks}
                                   onDelete = {deleteTask}
        /> : "No Trades"}
    </div>
  )
}

export default App;
