import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Box, Chip, Paper, Avatar, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography,
  Checkbox, IconButton, Tooltip, CircularProgress
} from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';
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
    padding: theme.spacing(4),
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  clearAllIcon: {
    margin: 10,
    fontSize: "2rem"
  },
  downlaodIcon: {
    margin: 10,
    fontSize: '2em'
  }
}));

export default function TracksList({ tracks }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://0.0.0.0:80';

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

  const handleDownload = songId => {
    setLoading(true);
    axios.post(`${API_URL}/api/download-songs`, songId, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status === 200) {
        console.log(`The response: ${res}`);
        setLoading(false);
        setReady(true);
      }
    });
  }

  const handleDeleteFromList = song => {
    const currentIndex = checked.indexOf(song);
    const newChecked = [...checked];
    newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
  }

  const handleClearAll = () => setChecked([]);

  return (
    <Container maxWidth="lg">
      <Box p={6}>
        {loading && <CircularProgress color="secondary" />}
        {ready && <a href={`${API_URL}/api/download-zip`}>Download as .zip</a>}
        {checked && checked.length > 0 ?
          (
            <Box>
              <div className={classes.chips}>
                {checked.map(song =>
                  <Chip
                    avatar={<Avatar alt="Song" src={song.thumbnails[0]} />}
                    label={song.title}
                    onDelete={() => handleDeleteFromList(song)}
                    color="secondary"
                  />
                )}
              </div>
              <div className={classes.actions}>
                <Tooltip title="Download All" aria-label="download-all">
                  <GetAppIcon className={classes.downlaodIcon} color="secondary" onClick={() => handleDownload(checked.map(song => song.id))} />
                </Tooltip>
                <Tooltip title="Clear All" aria-label="clear-all">
                  <ClearAllIcon className={classes.clearAllIcon} color="secondary" onClick={handleClearAll} />
                </Tooltip>
              </div>
            </Box>
          ) : null
        }
        {tracks.videos.length > 0 ? (
          <Paper>
            <List className={classes.root}>
              {tracks.videos.map(value => {

                const { id, title } = value; //more props: duration, channel, views
                const labelId = `checkbox-list-label-${title}`;

                return (
                  <ListItem key={id} role={undefined} dense button onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${title}`} />
                    <ListItemSecondaryAction>
                      <Tooltip title="Download song" aria-label="download-song">
                        <IconButton edge="end" aria-label="comments">
                          <GetAppIcon onClick={() => handleDownload([id])} />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        ) : <Typography variant="body1" component="p">No results were found 😞. Please try again</Typography>}
      </Box>
    </Container>
  );
}
