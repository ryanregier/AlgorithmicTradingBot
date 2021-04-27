import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import  GoogleLogin  from 'react-google-login';

const Http = new XMLHttpRequest();

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#121212',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function SignUp({history}) {
    const [details, setDetails] = useState({});
    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();
        setDetails({...details, googleId:null});
        Http.open("POST", `http://10.12.240.56:3500/signup/`);
        //get (first name, last name, email, password, googleID)
        Http.setRequestHeader("Content-Type", "application/json");
        Http.send(JSON.stringify(details));

        history.push('/')
    }

    const onSuccess = (res)=>{
        //update mongoDB

        Http.open("POST", `http://10.12.240.56:3500/signup/`);
        //get (first name, last name, email, googleID)
        //put it all in the route
        Http.setRequestHeader("Content-Type", "application/json");



        Http.send();
        console.log("sending http request");
        Http.onreadystatechange = function (e) {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Done with sign up");
            }
        }
    }

    const onFailure = (res)=>{
        console.log("SignUp Google Failure")
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={e => setDetails({...details, firstname: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={e => setDetails({...details, lastname: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={e => setDetails({...details, email: e.target.value})} value={details.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setDetails({...details, password: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="#121212"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <GoogleLogin
                        clientId= "438254214584-ttdmqtst6a9npnr8oeigsfnailhijaip.apps.googleusercontent.com"
                        buttonText="SignUp with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        isSignedIn={false}
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default withRouter(SignUp);