import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
//import MainPage from './components/MainPage';


/*Steven Barker*/


var loggedIn = false;

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "password"
  }
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
  
  const Login = details => {
    console.log(details);
    if(details.email == adminUser.email&& details.password == adminUser.password){
      console.log("logged in");
      setUser({
        email: details.email,
        name: details.name
      });
      loggedIn = true;
    }else{
      console.log("failure");
      setError("Details do not match");
    }
  }
  
  const Logout = () => {
    console.log("Logout");
    loggedIn = false
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
