import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Default from "../../../images/spines/Default.png";
import Wilmington from "../../../images/spines/Wilmington.png";
import Seattle from "../../../images/spines/Seattle.png";
import Momentum from "../../../images/spines/Momentum.png";

import PlayerContainer from "../Player/PlayerContainer.jsx";
// import css from "./SpineText.css";

export default function EachMixtape({
  eachMix,
  index,
  token,
  favoriteClicked,
  setFavoriteClicked,
  setEditClicked,
  editClicked,
  deleteClicked,
  setDeleteClicked,
}) {
  // here are some consts to get you set up:
  // const id = eachMix.id;
  const createDate = eachMix.created_at;
  const creator = eachMix.creator;
  const mixTitle = eachMix.title;
  const songs = eachMix.songs;
  // songs is an array
  const theme = eachMix.theme;
  // theme is a value, 0 - 3
  const isPublic = eachMix.is_public;
  // isPublic is a boolean
  const description = eachMix.description;
  const modifyDate = eachMix.modified_at;
  const deleteMix = eachMix.detail;

  const [selectedMix, setSelectedMix] = useState(0);

  const MixSelect = (id) => {
    // const result = id
    // console.log(result)
    // even if you comment this back in, it still won't work
    setSelectedMix(id);
    console.log(selectedMix);
  };

  console.log(eachMix.id);

  const THEMES = {
    0: "Default",
    1: "Wilmington",
    2: "Seattle",
    3: "Momentum",
  };

  function handleFavorite(e) {
    setFavoriteClicked(false);
    e.preventDefault();
    console.log(
      `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${eachMix.id}/favorites`
    );
    console.log(token);
    axios
      .patch(
        `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${eachMix.id}/favorites`,
        {
          title: mixTitle,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setFavoriteClicked(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  function handleDelete(e) {
    setDeleteClicked(false);
    e.preventDefault();
    console.log(
      `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${eachMix.id}`
    );
    console.log(token);
    axios
      .delete(
        `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${eachMix.id}`,
        {
          detail: deleteMix,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setDeleteClicked(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <>
      <Box key={index}>
        {/* <Card
          sx={{
            width: "28vw",
            variant: "outlined",
            border: "2px solid #E2E2DF",
          }}
        // onClick={() => MixSelect(eachMix.id)}
        >
          <CardContent> */}
        <Button>
          <Box className="cassette-spine" style={{ position: "relative" }} onClick={() => MixSelect(eachMix.id)}>
            {theme === 0 ? (
              <img src={Default} alt="Default"></img>
            ) : theme === 1 ? (
              <img src={Wilmington} alt="Wilmington"></img>
            ) : theme === 2 ? (
              <img src={Seattle} alt="Seattle"></img>
            ) : theme === 3 ? (
              <img src={Momentum} alt="Momentum"></img>
            ) : (<></>)}
            <Typography
              variant="eachmix"
              sx={{
                color: "#000000",
                position: "absolute",
                top: "13px",
                left: "27px",
              }}
            >
              {mixTitle}
            </Typography>
          </Box>
        </Button>
        {/* </CardContent> */}
        <>
          {selectedMix !== 0 ? (
            <PlayerContainer
              token={token}
              selectedMix={selectedMix}
              setSelectedMix={setSelectedMix}
            />
          ) : (
            <>
              {/* <Button onClick={() => MixSelect(eachMix.id)}>
                  Show details for {mixTitle}
                </Button> */}
            </>
          )}
        </>
        {/* </Card> */}
      </Box>
    </>
  );
}
