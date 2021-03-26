import react, {useLayoutEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'

import SignUp from "./SignUp";
import ManualTrades from "./MainPortfolio"

import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container'
import {GiLockedBox} from "react-icons/all";
import React from "react";
import CardMedia from '@material-ui/core';
import {Link as Linker, NavLink, Redirect} from "react-router-dom"

import Images from "./Images";
import logo from "../Images/SB.png"
import animatedLogo from "../Images/SB (1).gif"
import {Image} from "@material-ui/icons";
import {Paper} from "@material-ui/core";
import { BrowserRouter, Switch } from 'react-router-dom'
import ButtonAppBar from "./AppBar";
import {BrowserRouter as Router} from "react-router-dom";
import Route from 'react-router-dom/Route'

const useStyles = makeStyles((theme) => ({

    root: {
        height: '100vh',

    },

    paper: {
        marginTop: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    image: {
        backgroundImage: 'url(https://source.unsplash.com/B7rqd7NCe_g)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },


    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#121212"
    },

    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),

    },

    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#121212",
    },
}));


export default function SignIn({Login, error}) {
    const classes = useStyles();

    const [details, setDetails] = useState({email: "", password: ""});

    const submitHandler = (e) => {
        e.preventDefault();
        Login(details)
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography componenet="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form onSubmit={submitHandler} className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setDetails({...details, password: e.target.value})}
                            value={details.password}/>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <nav>
                                <Linker to='/SignUp'>
                                    {"Click here to Sign up"}
                                </Linker>
                            </nav>
                            <Route
                                path="/SignUp"
                                component={SignUp}
                                exact
                                />
                        </Grid>
                    </form>
                </div>
                <Grid item img src={animatedLogo}/>
            </Grid>
        </Grid>
);
}