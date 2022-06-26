import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";
import MoveUpRoundedIcon from "@mui/icons-material/MoveUpRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import Divider from "@mui/material/Divider";
import { IndeterminateCheckBoxSharp } from "@mui/icons-material";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function MixCreate({ setAuth, isLoggedIn, token, username }) {
  const [mixtapeTitle, setMixtapeTitle] = useState('')
  const [mixtapeDescription, setMixtapeDescription] = useState('')
  const [allResults, setAllResults] = useState([])
  // const [trackList, setTrackList] = useState([])
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [checked, setChecked] = React.useState([]);
  // const [results, setresults] = React.useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [trackList, setTrackList] = React.useState([]);
  const resultsChecked = intersection(checked, allResults);
  const trackChecked = intersection(checked, trackList);

  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  function handleSearch() {
    axios
      .get(
        `https://team-tornado-mixtape.herokuapp.com/api/search?track=${searchTerm}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
        setAllResults(res.data)
      })
      .catch((e) => {
        setError(e.message)
      })
    console.log(error)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedTrack = () => {
    setTrackList(trackList.concat(resultsChecked));
    setAllResults(not(allResults, resultsChecked));
    setChecked(not(checked, resultsChecked));
  };

  const handleCheckedResult = () => {
    setAllResults(allResults.concat(trackChecked));
    setTrackList(not(trackList, trackChecked));
    setChecked(not(checked, trackChecked));
  };

  const SongResTrackList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected"
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: "80vw",
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto"
        }}
        dense
        component="div"
        role="list"
      >
        {/* {allResults.map((eachResult, index, value) => {
          const ResultTitle = eachResult.title
          const ResultArtist = eachResult.album
          // const AnswerBody = eachAnswer.body
          // const TotalAnswers = eachAnswer.total_answers
          // const AnswerCreatedAt = eachAnswer.created_at
          // return (
          //   { */}
        {/* {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`; */}

        {allResults.map((eachResult, index, value) => {
          const labelId = `transfer-list-all-item-${index}-label`;
          const ResultTitle = eachResult.title
          const ResultArtist = eachResult.album

          return (
            <ListItem
              key={index}
              role="listitem"
              button
              onClick={handleToggle(index)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={index} primary={`List item ${index + 1}`} />
              <ListItemText id={index}>{ResultTitle}</ListItemText>
            </ListItem>
          );
        })
        }
        < ListItem />
      </List>
    </Card>
  );

  return (
    <>
      <Typography variant="h3">Mixtape title</Typography>
      <br></br>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="search by track name"
          onChange={handleChange}
          value={searchTerm}
        />
        <Button onClick={handleSearch} color="secondary" variant="contained">
          Search
        </Button>
        <Grid item>{SongResTrackList("Search results", allResults)}</Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <IconButton
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedTrack}
              disabled={resultsChecked.length === 0}
              aria-label="add selected to tracklist"
            >
              <MoveDownRoundedIcon />
            </IconButton>
            <IconButton
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedResult}
              disabled={trackChecked.length === 0}
              aria-label="remove selected from tracklist"
            >
              <MoveUpRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>{SongResTrackList("My tracklist", trackList)}</Grid>
        {/* </Grid> */}
      </Stack>
      <Typography variant="p">Customization</Typography>
      <br></br>
      <Stack spacing={2} direction="row">
        <Button color="secondary" variant="contained">
          Default
        </Button>
        <Button variant="contained">Theme 1</Button>
        <Button color="secondary" variant="contained">
          Theme 2
        </Button>
        <Button variant="contained">Theme 3</Button>
        <Stack spacing={6} direction="row">
          <Button color="secondary" variant="contained">
            Upload image
          </Button>
        </Stack>
      </Stack>
      <br></br>
      <Typography variant="p">Preview</Typography>
      <Box
        sx={{
          width: "50%",
          height: 350,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      ></Box>
      <br></br>
      <Stack spacing={50} direction="row">
        <Button variant="contained">Back</Button>
        <Button onClick={handleSearch} color="secondary" variant="contained">
          Save mixtape
        </Button>
      </Stack>
    </>
  );
}
