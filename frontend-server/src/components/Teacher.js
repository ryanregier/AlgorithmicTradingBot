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
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),

    },

    stocks: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3, 3, 3),
    },

    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },

    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },

    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
        alignItems: 'center',
    },
    cardMedia: {
        width: 160,
        backgroundImage: 'url(https://source.unsplash.com/B7rqd7NCe_g)',

    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album(props) {
    const classes = useStyles();
    //const { post } = props;

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
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                            </Grid>
                        </div>
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
                <div className={classes.stocks}>
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
                <div className={classes.stocks}>
                    <Container maxWidth="xl" spacing={10}>
                        <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                            Do Stocks only go up?
                        </Typography>
                        <Typography spacing="m" variant="h6" align="left" color="textSecondary" paragraph>
                            A stock is a type of investment that represents an ownership share in a company.
                            Investors buy stocks that they think will go up in value over time... A stock is an investment.
                        </Typography>
                    </Container>
                </div>
            </main>

            <Grid item xl={12} md={6}>
                <CardActionArea component="a" href="https://www.investopedia.com/terms/s/stock.asp">
                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                    More about Stocks
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    4.7.2021
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    In this post you can read more about what stocks are and how they work!
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Continue reading...
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </CardActionArea>
            </Grid>

            <Grid item xs={12} md={6}>
                <CardActionArea component="a" href="#">
                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                    More about Trading Algorithms
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    4.7.2021
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    In this post you can read more about how our algorithm works!
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Continue reading...
                                </Typography>
                            </CardContent>
                        </div>
                        <Hidden xsDown>
                            <CardMedia className={classes.cardMedia}/>
                        </Hidden>
                    </Card>
                </CardActionArea>
            </Grid>
        </React.Fragment>
    );
}
