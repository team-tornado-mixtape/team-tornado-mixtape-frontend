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
  const [displayedMixes, setDisplayedMixes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setPageDidLoad(true)
    axios
      .get(`https://team-tornado-mixtape.herokuapp.com/api/my/mixtapes/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setDisplayedMixes(res.data);
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
        setDisplayedMixes(res.data)
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
        setDisplayedMixes(res.data)
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
        setDisplayedMixes(res.data)
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
          <Chip
            label="Created by me" variant="outlined"
            onClick={ShowMyMixtapes} />
          <Chip
            label="My favorites" variant="outlined"
            onClick={ShowMyFavoriteMixtapes} />
          <Chip
            label="All mixtapes" variant="outlined"
            onClick={ShowAllMixtapes} />
        </Stack>
        <br></br>
      </Stack>
      {displayedMixes.map((eachMix, index) => {
        return <Box key={index}>
          <Typography>{eachMix.title} @{eachMix.creator}</Typography>
        </Box>;
      })}
    </>
  )
}