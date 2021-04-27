import { useEffect, useState } from "react";




const KeyStats = ({symbol}) => {
    const Http = new XMLHttpRequest(); 
    const [sym, setSym] = useState("");
    const[loaded, setLoaded] = useState(false);
    const [stats, setStats] = useState({})
    if(sym.localeCompare(symbol) != 0){
        setLoaded(false);
        setSym(symbol);
    }
   useEffect(()=>{
       if(!loaded){
        console.log('indside useeffect');
        Http.open("GET", `http://localhost:3500/keystats/${sym}`);
        Http.send();
        Http.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(Http.responseText));
            setStats(JSON.parse(Http.responseText)[0]);
            setLoaded(true)
          }
        }
       }
   })
    return(
            (stats != null) ? (
                <div>
                    {stats.longBusinessSummary}
                </div>
            ) : (<div>No info available </div>)

    )

}

export default KeyStats;