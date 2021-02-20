import { FaTimes } from 'react-icons/fa'

const Trade = (props) => {
    return(
        <div className = "task">
            <h3>{props.trade.sym} <FaTimes style = {{color: "red"}}
                                           onClick = {() => props.onDelete(props.trade.id)} /> </h3>
            <p>Quantity: {props.trade.qty}</p>
            {/*<p> {props.trade.bought == true ? "Buying " : "Selling"}</p>*/}
            <p>Side: {props.trade.side}</p>
            <p>Type: {props.trade.type}</p>
            <p>Time in Force: {props.trade.time_in_force}</p>
            <p>Price Limit: {props.trade.limit_price}</p>
        </div>
    )
}

export default Trade