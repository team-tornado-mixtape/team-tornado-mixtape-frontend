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
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

import DisplayTracklist from "./DisplayTrackList";


export default function Songs({ setAuth, mixId, mixTitle, isLoggedIn, token, username, selectedArtist }) {
  const [isLoading, setIsLoading] = useState(false)
  const [allResults, setAllResults] = useState([])
  // const [mixData, setMixData] = useState([])
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [artistRefiner, setArtistRefiner] = useState('')

  const [trackAdded, setTrackAdded] = useState(false)

  console.log(`Here is the mix ID: ${mixId}`)

  const NormalText = {
    userSelect: "none",
  }

  const handleSetSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSetRefinedSearch = (e) => {
    e.preventDefault();
    var selectedArtist = e.currentTarget.getAttribute("artist")
    console.log(selectedArtist)
    handleRefinedSearch(selectedArtist)
    setArtistRefiner(selectedArtist)
  }

  const handleUndoRefinedSearch = (e) => {
    e.preventDefault();
    setArtistRefiner('')
    handleSearch()
  }

  function handleSearch() {
    setIsLoading(true)
    axios
      .get(
        `https://team-tornado-mixtape.herokuapp.com/api/search?track=${searchTerm}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        // console.log(res.status)
        // console.log(res.data)
        setAllResults(res.data)
        // console.log(`This is the output: ${res.data}`)
        setIsLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        console.log(error)
      })
  }

  function handleRefinedSearch(selectedArtist) {
    console.log(`https://team-tornado-mixtape.herokuapp.com/api/search?track=${searchTerm}&artist=${selectedArtist}`)
    setIsLoading(true)
    axios
      .get(
        `https://team-tornado-mixtape.herokuapp.com/api/search?track=${searchTerm}&artist=${selectedArtist}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        // console.log(res.status)
        // console.log(res.data)
        setAllResults(res.data)
        setIsLoading(false)
        console.log(`SUCCESS! selectedArtist is: ${selectedArtist}`)
      })
      .catch((e) => {
        setError(e.message)
        var selectedArtist = ''
        console.log(error)
      })
  }

  function handleAddToTracklist(e) {
    e.preventDefault();
    setTrackAdded(false)
    var selectedTrack = e.currentTarget.getAttribute("value")
    console.log(`Here is what is SUPPOSED to happen. A patch request is made on the mixtape with the ID of ${mixId}. At the end of the slug should be the trackId. The trackId is ${selectedTrack}.`)
    axios
      .patch(
        `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/songs/${selectedTrack}`,
        {
          "title": mixTitle,
          "songs": [
            selectedTrack
          ]
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
        console.log(`SUCCESS! track with ID of ${selectedTrack} was successfully added to mixtape with ID of ${mixId}`)
        setTrackAdded(true)
      })
      .catch((e) => {
        setError(e.message)
        console.log(error)
      })
  }

  return (
    <>
      <Typography>Add songs to {mixTitle}</Typography>
      <br></br>
      <Box sx={{ textAlign: "left", justifyContent: "center" }}>
        <Stack spacing={2} direction="row">
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="search by track name"
            onChange={handleSetSearch}
            value={searchTerm}
          />
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
          <Typography variant="p">Refine search</Typography>
          <Stack spacing={2} direction="row">
            {artistRefiner !== '' ? (
              <Stack spacing={2} direction="row">
                <Chip
                  label={artistRefiner} variant="outlined"
                  onDelete={handleUndoRefinedSearch} />
              </Stack>
            ) : (
              <>
                {

                  allResults.map((eachResult, index) => {
                    const eachArtist = eachResult.artist
                    return (
                      <>
                        {allResults.length !== 1 ? (
                          <>
                            <Stack spacing={1} direction="column">
                              <Chip key={index} label={eachArtist} artist={eachArtist} variant="outlined" onClick={handleSetRefinedSearch} />
                            </Stack>
                          </>
                        ) : (
                          <>
                            single result!
                            {/* {handleSetRefinedSearch(eachArtist)} */}
                            {/* what i want to check here is: if there is only 1 result, show nothing and do the search again with the artist appended. additionally, i want to check that if there are multiple results with the same artist, that the search refiner is not shown, and the search is done again with the artist appended. */}
                            {/* {allResults.length === 2 ? (
                              <>
                                <Stack spacing={1} direction="column">
                                  <Chip key={index} label={eachArtist} artist={eachArtist} variant="outlined" onClick={handleSetRefinedSearch} />
                                </Stack>
                              </>
                            ) : (
                              <>
                                <Stack spacing={1} direction="column">
                                  <Chip key={index} label="only one artist" variant="outlined" />
                                </Stack>
                              </>
                            )} */}
                          </>
                        )}
                      </>
                    )
                  })
                }
              </>
            )}
          </Stack>
        </Stack>
        <Stack spacing={10} direction="row">
          <Stack spacing={2} direction="column">
            <Typography variant="p">Song search results</Typography>
            {isLoading ? (
              <>
                <TableContainer component={Paper} sx={{ width: "45vw", border: "2px solid #E2E2DF" }}>
                  <Table>
                    <TableBody>
                      <TableRow sx={{ width: "45vw", border: "2px solid #E2E2DF" }}>
                        <TableCell align="center" sx={{ width: "45vw", border: "2px solid #E2E2DF" }}>
                          <CircularProgress></CircularProgress>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <>
                <TableContainer component={Paper} sx={{ width: "45vw", border: "2px solid #E2E2DF" }}>
                  <Table component="form">
                    <TableBody>
                      {allResults.map((eachResult, index) => {
                        const trackId = eachResult.id
                        return (
                          <>
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
                                <Typography variant="h5">{eachResult.album}</Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Typography variant="h5">{eachResult.artist}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <IconButton sx={{ color: "#FFFFFF" }} value={trackId} onClick={handleAddToTracklist}>
                                  <AddCircleOutlineIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Stack>
          {/* how to get this code working: copy lines 294-326 from above, paste it from lines 334-361. go to where this component is in the app. in lines 334-361, change all instances allResults and eachResult to thisMixData and eachTrack. this will continue to work until you leave this component. */}
          <DisplayTracklist token={token} mixId={mixId} mixTitle={mixTitle} trackAdded={trackAdded} setTrackAdded={setTrackAdded} />
        </Stack>
      </Box>
    </>
  )
}
