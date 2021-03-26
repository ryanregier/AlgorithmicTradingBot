import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
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
          <Box component={"span"} m={1} clone>
            <Typography variant = "display1" align = "center" gutterBottom> idk why no work </Typography>
              {/*<Button />*/}
          </Box>
      </body>

  )
}




export default MainPortfolio;