import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AlbumIcon from '@material-ui/icons/Album';
import SearchIcon from '@material-ui/icons/Search';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Hero from '../Hero';
import TracksList from '../List';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
    margin: '0 auto'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: 'rgb(255,68,76)'
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [track, setTrack] = useState();
  const [results, setResults] = useState();

  const handleChange = e => {
    setTrack(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`https://eflpd2s0h0.execute-api.eu-west-2.amazonaws.com/dev/get_songs`, track, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => setResults(res.data))
  }

  return (
    <>
      <Hero />
      <Container>
        <Box p={2}>
          <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <AlbumIcon />
            </IconButton>
            <InputBase
              autoFocus
              className={classes.input}
              onChange={handleChange}
              placeholder="Search for a song or an artist"
              inputProps={{ 'aria-label': 'search song or artist' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} aria-label="directions">
              <MusicNoteIcon />
            </IconButton>
          </Paper>
        </Box>
      </Container>
      {results && <TracksList tracks={results} />}
    </>
  );
}
