import Task from "./Task"

const Tasks = (props) => {

    return(
        //This is how you might add to tasks
        //setTasks([...tasks, {}])
        <div>
            {/* .map creates a list? and then we give it a function? and the function has jsx code?*/}
            {props.tasks.map((task) => (
                <Task key={task.id} task = {task} onDelete = {props.onDelete} />
            ))}
        </div>
    )

}

export default Tasks