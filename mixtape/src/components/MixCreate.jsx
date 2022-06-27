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
  )
}
