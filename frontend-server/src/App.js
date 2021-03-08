import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
const Http = new XMLHttpRequest();

/*Steven Barker*/

var loggedIn = false;

function App() {
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
  
  const Login = (details) => {
    console.log("Inside Login functions");
    Http.open("GET", `http://10.0.0.3:3500/login/${details.email}/${details.password}`);
    Http.send();
    console.log("sending http request");
    Http.onreadystatechange = function (e) {
      console.log("readychangestate")
      if (this.readyState == 4 && this.status == 200) {
        if(Http.responseText != ""){
            console.log("logged in");
            loggedIn = true;
            var update  = {name: Http.responseText, email: details.email};
            setUser(update); 
          }else{
            console.log("failure");
            setError("Details do not match");
          }
        }
      }
  }

  const Logout = () => {
    console.log("Logout");
    loggedIn = false
    setUser(({name: "", email: ""}));

  }

  return (
    <div className="App">
      {(loggedIn) ? (
        <MainPage/>
      ): ( 
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  ) 
}

export default App;