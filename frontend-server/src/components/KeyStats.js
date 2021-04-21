import { useEffect, useState } from "react";




const KeyStats = ({symbol}) => {
    const Http = new XMLHttpRequest(); 
    const [sym, setSym] = useState("");
    const[loaded, setLoaded] = useState(false);
    const [stats, setStats] = useState({});
    if(sym != symbol){
        setLoaded(false);
        setSym(symbol);
      }
   useEffect(()=>{
       if(!loaded){
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
        <div>
            {stats.longBusinessSummary}
        </div>
    )

}

export default KeyStats;