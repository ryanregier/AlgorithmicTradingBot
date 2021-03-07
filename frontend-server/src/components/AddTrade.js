import {useState} from 'react'


const AddTrade = (props) => {
    const [sym, setSym] = useState("")
    const [qty, setQty] = useState("")
    const [side, setSide] = useState("")
    const [type, setType] = useState("")
    const [time_in_force,setTime] = useState("")
    const [limit_price, setLimit] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if(!sym){
            alert("please add a task")
        }
        props.onAdd({ sym, qty, side, type,time_in_force,limit_price})
        setSym("")
        setQty("")
        setSide("")
        setType("")
        setTime("")
        setLimit("")
    }

    return (
        <form className='add-form' onSubmit = {onSubmit}>
            <div className='form-control'>
                <label>Symbol</label>
                <input type='text' placeHolder='Add Symbol'
                       value={sym}
                       onChange={(e) => setSym(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Quantity</label>
                <input type='text' placeHolder='Add Quantity'
                       value={qty}
                       onChange={(e) => setQty(e.target.value)}/>
            </div>
            {/*<div className='form-control form-control-check'>*/}
            {/*    <label>Buying?</label>*/}
            {/*    <input type='checkbox'*/}
            {/*            checked ={bought}*/}
            {/*           value={bought}*/}
            {/*           onChange={(e) => setBuying(e.currentTarget.checked)}/>*/}
            {/*</div>*/}
            <div className='form-control'>
                <label>Side</label>
                <input type='text' placeHolder='Add Side'
                       value={side}
                       onChange={(e) => setSide(e.target.value)}/>
            </div>
            <div className='form-control'>
            <label>Type</label>
            <input type='text' placeHolder='Add Type'
                   value={type}
                   onChange={(e) => setType(e.target.value)}/>
             </div>
            <div className='form-control'>
                <label>Time In Force</label>
                <input type='text' placeHolder='Add Time in Force'
                       value={time_in_force}
                       onChange={(e) => setTime(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Price Limit</label>
                <input type='text' placeHolder='Add Limit'
                       value={limit_price}
                       onChange={(e) => setLimit(e.target.value)}/>
            </div>
            <input type="submit" value="Save Trade" className="btn btn-block"/>
        </form>
    )

}

export default AddTrade