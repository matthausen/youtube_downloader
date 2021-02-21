import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Box, Button, Chip, Paper, Avatar, Link, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography,
  Checkbox, IconButton, Tooltip, CircularProgress, Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SyncIcon from '@material-ui/icons/Sync';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  actions: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: 'rgb(255,68,76)',
    color: '#ffffff',
    margin: 4
  },
  buttonDownload: {
    backgroundColor: '#202020',
    color: 'rgb(255,68,76)',
    margin: 4
  },
  duration: {
    '& > span': {
      float: 'right'
    }
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  whitechapelColor: {
    color: 'rgb(255,68,76)'
  },
  chip: {
    backgroundColor: 'rgb(255,68,76)',
    color: '#ffffff'
  },
  invisible: {
    display: 'none'
  },
  listItem: {
    minWidth: 0
  },
  songCard: {
    margin: 10,
    padding: 10
  },
  thumbnail: {
    margin: '0 10px'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TracksList({ tracks }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [presignedUrls, setPresignedUrls] = useState();
  const [open, setOpen] = useState(false);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const downloadAsMp3 = () => {
    axios.get('https://eflpd2s0h0.execute-api.eu-west-2.amazonaws.com/dev/download_songs')
      .then(res => setPresignedUrls(res.data))
  }

  const handleDownload = songId => {
    setLoading(true);
    axios.post(`https://eflpd2s0h0.execute-api.eu-west-2.amazonaws.com/dev/convert_songs`, songId, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status === 200) {
        setLoading(false);
      } else {
        setOpen(true);
      }
    })
      .finally(() => downloadAsMp3());
  }

  const handleDeleteFromList = song => {
    const currentIndex = checked.indexOf(song);
    const newChecked = [...checked];
    newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
  }

  const handleClearAll = () => setChecked([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
      {loading && (
        <>
          <CircularProgress className={classes.whitechapelColor} />
          <Typography variant="body1" component="p">Converting to mp3...please wait</Typography>
        </>
      )}
      {presignedUrls ? presignedUrls.map(p =>
        <Link href={p}>
          <Button
            variant="contained"
            className={classes.buttonDownload}
            startIcon={<GetAppIcon />}
            onClick={downloadAsMp3}
          >
            Download
        </Button>
        </Link>
      ) : null}
      {checked && checked.length > 0 ?
        (
          <Box>
            <div className={classes.chips}>
              {checked.map(song =>
                <Chip
                  avatar={<Avatar alt="Song" src={song.thumbnails[0]} />}
                  label={song.title}
                  onDelete={() => handleDeleteFromList(song)}
                  className={classes.chip}
                />
              )}
            </div>
            <div className={classes.actions}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => handleDownload(checked.map(song => song.id))}
                startIcon={<SyncIcon />}
              >
                Convert to .mp3
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleClearAll}
                startIcon={<ClearAllIcon />}
              >
                Clear all
              </Button>
            </div>
          </Box>
        ) : null
      }
      {tracks.videos.length > 0 ? (
        <List className={classes.root}>
          {tracks.videos.map(value => {

            const { id, title, thumbnails, duration } = value;
            const labelId = `checkbox-list-label-${title}`;

            return (
              <>
                <Paper className={classes.songCard} elevation={3}>
                  <ListItem key={id} role={undefined} dense button onClick={handleToggle(value)}>
                    <ListItemIcon className={classes.listItem}>
                      {/* <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    /> */}
                    </ListItemIcon>
                    <Avatar className={classes.thumbnail} alt="thumbnail" src={thumbnails[0]} />
                    <ListItemText id={labelId} primary={`${title}`} />
                    <ListItemText className={classes.duration} id={labelId} primary={`min ${duration}`} />
                    <ListItemSecondaryAction>
                      <Tooltip title="Convert song to mp3" aria-label="convert-song">
                        <IconButton edge="end" aria-label="comments">
                          <SyncIcon onClick={() => handleDownload([id])} />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error">Server timed out while downloading. Please try again</Alert>
                </Snackbar>
              </>
            );
          })}
        </List>
      ) : <Typography variant="body1" component="p">No results were found 😞. Please try again</Typography>}
    </Container>
  );
}
