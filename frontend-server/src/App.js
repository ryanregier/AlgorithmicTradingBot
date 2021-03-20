import './App.css';
import React, {useState} from 'react';
import SignIn from "./components/SignIn";
import MainPage from './components/MainPage';
import Images from "./components/Images";
import AlgoPage from "./components/AlgoPage";
import ButtonAppBar from './components/AppBar';
import PortfolioPage from './components/Portfolio';
import { BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';

const Http = new XMLHttpRequest();
/*Steven Barker*/



const App = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
  
  const Login = (details) => {
    console.log("Inside Login function");
    Http.open("GET", `http://localhost:3500/login/${details.email}/${details.password}`);
    Http.send();
    console.log("sending http request");
    Http.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseText);
        if(Http.responseText != ""){
            setLoggedIn(true);
            console.log("logged in");
            setUser({name: Http.responseText, email: details.email});
            localStorage.setItem('email', details.email);
            localStorage.setItem('password',details.password);
            console.log(localStorage.getItem('email'));
            console.log(localStorage.getItem('password'));
          }else{
            console.log("failure"); 
            setError("Details do not match");
          }
        }
      }
  }

  const Logout = () => {
    console.log("Logout");
    setLoggedIn(false);
    setUser(({name: "", email: ""}));
    return 1;
  }

  return (
    <div className="App">
      {console.log("new refresh")}
      {console.log('loggedIn:')}
      {console.log(loggedIn)}
      <Switch>
        <Route exact path="/">
        {(loggedIn) ? (
          <div>
        <ButtonAppBar Logout={Logout}/>
        <MainPage />
        </div>
        )
        :(<SignIn Login={Login}/>)}
        </Route>
        <Route exact path="/login">
            <SignIn Login={Login}/>
        </Route>
        <Route exact path="/algo">
        {(loggedIn) ? (
          <div>
            <ButtonAppBar Logout={Logout}/>
            <AlgoPage />
          </div>
        ):(<SignIn Login={Login}/>)}
        </Route>
        <Route exact path="/portfolio">
        {(loggedIn) ? (
          <div>
            <ButtonAppBar Logout={Logout}/>
            <PortfolioPage />
          </div>
        ):(<SignIn Login={Login}/>)}
      </Route>
    </Switch>
    </div>
  ) 
}

export default App;