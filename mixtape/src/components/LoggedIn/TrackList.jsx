import react from 'react';
import { useState, useEffect } from 'react'
import axios from "axios";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
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

export default function Tracklist({ token, mixId, AddRemoveTrack, mixTitle, trackAdded, setTrackAdded, username }) {
    const [pageDidLoad, setPageDidLoad] = useState(false)
    const [trackData, setTrackData] = useState([])
    const [error, setError] = useState('')
    const [creator, setCreator] = useState('')

    useEffect(() => {
        axios
            .get(`https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/`, {
                headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
                console.log(res.status);
                console.log(res.data);
                const tracklist = res.data.songs
                setTrackData(tracklist)
                const mixCreator = res.data.creator
                setCreator(mixCreator)
                console.log(`here is the track data: ${trackData}`)
                setPageDidLoad(true)
            })
            .catch((e) => {
                setError(e.message);
            });
        console.log(error);
    }, [token, error, mixId, trackAdded]);

    function ReloadTracklist(e) {
        axios
            .get(`https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/`, {
                headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
                console.log(res.status);
                console.log(res.data);
                const tracklist = res.data.songs
                setTrackData(tracklist)
            })
            .catch((e) => {
                setError(e.message);
                console.log(error)
            });
    }

    function handleRemoveFromTracklist(e) {
        e.preventDefault();
        var selectedTrack = e.currentTarget.getAttribute("value")
        axios
            .patch(
                `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/songs/${selectedTrack}`,
                {
                    "title": mixTitle,
                    "songs": [
                    ]
                },
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then((res) => {
                console.log(`SUCCESS! track with ID of ${selectedTrack} was successfully removed from mixtape with ID of ${mixId}`)
                ReloadTracklist()
            })
            .catch((e) => {
                setError(e.message)
                console.log(error)
            })
    }

    return (
        <Stack spacing={2} direction="column">
            <Typography variant="p">Tracklist</Typography>
            <TableContainer component={Paper} sx={{ width: "40vw", border: "2px solid #E2E2DF" }}>
                <Table>
                    {pageDidLoad === false ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {trackData.length === 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography>No tracks in this mixtape (yet).</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {trackData.map((eachTrack, index) => {
                                        const trackId = eachTrack.id
                                        return (
                                            <>
                                                <TableRow key={index}>
                                                    <TableCell align="left">
                                                        <IconButton href={eachTrack.preview_url} sx={{ color: "#FFFFFF" }}>
                                                            <PlayCircleOutlineIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="h5">{eachTrack.title}</Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="h5">{eachTrack.album}</Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="h5">{eachTrack.artist}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton sx={{ color: "#FFFFFF" }} value={trackId} onClick={handleRemoveFromTracklist}>
                                                            <RemoveCircleOutlineIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })}
                                </TableBody>
                            )}
                        </>
                    )}
                </Table>
            </TableContainer>
        </Stack>
    )
}