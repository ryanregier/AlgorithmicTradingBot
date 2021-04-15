import './App.css';
import React, {useState, useEffect} from 'react';
import SignIn from "./components/SignIn";
import MainPortfolio from './components/MainPortfolio';
import Teacher from './components/Teacher';
import Images from "./components/Images";
import AlgoPage from "./components/AlgoPage";
import ButtonAppBar from './components/AppBar';
import PortfolioPage from './components/Portfolio';
import AboutPage from './components/AboutPage';
import BuySellPage from './components/BuySellPage';
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import getStocks from './components/alpacafunctions';

import AuthApi from "./AuthApi"
import Cookies from 'react-cookies';


import { PinDropSharp } from '@material-ui/icons';

const Http = new XMLHttpRequest();
/*Steven Barker*/


const App = () => {

  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  
  
  const googleSuccess = (res) => {
    setUser(res);
    console.log(user);
  }

  const isLoggedIn = () =>{
    try{
      return user.isSignedIn();
    }catch (err){
      return false;
    }
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
            

            console.log("logged in");
            setUser({name: Http.responseText, email: details.email});
          }else{
            console.log("failure"); 
          }
        }
      }
  }

  const CreateAccount = (details) => {
      console.log("Inside CreateAccount function");
      Http.open("GET", `http://localhost:3500/login/${details.email}/${details.password}`);
      Http.send();
      console.log("sending http request");
      Http.onreadystatechange = function (e){
          console.log(localStorage.setItem('firstName', details.firstName));
          console.log(localStorage.setItem('lastName', details.lastName));
          console.log(localStorage.setItem('email', details.email));
          console.log(localStorage.setItem('password', details.password));
      }
  }


  const Logout = () => {
      //setLoggedIn(false)
      //Auth.setLoggedIn(false);
    console.log("Logout");
    setUser(null);
  }


  return (
      
    <div className="App">

      <Switch>
        <Route exact path="/">
        {(isLoggedIn()) ? (
         <div>
        <ButtonAppBar Logout={Logout}/>
        <PortfolioPage />
        </div>
        )
        :(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
        </Route>
        <Route exact path="/login">
           <SignIn Login={Login} onSuccess={googleSuccess}/>
        </Route>
        <Route exact path="/algo">
        {(isLoggedIn()) ? (
         <div>
           <ButtonAppBar Logout={Logout}/>
           <AlgoPage />
         </div>
        ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
        </Route>
      <Route exact path="/buysell/:sym">
       {(isLoggedIn()) ? (
      <div>
           <ButtonAppBar Logout={Logout}/>
           <BuySellPage />
         </div>
        ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
      </Route>
          <Route exact path="/SignUp">
             <SignUp/>
          </Route>
      <Route exact path="/about">
       {(isLoggedIn()) ? (
      <div>
           <ButtonAppBar Logout={Logout}/>
           <AboutPage />
         </div>
       ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
      </Route>
      <Route exact path="/teacher">
        {(isLoggedIn()) ? (
          <div>
            <ButtonAppBar Logout={Logout}/>
            <Teacher />
          </div>
          ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
          </Route>
    </Switch>
    </div>
  ) 
}

export default App;