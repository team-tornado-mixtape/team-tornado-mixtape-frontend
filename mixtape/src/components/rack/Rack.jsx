import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Rack({ token }) {
  const [pageDidLoad, setPageDidLoad] = useState(false)
  // const [displayedMixes, setDisplayedMixes] = useState([]);
  const [myMixtapesIsSelected, setMyMixtapesIsSelected] = useState(false)
  const [myMixtapesDisplayed, setMyMixtapesDisplayed] = useState([])
  const [myFavoritesIsSelected, setMyFavoritesIsSelected] = useState(false)
  const [myFavoritesDisplayed, setMyFavoritesDisplayed] = useState([])
  const [allMixtapesIsSelected, setAllMixtapesIsSelected] = useState(false)
  const [allMixtapesDisplayed, setAllMixtapesDisplayed] = useState([])
  const [error, setError] = useState("");

  // what needs doing:
  // - create a state for deselecting a chip and a function that changes each 'displayed' state to an empty array (just like the default states for these)
  // - wrap each of these in a column and arrange them side by side
  // - create a mixtape spine component that displays this data nicely :) 

  useEffect(() => {
    setPageDidLoad(true)
    axios
      .get(`https://team-tornado-mixtape.herokuapp.com/api/my/mixtapes/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setMyMixtapesDisplayed(res.data);
        setMyMixtapesIsSelected(true)
      })
      .catch((e) => {
        setError(e.message);
      });
    console.log(error);
  }, [token, error]);


  function ShowMyMixtapes(e) {
    e.preventDefault();
    axios
      .get(
        `https://team-tornado-mixtape.herokuapp.com/api/my/mixtapes/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(`here is the res.data my mixtapes ${res.data}`)
        setMyMixtapesDisplayed(res.data)
        setMyMixtapesIsSelected(true)
      })
      .catch((e) => {
        setError(e.message)
        console.log('ERROR! This did not work. Please check that the body of the request is formatted properly.')
      })
    console.log(error)
  }

  function ShowMyFavoriteMixtapes(e) {
    e.preventDefault();
    axios
      .get(
        `https://team-tornado-mixtape.herokuapp.com/api/my/favorites/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(`here is the res.data for favorites ${res.data}`)
        setMyFavoritesDisplayed(res.data)
        setMyFavoritesIsSelected(true)
      })
      .catch((e) => {
        setError(e.message)
        console.log('ERROR! This did not work. Please check that the body of the request is formatted properly.')
      })
    console.log(error)
  }

  function ShowAllMixtapes(e) {
    e.preventDefault();
    axios
      .get(
        `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(`here is the res.data all mixtapes ${res.data}`)
        setAllMixtapesDisplayed(res.data)
        setAllMixtapesIsSelected(true)
      })
      .catch((e) => {
        setError(e.message)
        console.log('ERROR! This did not work. Please check that the body of the request is formatted properly.')
      })
    console.log(error)
  }

  return (
    <>
      <Stack spacing={2} direction="column">
        <Typography variant="h2">The Rack</Typography>
        <Stack spacing={2} direction="row">
          {myMixtapesIsSelected ? (
            <Chip
              label="Created by me" color="secondary"
              onClick={ShowMyMixtapes} />
          ) : (
            <Chip
              label="Created by me" variant="outlined"
              onClick={ShowMyMixtapes} />
          )}
          {myFavoritesIsSelected ? (
            <Chip
              label="My favorites" color="secondary"
              onClick={ShowMyFavoriteMixtapes} />
          ) : (
            <Chip
              label="My favorites" variant="outlined"
              onClick={ShowMyFavoriteMixtapes} />
          )}
          {allMixtapesIsSelected ? (
            <Chip
              label="All mixtapes" color="secondary"
              onClick={ShowAllMixtapes} />
          ) : (
            <Chip
              label="All mixtapes" variant="outlined"
              onClick={ShowAllMixtapes} />
          )}
        </Stack>
        <br></br>
      </Stack>
      {myMixtapesDisplayed ? (
        <>
          {myMixtapesDisplayed.map((eachMix, index) => {
            return <Box key={index}>
              <Typography>{eachMix.title} @{eachMix.creator}</Typography>
            </Box>;
          })}
        </>
      ) : (
        <Box></Box>
      )}
      {myFavoritesDisplayed ? (
        <>
          {myFavoritesDisplayed.map((eachMix, index) => {
            return <Box key={index}>
              <Typography>{eachMix.title} @{eachMix.creator}</Typography>
            </Box>;
          })}
        </>
      ) : (
        <Box></Box>
      )}
      {allMixtapesDisplayed ? (
        <>
          {allMixtapesDisplayed.map((eachMix, index) => {
            return <Box key={index}>
              <Typography>{eachMix.title} @{eachMix.creator}</Typography>
            </Box>;
          })}
        </>
      ) : (
        <Box></Box>
      )}
      {/* {displayedMixes.map((eachMix, index) => {
        return <Box key={index}>
          <Typography>{eachMix.title} @{eachMix.creator}</Typography>
        </Box>;
      })} */}
    </>
  )
}