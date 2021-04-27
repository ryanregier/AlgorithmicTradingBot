import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";

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

    const update = () =>{

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
        }
    };

    return (
        <div>This is a big test
            {/*{getInfo("test")}*/}
            <div>{info.email}  <input type="text" name="name" id="name" required/></div>
            <div>{info.role}  <input type="text" name="name" id="name" required/></div>
            <div>{info.username} <input type="text" name="name" id="name" required/></div>
            <div>{info.dateCreated}  <input type="text" name="name" id="name" required/></div>
            <div>{info.firstName}  <input type="text" name="name" id="name" required/></div>
            <div>{info.lastName}  <input type="text" name="name" id="name" required/></div>
            <div>{info.password}  <input type="text" name="name" id="name" required/></div>

            {/*{console.log(props.key+ " " + props.user)}*/}
            <div><button onClick = {getInfo}>account</button></div>
            <div><button onClick = {update}>update</button></div>

        </div>
    );

}

export default AccountPage;