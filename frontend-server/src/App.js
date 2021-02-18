import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';


/*Steven Barker*/


function App() {
  const adminUder = {
    email: "admin@admin.com",
    password: "password"
  }
  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");
  
  const Login = details => {
    console.log(details);

    if(details.email == adminUder.email && details.password==adminUder.password){
      console.log("logged in");
      setUser({
        name: details.name,
        email: details.email
      });
    }else{
      console.log("failure");
      setError("Details do not match");
    }
  }
  
  const Logout = () => {
    console.log("Logout");
    setUser({name: "", email:""})
  }
  
  return (
    <div className="App">
      {(user.email != "") ? (
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
