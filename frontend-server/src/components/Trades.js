import Trade from "./Trade"

const Trades = (props) => {

    return(
        //This is how you might add to tasks
        //setTasks([...tasks, {}])
        <div>
            {/* .map creates a list? and then we give it a function? and the function has jsx code?*/}
            {props.tasks.map((trade) => (
                <Trade key={trade.id} trade = {trade} onDelete = {props.onDelete} />
            ))}
        </div>
    )

}

export default Trades