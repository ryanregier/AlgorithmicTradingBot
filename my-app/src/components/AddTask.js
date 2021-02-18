import {useState} from 'react'


const AddTask = (props) => {
    const [text, setTrade] = useState("")
    const [date, setDate] = useState("")
    const [bought, setBuying] = useState(false)
    const [amount, setAmount] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert("please add a task")
        }
        props.onAdd({ text, date, bought, amount})
        setTrade("")
        setDate("")
        setBuying(false)
        setAmount("")
    }

    return (
        <form className='add-form' onSubmit = {onSubmit}>
            <div className='form-control'>
                <label>Trade</label>
                <input type='text' placeHolder='Add Trade'
                       value={text}
                       onChange={(e) => setTrade(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Date</label>
                <input type='text' placeHolder='Add Date'
                       value={date}
                       onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Buying?</label>
                <input type='checkbox'
                        checked ={bought}
                       value={bought}
                       onChange={(e) => setBuying(e.currentTarget.checked)}/>
            </div>
            <div className='form-control'>
                <label>Amount</label>
                <input type='text' placeHolder='Add Amount'
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <input type="submit" value="Save Trade" className="btn btn-block"/>
        </form>
    )

}

export default AddTask