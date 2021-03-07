import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
const Http = new XMLHttpRequest();

/*Steven Barker*/

var loggedIn = false;

function App() {

  const check = async function (details){
    console.log('2');
    Http.open("GET", `http://localhost:3500/login/${details.email}/${details.password}`);
    Http.send();
    var toReturn = "I returned this";
    console.log('3');
    Http.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        console.log('4');
        console.log('5');
        toReturn = Http.responseText;
      }
      
    }
    console.log()
    return(toReturn);
    
  }
  const adminUser = {
    email: "admin@admin.com",
    password: "password"
  }
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
  
  const Login = (details) => {
    Http.open("GET", `http://localhost:3500/login/${details.email}/${details.password}`);
    Http.send();
    var toReturn = "I returned this";
    Http.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseText);
        if(Http.responseText != ""){
            //console.log(`name: ${usersname}`);
            console.log("logged in");
            setUser({
              email: details.email,
              name: Http.responseText
            });
            setUser({
              email: details.email,
              name: Http.responseText
            });
            loggedIn = true;
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