import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
import { setConstantValue } from 'typescript';
const Http = new XMLHttpRequest();

/*Steven Barker*/

var loggedIn = false;

function App() {

  const adminUser = {
    email: "admin@admin.com",
    password: "password"
  }
  var [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
  
  const Login = (details) => {
    Http.open("GET", `http://localhost:3500/login/${details.email}/${details.password}`);
    Http.send();
    Http.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseText);
        if(Http.responseText != ""){
            console.log("logged in");
            loggedIn = true;
            var update  = {name: Http.responseText, email: details.email};
            setUser(update);
            //loggedIn = true;
          }else{
            console.log("failure");
            setError("Details do not match");
          }
        }
      }
      console.log("This better not run too soon");
      setUser(({name: "", email: ""}));
  }

  
  const Logout = () => {
    console.log("Logout");
    loggedIn = false
    setUser(({name: "", email: ""}));
  }
  

  return (
    <div className="App">
      {(loggedIn) ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick= {Logout}>Logout</button>
        </div>  
      ): ( 
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  ) 
}

export default App;