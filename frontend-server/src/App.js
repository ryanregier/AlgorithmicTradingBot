import './App.css';
import React, {useState} from 'react';
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

import AuthApi from "./AuthApi"
import Cookies from 'react-cookies';


import { PinDropSharp } from '@material-ui/icons';

const Http = new XMLHttpRequest();
/*Steven Barker*/


const App = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
    const Auth = React.useContext(AuthApi);

  const readCookies = () =>{

      const user = Cookies.load("email",true); //Might need to use another word that user
      const password = Cookies.load("password",true);

      //For example I might want to input their user name
      //Maybe factor out the part that verifies them with the database and also use it here

      Http.open("GET", `http://localhost:3500/login/${user}/${password}`);
      Http.send();
      console.log("checking cookies http request");
      Http.onreadystatechange = function (e) {
          if (this.readyState == 4 && this.status == 200) {
              console.log(Http.responseText);
              if(Http.responseText != ""){
                  setLoggedIn(true)
                  // Auth.setLoggedIn(true)
                  console.log("still logged in");
                  setUser({name: Http.responseText, email: user});
                  localStorage.setItem('email', user);
                  localStorage.setItem('password',user);
                  console.log(localStorage.getItem('email'));
                  console.log(localStorage.getItem('password'));
              }else{
                  console.log("failure Here");
                  console.log(loggedIn)
                  setError("Details do not match");
              }
          }
      }

  }
  // React.useLayoutEffect(() => {
  //     readCookies()
  // })




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
            //Auth.setLoggedIn(true);
            Cookies.save("email",details.email,
            {
                path: "/"
            }
            )
            Cookies.save("password",details.password,
            {
                path: "/"
            })

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
      setLoggedIn(false)
      //Auth.setLoggedIn(false);
      Cookies.remove("email",
          {
          path: "/"
      }
      )
      Cookies.remove("password",{
          path: "/"
      })//Maybe don't use "user" this a ha ha ha
    console.log("Logout");
    setUser(({name: "", email: ""}));
    return 1;
  }


  return (
    <div className="App">
        <AuthApi.Provider value = {{loggedIn, setLoggedIn}}>
            <Router>
                {readCookies()}
                <Routes Login = {Login} Logout = {Logout}/> {/*Probably going to need components*/}
            </Router>
        </AuthApi.Provider>

      {/*<Switch>*/}
        {/*<Route exact path="/">*/}
        {/*{(loggedIn) ? (*/}
        {/*  <div>*/}
        {/*<ButtonAppBar Logout={Logout}/>*/}
        {/*<MainPortfolio />*/}
        {/*</div>*/}
        {/*)*/}
        {/*:(<SignIn Login={Login}/>)}*/}
        {/*</Route>*/}
        {/*<Route exact path="/login">*/}
        {/*    <SignIn Login={Login}/>*/}
        {/*</Route>*/}
        {/*<Route exact path="/algo">*/}
        {/*{(loggedIn) ? (*/}
        {/*  <div>*/}
        {/*    <ButtonAppBar Logout={Logout}/>*/}
        {/*    <AlgoPage />*/}
        {/*  </div>*/}
        {/*):(<SignIn Login={Login}/>)}*/}
        {/*</Route>*/}
      {/*<Route exact path="/buysell/:sym">*/}
      {/*  {(loggedIn) ? (*/}
      {/*    <div>*/}
      {/*      <ButtonAppBar Logout={Logout}/>*/}
      {/*      <BuySellPage />*/}
      {/*    </div>*/}
      {/*  ):(<SignIn Login={Login}/>)}*/}
      {/*</Route>*/}
          {/*<Route exact path="/SignUp">*/}
          {/*    <SignUp/>*/}
          {/*</Route>*/}
      {/*<Route exact path="/about">*/}
      {/*  {(loggedIn) ? (*/}
      {/*    <div>*/}
      {/*      <ButtonAppBar Logout={Logout}/>*/}
      {/*      <AboutPage />*/}
      {/*    </div>*/}
      {/*  ):(<SignIn Login={Login}/>)}*/}
      {/*</Route>*/}
          {/*<Route exact path="/teacher">*/}
          {/*    {(loggedIn) ? (*/}
          {/*        <div>*/}
          {/*            <ButtonAppBar Logout={Logout}/>*/}
          {/*            <Teacher />*/}
          {/*        </div>*/}
          {/*    ):(<SignIn Login={Login}/>)}*/}
          {/*</Route>*/}
    {/*</Switch>*/}
    </div>
  ) 
}
{/* REMEMBER THAT THESE ROUTES NEED THINGS GOING INTO THEM*/}
{/*THIS ONE OFFICER*/}
{/*This exact path is wrong*/}

const Routes = ({Login,Logout}) => {
    const Auth = React.useContext(AuthApi)
    return(
        <Switch>

            {/*This exact path is wrong*/}
            <ProtectedLogin exact path="/" Login = {Login} auth = {Auth.loggedIn} component={SignIn}/>
            <ProtectedRoutes exact path="/about" Logout = {Logout} auth = {Auth.loggedIn} component={AboutPage}/>
            <ProtectedRoutes exact path="/teacher" Logout = {Logout} auth = {Auth.loggedIn} component = {Teacher}/>
            <ProtectedRoutes exact path="/signup" Logout = {Logout} auth = {Auth.loggedIn} component={SignUp}/>
            <ProtectedRoutes exact path="/buysell/:sym" Logout = {Logout} auth = {Auth.loggedIn} component={BuySellPage}/>
            <ProtectedRoutes exact path="/algo" Logout = {Logout} auth = {Auth.loggedIn} component={AlgoPage}/>
            <ProtectedRoutes exact path="/mainportfolio" Logout = {Logout} auth = {Auth.loggedIn} component={MainPortfolio}/>
        </Switch>
    )
}

const ProtectedRoutes = ({Logout, auth, component:Component,...rest}) => {
    return(
        <div>
            {console.log("Uhm loading?")}
            <ButtonAppBar Logout={Logout}/>
        <Route
            {...rest}
            render ={() => auth? (
                <Component/>
            ):
                (
                    <Redirect to={"/"}/>
            // This path is not right
                )
            }
        />
        </div>
    )
}
const ProtectedLogin = ({Login,auth, component:Component,...rest}) => {
    return(
        <Route
            {...rest}
            render ={() => !auth? (
                    <Component Login={Login}/>
                ):
                (
                    <Redirect to={"/mainportfolio"}/>
                    // This path is not right
                )
            }
        />
    )
}


export default App;