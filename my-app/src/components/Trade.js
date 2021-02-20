import { FaTimes } from 'react-icons/fa'

const Task = (props) => {
    return(
        <div className = "task">
            <h3>{props.task.text} <FaTimes style = {{color: "red"}}
                                           onClick = {() => props.onDelete(props.task.id)} /> </h3>
            <p>Date Traded: {props.task.date}</p>
            <p> {props.task.bought == true ? "Buying " : "Selling"}</p>
            <p>Amount: {props.task.amount}</p>
        </div>
    )
}

export default Task