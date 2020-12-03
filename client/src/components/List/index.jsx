import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function TracksList({ tracks }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    console.log(checked)

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDownload = songId => {
    const API_URL = 'http://127.0.0.1:5000';
    axios.post(`${API_URL}/api/download-songs`, songId, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  return (
    <Container maxWidth="lg">
      <Box p={6}>
        {checked && checked.length > 0 ?
          checked.map(t => {
            console.log(t);
            return (
              <div className={classes.chips}>
                <Chip
                  avatar={<Avatar alt="Song" src={t.thumbnails[0]} />}
                  label={t.title}
                  onDelete={() => console.log(`You clicked on ${t}`)}
                  color="secondary"
                />
              </div>
            )
          }
          ) : null}
        <Paper>
          <List className={classes.root}>
            {tracks.videos.map((value) => {

              const { id, title, duration, channel, views } = value;
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
                    <IconButton edge="end" aria-label="comments">
                      <GetAppIcon onClick={() => handleDownload(id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}
