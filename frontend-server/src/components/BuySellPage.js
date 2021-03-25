import {useParams} from "react-router-dom";


const BuySellPage = () =>{
    let {sym} = useParams();
    return(
        <div>
            <h6>{sym}</h6>
        </div>
    )
}

export default BuySellPage;