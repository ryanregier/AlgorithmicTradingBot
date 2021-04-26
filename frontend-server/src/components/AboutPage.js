import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';
import milk from "../Images/Steven Barker.jpg"
import ryan from "../Images/RyanRegier.jpg"
import jack from "../Images/Headshot.PNG"
//import wsb from "../Images/SB (1).gif"
import {Image} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({

    header: {
        background:  'linear-gradient(0deg, #ffffff 1%, #f3f3f3 15%)',
        padding: theme.spacing(8, 0, 6),

    },

    meetTheTeam: {
        padding: theme.spacing(3, 3, 1),
    },

    ryan: {
        padding: theme.spacing(3, 3, 3),
    },


    cardGrid: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBlockEnd: theme.spacing(4),
    },

    cardContainer1: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBlockEnd: theme.spacing(4),
    },

    cardContainer2: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(0),
        paddingBlockEnd: theme.spacing(4),
    },


    card: {
        display: "flex",
        background: 'linear-gradient(45deg, #ffffff 45%, #f3f3f3 70%)',
        //backgroundColor: "#355C7D",
    },

    cardDetails: {
        flex: 1,
    },

    cardMedia: {
        width: 180,
        height: 160,
    },
}));

export default function Album() {
    const classes = useStyles();


    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.header}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Who We Are
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            WSB (Wheaton Stock Bot) is a group of retail investors that want to make retail investing easier for other students. The markets can be scary, but we don't want that to stop
                            our fellow students from learning how to invest in the stock market.
                        </Typography>
                    </Container>
                </div>



                <div className={classes.meetTheTeam}>
                    <Container maxWidth="xl" spacing={10}>
                        <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                            Meet the Team:
                        </Typography>
                    </Container>
                </div>

                {/*<Container className={classes.cardGrid} maxWidth="md">*/}

                    <Grid container spacing={3} direction={'row'} className={classes.cardContainer1}>

                            <Grid item xl={6} md={5}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={ryan}
                                        title="Image title"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom align={"left"} variant="h5" component="h2">
                                            Ryan Regier
                                        </Typography>
                                        <Typography>
                                            VP of Algo trading. Specialist in creating and back-testing algo that make coin.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                        <Grid item xl={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom align={"left"} variant="h5" component="h2">
                                        William Carrera
                                    </Typography>
                                    <Typography>
                                        President of Audio Department, VP of Smash Bros operations.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xl={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={milk}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom align={"left"} variant="h5" component="h2">
                                        Steven Barker
                                    </Typography>
                                    <Typography>
                                        Full stack developer. Hard coded every ticker on the NYSE, committed career high of 5.1 million lines of code.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xl={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={jack}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom align={"left"} variant="h5" component="h2">
                                        Jack Bennett
                                    </Typography>
                                    <Typography>
                                        Head UI/UX designer, President of Sales Department, all around baller.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Container className={classes.meetTheTeam}>
                            <Typography>
                                {disclaimer}
                            </Typography>
                        </Container>


                    </Grid>
                {/*</Container>*/}

            </main>

        </React.Fragment>
    );
}


var disclaimer = `The Content is for informational purposes only, you should not construe any such information or other material as legal, tax, investment, financial, or other advice. Nothing contained on our Site constitutes a solicitation, recommendation, endorsement, or offer by HII or any third party service provider to buy or sell any securities or other financial instruments in this or in in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction.
    All Content on this site is information of a general nature and does not address the circumstances of any particular individual or entity. Nothing in the Site constitutes professional and/or financial advice, nor does any information on the Site constitute a comprehensive or complete statement of the matters discussed or the law relating thereto. HII is not a fiduciary by virtue of any person’s use of or access to the Site or Content. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other Content on the Site before making any decisions based on such information or other Content. In exchange for using the Site, you agree not to hold HII, its affiliates or any third party service provider liable for any possible claim for damages arising from any decision you make based on information or other Content made available to you through the Site."`
;