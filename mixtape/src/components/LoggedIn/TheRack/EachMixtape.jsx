import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MixSpeedDial from "../MixSpeedDial";
import { Stack } from "@mui/material";

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
  const id = eachMix.id;
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

  // const favorites = eachMix.favorited_by;
  // it looks like favorites is an array of users by user id. either that, or the array is just the no. of favorites, though that would be a little extra

  function handleFavorite(e) {
    setFavoriteClicked(false);
    e.preventDefault();
    console.log(
      `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${id}/favorites`
    );
    console.log(token);
    axios
      .patch(
        `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${id}/favorites`,
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
      `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${id}`
    );
    console.log(token);
    axios
      .delete(
        `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${id}`,
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
    <Box key={index}>
      <Card
        sx={{ width: "28vw",  variant: "outlined", border: "2px solid #E2E2DF" }}
      >
        <Stack sx={{ direction: "row"}}>
          <CardContent>
            <Typography>
              {mixTitle} @{creator}
              {/* <Button size="small">Play</Button> */}
              {/* <Button onClick={handleEdit} size="small">
              Edit
            </Button> */}
              {/* <Button onClick={handleFavorite} size="small">
              Favorite
            </Button>
            <Button onClick={handleDelete} size="small">
              Delete
            </Button> */}
            </Typography>
          <MixSpeedDial id={id} />
          </CardContent>
          <CardActions></CardActions>
        </Stack>
      </Card>
    </Box>
  );
}
