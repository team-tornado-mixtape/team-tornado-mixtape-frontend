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

import { Link } from "react-router-dom";

export default function MixCreate({ setAuth, isLoggedIn, token, username }) {
  const [mixtapeTitle, setMixtapeTitle] = useState('')
  const [mixtapeDescription, setMixtapeDescription] = useState('')
  const [allResults, setAllResults] = useState([])
  // const [trackList, setTrackList] = useState([])
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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

  return (
    <>
      <Typography variant="p" color="secondary">By the time this page has been rendered, the POST request for creating a mixtape (POST /mixtapes/) has been called and we have recieved a response that the mixtape was created. We could construct a new GET request (GET /mixtapes/id/) to display the newly created mixtape information on this page. (How will we know the mixtape ID after the initial POST? Can this be given to us in the response from the initial POST?)</Typography>
      <Box sx={{ textAlign: "center", justifyContent: "center", border: "1px solid white" }}>
        <Stack spacing={2} direction="column">
          <TextField
            id="filled-multiline-static"
            label="title"
            defaultValue="My Mixtape"
            variant="filled"
          />
          <TextField
            id="filled-multiline-static"
            label="description"
            multiline
            rows={4}
            defaultValue="Description for my mixtape"
            variant="outlined"
          />
        </Stack>
      </Box>
      <Typography variant="p" color="secondary">The fields above are populated with default values the user may now change. Any changes they make would be kept in state until the user presses 'save mixtape.'</Typography>
      <Box sx={{ textAlign: "left", justifyContent: "center", border: "1px solid white" }}>
        <Stack spacing={10} direction="row">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="search by track name"
            onChange={handleChange}
            value={searchTerm}
          />
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
        </Stack>
        <Typography variant="p">Song search results</Typography>
        <Box
          sx={{
            width: "90%",
            height: 350,
            border: "1px solid white"
          }}
        ><br></br>
          <Typography variant="p">search results will be in a table here. next to each result will be an add button, which, if clicked, will add the song to the mixtape's tracklist.</Typography></Box>
      </Box>
      <br></br>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="column">
          <Typography variant="p">Mixtape Tracklist</Typography>
          <Box
            sx={{
              width: "90%",
              height: 350,
              border: "1px solid white"
            }}>
            <br></br>
            <Typography variant="p">results the user has added to their tracklist will be in a table here. next to each track will be a remove button, which, if clicked, will remove the song from the mixtape's tracklist, and out of this table.</Typography>
          </Box>
          <Typography variant="p" color="secondary">The 'song search results' view is populated with the results from the search (GET /search?track=track+title). When the user clicks the add buttom from within the 'song search results' view, the selected track is immediately PATCHed (PATCH /mixtapes/id/) with that song added in the request body. The same logic would be used when a user decides to remove a track from their tracklist.</Typography>
        </Stack>
        <Box>
          <Typography variant="p">Customization</Typography>
          <br></br>
          <Stack spacing={2} direction="row">
            <Button color="info" variant="outlined">
              Theme 1 (default)
            </Button>
            <Button color="info" variant="outlined">
              Theme 2
            </Button>
            <Button color="info" variant="outlined">
              Theme 3
            </Button>
            <Button color="info" variant="outlined">
              Theme 4
            </Button>
            <Button color="info" variant="outlined">
              Upload Image
            </Button>
          </Stack>
          <Stack direction="column">
            <Typography variant="p">Mixtape Case Preview</Typography>
            <Box
              sx={{
                width: "40vw",
                height: 350,
                backgroundColor: "primary.dark",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            ></Box>
            <br></br>
            <Typography variant="p" color="secondary">Like the track name and description, changes to the theme and the uploading of a photo would be kept in state, until the user presses 'save mixtape'. Then, a PATCH would take place (PATCH /mixtapes/id/) which updates the mixtape's non-song metadata.</Typography>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={"80vw"} direction="row">
          <Button variant="outlined" color="secondary">Cancel</Button>
          <Button variant="contained">
            Save mixtape
          </Button>
        </Stack>
      </Box>
    </>
  )
}
