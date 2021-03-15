import Button from './Buttons'
import ButtonAppBar from './AppBar'

function AlgoPage({setAlgoPage,setHomePage}){
    return (
        <div>
            <ButtonAppBar setAlgoPage = {setAlgoPage} setHomePage={setHomePage}/>
            <Button color = "red" text = "Run Algo" onClick = {runAlgo}/>
            
        </div>

    )
}

function runAlgo(){

}

export default AlgoPage