import './App.css';
import React, {useState, useEffect} from 'react';
import AccountPage from "./components/AccountPage";
import SignIn from "./components/SignIn";
import Teacher from './components/Teacher';
import AlgoPage from "./components/AlgoPage";
import ButtonAppBar from './components/AppBar';
import PortfolioPage from './components/Portfolio';
import AboutPage from './components/AboutPage';
import BuySellPage from './components/BuySellPage';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import getStocks from './components/alpacafunctions';
import {useGoogleLogout} from 'react-google-login';


const clientId = "438254214584-ttdmqtst6a9npnr8oeigsfnailhijaip.apps.googleusercontent.com";
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIEN_ID);

const Http = new XMLHttpRequest();
/*Steven Barker*/

const App = () => {

  const [user, setUser] = useState(null);
  
  
  const googleSuccess = (res) => {
      const verified = client.verifyIdToken({
          idToken: res.tokenObj.id_token,
          audience:process.env.GOOGLE_CLIENT_ID
      }).then((value) => { return value.getPayload().email_verified})
        .then((verified) =>{
            if(verified) {
                Http.open("GET", `http://localhost:3500/googleId/${res.googleId}`);
                Http.send();
                console.log("sending http request");
                Http.onreadystatechange = function (e) {
                    if (this.readyState == 4 && this.status == 200) {
                        const acct = JSON.parse(Http.responseText);
                        console.log(acct);
                        if(res.googleId == acct.googleId){
                            setUser(res);
                        }else{
                            console.log("setting user to null on line 44");
                            setUser(null);
                        }

                    }
                }
            }else {
                console.log("setting user to null on line 51");
                setUser(null);
            }
        });
   // setUser(res);
  }


  const onLogoutSuccess = (res) => {
    setUser(null);
    console.log(`res: ${res}`);
  }
  
  const onFailure = (err) => {console.log(err);}
  
  const { signOut, loaded } = useGoogleLogout({
    onFailure,
    //redirectUri,
    clientId,
    onLogoutSuccess
  })

  const isLoggedIn = () =>{
    try{

      return user.isSignedIn();
    }catch (err){
        try {
            return user.loggedIn;
        }catch (e) {
            return false;
        }
    }
  }

  const Login = (details) => {
    console.log("Inside Login function");
    Http.open("GET", `http://localhost:3500/login/${details.email}/${details.password}`);
    Http.send();
    Http.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
          if(Http.responseText != ""){
              console.log(Http.responseText);
            setUser(JSON.parse(Http.responseText));
            setUser({...user,loggedIn:true});
          }else{
            console.log("failure");
            setUser(null);
          }
        }
      }
  }

  const Logout = () => {
    console.log("Logout");
    setUser(null);
  }

  return (
      
    <div className="App">
      <Switch>
        <Route exact path="/">
        {(isLoggedIn()) ? (
         <div>
           {console.log(user)}
        <ButtonAppBar Logout={Logout} signOut={signOut}/>
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
           <ButtonAppBar Logout={Logout} signOut={signOut}/>
           <AlgoPage />
         </div>
        ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
        </Route>
      <Route exact path="/buysell/:sym">
       {(isLoggedIn()) ? (
      <div>
           <ButtonAppBar Logout={Logout} signOut={signOut}/>
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
           <ButtonAppBar Logout={Logout} signOut={signOut}/>
           <AboutPage />
         </div>
       ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
      </Route>
      <Route exact path="/teacher">
        {(isLoggedIn()) ? (
          <div>
            <ButtonAppBar Logout={Logout} signOut={signOut}/>
            <Teacher />
          </div>
          ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
          </Route>
          <Route exact path="/account">
              {(isLoggedIn()) ? (
                  <div>
                      <ButtonAppBar Logout={Logout} signOut={signOut}/>
                      <AccountPage user={user} />
                  </div>
              ):(<SignIn Login={Login} onSuccess={googleSuccess}/>)}
          </Route>
    </Switch>
    </div>
  ) 
}

export default App;