import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import DefaultMini from "../../../images/cassettes/Default_mini.png"
import WilmingtonMini from "../../../images/cassettes/Wilmington_mini.png"
import SeattleMini from "../../../images/cassettes/Seattle_mini.png"
import MomentumMini from "../../../images/cassettes/Momentum_mini.png"

import WizardContainer from "../../LoggedIn/NewMixtape/WizardContainer"

import Tracklist from "../TrackList"

export default function Player({ token, selectedMix, setSelectedMix, username, setOpen }) {
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  const [theme, setTheme] = useState(0)
  const [id, setId] = useState(0)
  const [addMixtapeButtonClicked, setAddMixtapeButtonClicked] = useState(false)
  // const [deleteComplete, setDeleteComplete] = useState(false)
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
      const theme = res.data.theme
      const mixId = res.data.id
      setTitle(mixTitle)
      setCreator(mixCreator)
      setTheme(theme)
      setId(mixId)
      // console.log(`here is the track data: ${trackData}`)
      // setPageDidLoad(true)
    })
    .catch((e) => {
      setError(e.message);
    });
  // console.log(error);

  function handleFavorite(e) {
    // setFavoriteClicked(false);
    e.preventDefault();
    console.log(
      `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${id}/favorites`
    );
    console.log(token);
    axios
      .patch(
        `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${id}/favorites`,
        {
          title: title,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        // setFavoriteClicked(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <>
      <Stack spacing={2} direction="column" textAlign="center" sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h3">{title}</Typography>
        <Stack spacing={5} direction="row">
          <Button variant="contained" color="secondary" onClick={handleFavorite}>Favorite</Button>
          {username === creator ? (
            <>
              <div>
                {addMixtapeButtonClicked === false && (
                  <Button variant="contained" color="primary" onClick={() => setAddMixtapeButtonClicked(true)}>Update</Button>
                )}
                {addMixtapeButtonClicked === true && <WizardContainer username={username} token={token} />}
              </div>
            </>
          ) : (
            <Typography>Created by @{creator}</Typography>
          )}
        </Stack>
        <Box className="cassette-spine" style={{ position: "relative" }}>
          {theme === 0 ? (
            <>
              <img src={DefaultMini} alt="Default" />
            </>
          ) : theme === 1 ? (
            <>
              <img src={WilmingtonMini} alt="Wilmington" />
            </>
          ) : theme === 2 ? (
            <>
              <img src={SeattleMini} alt="Seattle" />
            </>
          ) : theme === 3 ? (
            <>
              <img src={MomentumMini} alt="Momentum" />
            </>
          ) : (
            <>
            </>
          )}
          <Typography
            variant="eachmix"
            sx={{
              color: "#000000",
              position: "absolute",
              top: "62px",
              left: "55px",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Tracklist mixId={selectedMix} token={token} />
      </Stack>
    </>
  );
}
