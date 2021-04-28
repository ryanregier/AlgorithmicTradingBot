import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import {FormControlLabel, Paper, Switch, Zoom} from "@material-ui/core";

const Http = new XMLHttpRequest();



const AccountPage = ({user}) => {
    const [info, setInfo] = useState(
        {
            email: "null",
            role: "null",
            username: "null",
            dateCreated: "null",
            firstName: "null",
            lastName: "null",
            password: "null",
            accountId: "null",
            googleId: "null"
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
        console.log(user);
        const email = user.email;
        const password = user.password;
        if(password===undefined){
            console.log(user.googleId);
            Http.open("GET", `http://localhost:3500/accountinfogoogle/${user.googleId}`);
            //get (first name, last name, email, googleID)
            //put it all in the route
            Http.send();
        }else {
            console.log(email + " " + password);
            Http.open("GET", `http://localhost:3500/accountinfo/${email}/${password}`);
            //get (first name, last name, email, googleID)
            //put it all in the route
            Http.send();
        }
    }

    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText);
            console.log(info);
            setInfo(info);
            setTempInfo(info);
        }
    };

    const useStyles = makeStyles((theme) => ({

        accountGrid: {
            background: '#f3f3f3',
            width: theme.spacing(50),
            marginTop: theme.spacing(8),
            marginLeft: theme.spacing(75),
            padding: theme.spacing(5, 5, 5),
            flexDirection: 'column'
        }

    }));

    // return (
    //     <div>This is a big test
    //         {/*{getInfo("test")}*/}
    //         <div>
    //             <Typography>
    //                 {info.email}
    //             </Typography>
    //         <TextField
    //             autoComplete="fname"
    //             name="email"
    //             variant="outlined"
    //             required
    //             fullWidth
    //             id="email"
    //             label="Email"
    //             autoFocus
    //             onChange={e => setTempInfo({...tempInfo, email: e.target.value})}
    //         />
    //         </div>
    //         <div>{info.role} </div>
    //         <div>{info.username}
    //             <TextField
    //                 autoComplete="fname"
    //                 name="username"
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 id="username"
    //                 label="User Name"
    //                 autoFocus
    //                 onChange={e => setTempInfo({...tempInfo, username: e.target.value})}
    //             />
    //         </div>
    //         <div>{info.dateCreated} </div>
    //         <div>{info.firstName}
    //             <TextField
    //                 autoComplete="fname"
    //                 name="firstName"
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 id="firstName"
    //                 label="First Name"
    //                 autoFocus
    //                 onChange={e => setTempInfo({...tempInfo, firstName: e.target.value})}
    //             />
    //         </div>
    //         <div>{info.lastName}
    //             <TextField
    //                 autoComplete="fname"
    //                 name="lastName"
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 id="LastName"
    //                 label="Last Name"
    //                 autoFocus
    //                 onChange={e => setTempInfo({...tempInfo, lastName: e.target.value})}
    //             />
    //         </div>
    //         <div>{info.password}
    //             <TextField
    //                 autoComplete="fname"
    //                 name="password"
    //                 variant="outlined"
    //                 required
    //                 fullWidth
    //                 id="password"
    //                 label="Password"
    //                 autoFocus
    //                 onChange={e => setTempInfo({...tempInfo, password: e.target.value})}
    //             />
    //         </div>
    //
    //         {/*{console.log(props.key+ " " + props.user)}*/}
    //         <div><button onClick = {getInfo}>account</button></div>
    //         <div><button onClick = {update}>update</button></div>
    //
    //     </div>
    // );
    const classes = useStyles();

    return (



        <divM>{getInfo()}
            <Grid container xs={8} className={classes.accountGrid}>
                <Grid item>
                    <Typography align={'left'}>
                       Email: {info.email}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography align={'left'}>
                        Username: {info.username}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography align={'left'}>
                        First Name: {info.firstName}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography align={'left'}>
                        Last Name: {info.lastName}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography align={'left'}>
                        Role: {info.role}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography align={'left'}>
                        Account Created: {info.dateCreated}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography align={'left'}>
                        Password: {info.password}
                    </Typography>
                </Grid>

            </Grid>
            {getInfo("test")}
            <div>

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
            <Typography>{info.role} </Typography>
            <Typography>{info.username}
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
            </Typography>
            <Typography>{info.dateCreated} </Typography>
            <Typography>{info.firstName}
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
            </Typography>
            <Typography>{info.lastName}
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
            </Typography>
            <Typography>{info.password}
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
            </Typography>

            {/*{console.log(props.key+ " " + props.user)}*/}
            <div><button onClick = {getInfo}>account</button></div>
            <div><button onClick = {update}>update</button></div>

        </divM>
    );

}

export default AccountPage;