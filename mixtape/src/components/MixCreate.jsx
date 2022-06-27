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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


export default function MixCreate({ setAuth, isLoggedIn, token, username }) {
  const [mixtapeTitle, setMixtapeTitle] = useState('')
  const [mixtapeDescription, setMixtapeDescription] = useState('')
  const [allResults, setAllResults] = useState([])
  // const [trackList, setTrackList] = useState([])
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const NormalText = {
    userSelect: "none",
  }

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
        <Stack spacing={10} direction="row">
          <Stack spacing={2} direction="column">
            <Typography variant="p">Song search results</Typography>
            <TableContainer component={Paper} sx={{ width: "45vw", border: "2px solid #E2E2DF" }}>
              <Table component="form">
                <TableBody>
                  {allResults.map((eachResult, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="left">
                          <IconButton href={eachResult.preview_url} sx={{ color: "#FFFFFF" }}>
                            <PlayCircleOutlineIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h5">{eachResult.title}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h5">{eachResult.artist}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton sx={{ color: "#FFFFFF" }}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          <Stack spacing={2} direction="column">
            <Typography variant="p">Mixtape tracklist</Typography>
            <TableContainer component={Paper} sx={{ width: 404, border: "2px solid #E2E2DF" }}>
              <Table component="form" sx={{ width: 400 }}>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <IconButton sx={{ color: "#FFFFFF" }}>
                        <PlayCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h5">Song title</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton sx={{ color: "#FFFFFF" }}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Box >
      <br></br>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
