import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Images from "./Images"
import Typography from "@material-ui/core/Typography"

//Not Important
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
//Not Important


let port1 = "http://localhost:3500/images/port1.jpg"
let port2 = "http://localhost:3500/images/port2.jpg"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


//Function compponent
function MainPortfolio() {

    const classes = useStyles();

  return (
      <body>
    <div>
        <Images image = {port1}></Images>
    </div>
    <div>
        <Images image = {port2}></Images>
    </div>
          {/*<Box component={"span"} m={3}>*/}
          {/*  <Typography variant = "h1" align = "center"> idk why no work </Typography>*/}
          {/*    <Button> test</Button>*/}
          {/*</Box>*/}
          {/*  <Container fixed>Why is this no work*/}
          {/*      <Button> test3</Button>*/}
          {/*      <Typography component = "div" sytle = {{backgroundColor: "#cfe8fc", height: "100vh"}}></Typography>*/}
          {/*  </Container>*/}
      </body>

  )
}




export default MainPortfolio;