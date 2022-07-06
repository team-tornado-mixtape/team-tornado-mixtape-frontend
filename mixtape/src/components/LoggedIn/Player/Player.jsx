import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


import Tracklist from "../TrackList"

export default function Player({ token, selectedMix, setSelectedMix, username }) {
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  console.log(`the selected mixID is: ${selectedMix}`)

  axios
    .get(`https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${selectedMix}/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      console.log(res.status);
      console.log(res.data);
      const mixTitle = res.data.title
      const mixCreator = res.data.creator
      setTitle(mixTitle)
      setCreator(mixCreator)
      // console.log(`here is the track data: ${trackData}`)
      // setPageDidLoad(true)
    })
    .catch((e) => {
      setError(e.message);
    });
  // console.log(error);

  return (
    <>
      <Stack spacing={2} direction="column" textAlign="center" sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h3">{title}</Typography>
        <Stack spacing={5} direction="row">
          {username === creator ? (
            <>
              <Button variant="contained">Update</Button>
              <Button variant="outlined" color="secondary">Delete</Button>
            </>
          ) : (
            <Typography>Created by @{creator}</Typography>
          )}
        </Stack>
        <Tracklist mixId={selectedMix} token={token} />
      </Stack>
    </>
  );
}
