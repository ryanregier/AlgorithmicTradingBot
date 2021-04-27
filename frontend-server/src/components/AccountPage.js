import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

const Http = new XMLHttpRequest();



const AccountPage = (props) => {
    const [info, setInfo] = useState(
        {
            email: "null",
            role: "null",
            username: "null",
            dateCreated: "null",
            firstName: "null",
            lastName: "null",
            password: "null"
        });

    const [tempInfo, setTempInfo] = useState(
        {
            email: "null",
            role: "null",
            username: "null",
            dateCreated: "null",
            firstName: "null",
            lastName: "null",
            password: "null"
        });

    const update = () =>{
        Http.open('POST', 'http://localhost:3500/accountchange');
        console.log("Changing Account");
        console.log("was: "+JSON.stringify(info));
        console.log("Is: "+JSON.stringify(tempInfo));
        Http.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        Http.send(JSON.stringify(tempInfo));
    }


    const getInfo = (e) => {
        console.log("Asking for account info");
        // e.preventDefault();
        console.log("just cheking");
        const name = "willima";
        const last = "carrera"
        Http.open("GET", `http://localhost:3500/accountinfo/william.carrera@my.wheaton.edu/password`);
        //get (first name, last name, email, googleID)
        //put it all in the route
        Http.send();
    }

    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText);
            console.log(info);
            setInfo(info);
            setTempInfo(info);
        }
    };

    return (
        <div>This is a big test
            {/*{getInfo("test")}*/}
            <div>{info.email}
            <TextField
                autoComplete="fname"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={e => setTempInfo({...tempInfo, email: e.target.value})}
            />
            </div>
            <div>{info.role} </div>
            <div>{info.username}
                <TextField
                    autoComplete="fname"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    autoFocus
                    onChange={e => setTempInfo({...tempInfo, username: e.target.value})}
                />
            </div>
            <div>{info.dateCreated} </div>
            <div>{info.firstName}
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={e => setTempInfo({...tempInfo, firstName: e.target.value})}
                />
            </div>
            <div>{info.lastName}
                <TextField
                    autoComplete="fname"
                    name="lastName"
                    variant="outlined"
                    required
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    autoFocus
                    onChange={e => setTempInfo({...tempInfo, lastName: e.target.value})}
                />
            </div>
            <div>{info.password}
                <TextField
                    autoComplete="fname"
                    name="password"
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    autoFocus
                    onChange={e => setTempInfo({...tempInfo, password: e.target.value})}
                />
            </div>

            {/*{console.log(props.key+ " " + props.user)}*/}
            <div><button onClick = {getInfo}>account</button></div>
            <div><button onClick = {update}>update</button></div>

        </div>
    );

}

export default AccountPage;