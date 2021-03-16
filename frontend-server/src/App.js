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
// import logo from './Images/SB.png'
/*Steven Barker*/


const App = props => {
  const { history } = props;
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");

  const setURL = newURL => {
    history.push(newURL);
  }
  
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
            console.log(history);
            console.log("logged in");
            setUser({name: Http.responseText, email: details.email});
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
  }

  return (
    <div className="App">
      {console.log("new refresh")}
        <ButtonAppBar/>
        {console.log('loggedIn:')}
          {console.log(loggedIn)}
          {console.log(history.location)}
              <Switch>
                <Route exact path="/">
                {(loggedIn) ? (<MainPage Logout={Logout} />):(<SignIn Login={Login}/>)}
                </Route>
                <Route exact path="/login">
                    <SignIn Login={Login}/>
                </Route>
                <Route exact path="/algo">
                {(loggedIn) ? (<AlgoPage />):(<SignIn Login={Login}/>)}
                </Route>
                <Route exact path="/portfolio">
                {(loggedIn) ? (<PortfolioPage />):(<SignIn Login={Login}/>)}
              </Route>
            </Switch>
    </div>
  ) 
}

export default withRouter(App);