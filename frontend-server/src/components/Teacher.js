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


const useStyles = makeStyles((theme) => ({

    heroContent: {
       // background:  'linear-gradient(0deg, #ffffff 1%, #f3f3f3 15%)',
        padding: theme.spacing(8, 0, 6),

    },

    stocks: {
        //backgroundColor: "#F8B195",
        background: '#ffffff',
        padding: theme.spacing(3, 3, 3),
    },

    algo: {
        //backgroundColor: "#F67280",
        background: '#ffffff',
        padding: theme.spacing(3, 3, 3),
    },

    onlyUp: {
        background: '#ffffff',
        padding: theme.spacing(3, 3, 3),
    },

    cardGrid: {
        padding: theme.spacing(1),
    },

    cardContainer1: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(4),
    },

    cardContainer2: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(0),
        paddingBlockEnd: theme.spacing(4),
    },


    card: {
        paddingTop: theme.spacing(3),
        display: 'flex',
        background: '#F8B192',
        //backgroundColor: "#355C7D",
    },

    cardDetails: {
        flex: 1,
    },

    cardMedia: {
        width: 160,
        backgroundImage: 'url(https://source.unsplash.com/B7rqd7NCe_g)',
    },
}));

export default function Album() {
    const classes = useStyles();


    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Stocks 101
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            On this page we will teach you some of the basics about markets, stocks and what it takes to
                            be a person who invests!
                        </Typography>
                    </Container>
                </div>

                <div className={classes.stocks}>
                    <Container maxWidth="xl" spacing={10}>
                        <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                            What is a stock?
                        </Typography>
                        <Typography spacing="m" variant="h6" align="left" color="textSecondary" paragraph>
                            A stock is a type of investment that represents an ownership share in a company.
                            Investors buy stocks that they think will go up in value over time... A stock is an investment.
                        </Typography>
                    </Container>
                </div>
                <div className={classes.algo}>
                    <Container maxWidth="xl" spacing={10}>
                        <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                            What is a trading algorithm?
                        </Typography>
                        <Typography variant="h6" align="left" color="textSecondary" paragraph>
                            Algorithmic trading (also called automated trading, black-box trading, or algo-trading) uses a computer program that follows a defined set of instructions (an algorithm) to place a trade.
                            The defined sets of instructions are based on timing, price, quantity, or any mathematical model.
                        </Typography>
                    </Container>
                </div>
                <div className={classes.onlyUp}>
                    <Container maxWidth="xl" spacing={10}>
                        <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                            Do Stocks only go up?
                        </Typography>
                        <Typography spacing="m" variant="h6" align="left" color="textSecondary" paragraph>
                            Yes. Well... no.</Typography>
                    </Container>
                </div>
            </main>


            <Grid container direction={'row'} className={classes.cardContainer1}>
            <Grid item xs={12} md={6} direction='row' className={classes.cardGrid}>
                <CardActionArea component="a" href="https://www.investopedia.com/terms/s/stock.asp" target={"_blank"}>
                    <Card className={classes.card}>
                        <div className={classes.cardDetails} >
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                    More about Stocks
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    In this post you can read more about what stocks are and how they work!
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </CardActionArea>
            </Grid>

                <Grid item xs={12} md={6} direction='row' className={classes.cardGrid}>
                <CardActionArea component="a" href="https://www.investopedia.com/articles/active-trading/101014/basics-algorithmic-trading-concepts-and-examples.asp" target={"_blank"}>
                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                    More about Trading Algorithms
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    In this post you can read more about how our algorithm works!
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </CardActionArea>
                </Grid>
            </Grid>


            <Grid container direction={'row'} className={classes.cardContainer2}>
                <Grid item xs={12} md={6} direction='row' className={classes.cardGrid}>
                    <CardActionArea component="a" href="https://timothyplan.com/" target={"_blank"}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails} >
                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        Faith and Investing
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        On this page you can learn more about faith and investing!
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    </CardActionArea>
                </Grid>

                <Grid item xs={12} md={6} direction='row' className={classes.cardGrid}>
                    <CardActionArea component="a" href="https://www.investopedia.com/terms/f/financial-market.asp" target={"_blank"}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        What is a Financial Market?
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        In this post you can read more about financial markets!
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    </CardActionArea>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}
