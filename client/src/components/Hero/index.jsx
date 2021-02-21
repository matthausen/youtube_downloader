import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  donateButton: {
    backgroundColor: 'rgb(255,68,76)',
    color: '#ffffff',
    fontWeight: 800
  },
  paypalImage: {
    maxWidth: 200
  }
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              YouTube Music Download App
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Search millions of songs, albums and artists directly from YouTube
              Convert your favourite tracks to .mp3 and download them onto your laptop or smartphone.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <form action="https://www.paypal.com/donate" method="post" target="_top">
                  <input type="hidden" name="hosted_button_id" value="GFM5BFJ346QUJ" />
                  <input className={classes.paypalImage} type="image" src="https://raw.githubusercontent.com/aha999/DonateButtons/master/Paypal.png" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                  <img alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
                </form>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}