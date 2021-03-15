import './App.css';
import React, {useState} from 'react';
import SignIn from "./components/SignIn";
import MainPage from './components/MainPage';
import Images from "./components/Images";
import AlgoPage from "./components/AlgoPage";
const Http = new XMLHttpRequest();

// import logo from './Images/SB.png'
/*Steven Barker*/



function App() {
  const [page, setPage] = useState(-1);
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
  
  const Login = (details) => {
    console.log("Inside Login functions");
    Http.open("GET", `http://localhost:3500/login/${details.email}/${details.password}`);
    Http.send();
    console.log("sending http request");
    Http.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseText);
        if(Http.responseText != ""){
            console.log("logged in");
            var update  = {name: Http.responseText, email: details.email};
            console.log(0);
            setPage(0);
            setUser(update); 
          }else{
            console.log("failure");
            setError("Details do not match");
          }
        }
      }
  }

  const setAlgoPage = () => {
    console.log("setting page to 2");
    setPage(2);
  }

  const Logout = () => {

    console.log("Logout");
    setPage(-1);
    setUser(({name: "", email: ""}));
  }

  return (
    <div className="App">
      {(page == -1) ? (
        <SignIn Login={Login} error={error}/>
      ): (page == 0) ? ( 
        <MainPage Logout = {Logout} setAlgoPage = {setAlgoPage}/>
      ): (page == 2) ? ( 
        <AlgoPage setPage = {setPage}/>
      ): (page == 3) ? ( 
        <MainPage Logout = {Logout}/>
      ): (page == 4) ? ( 
        <MainPage Logout = {Logout}/>
      ): (page == 5) ? ( 
        <MainPage Logout = {Logout}/>
      ):(
        <MainPage Logout = {Logout} setPage = {setPage}/>
      )
      }
    </div>
  ) 
}

export default App;