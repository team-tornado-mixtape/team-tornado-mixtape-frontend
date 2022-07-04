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

import Default from "../../../../images/cassettes/Default.png"
import Momentum from "../../../../images/cassettes/Momentum.png"
import Seattle from "../../../../images/cassettes/Seattle.png"
import Wilmington from "../../../../images/cassettes/Wilmington.png"

import Grid from '@mui/material/Grid';

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

export default function Customization({ setActiveStep, mixId, setAuth, isLoggedIn, token, username }) {
    const [theme, setTheme] = useState('')
    const [error, setError] = useState('')
    const [deleteIsProcessing, setDeleteIsProcessing] = useState(false)

    const NormalText = {
        userSelect: "none",
    }

    useEffect(() => {
        axios
            .get(`https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/`, {
                headers: { Authorization: `Token ${token}` },
            })
            .then((res) => {
                console.log(res.status);
                console.log(res.data);
            })
            .catch((e) => {
                setError(e.message);
            });
        console.log(error);
    }, [token, error, mixId]);

    function handleDelete(e) {
        e.preventDefault();
        setDeleteIsProcessing(true)
        axios
            .delete(
                `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/`,
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status)
                console.log(res.data)
                console.log('mixtape deleted!')
                setActiveStep(0)
                setDeleteIsProcessing(false)
            })
            .catch((e) => {
                setError(e.message)
            })
        console.log(error)
    }

    return (
        <Stack spacing={0} direction="column" textAlign="center">
            <Typography variant="h2">Choose a theme</Typography>
            <Stack spacing={1} direction="column" textAlign="center">
                <img src={Default} alt="Default" />
                <Typography variant="h5">Default</Typography>
                <img src={Wilmington} alt="Wilmington" />
                <Typography variant="h5">Wilmington</Typography>
                <img src={Seattle} alt="Seattle" />
                <Typography variant="h5">Seattle</Typography>
                <img src={Momentum} alt="Momentum" />
                <Typography variant="h5">Momentum</Typography>
            </Stack>
            <Stack spacing={2} direction="row">
                {deleteIsProcessing ? (
                    <CircularProgress />
                ) : (
                    <Button variant="outlined" color="secondary" onClick={handleDelete}>Cancel</Button>
                )}
                <Button variant="contained" color="primary" onClick={setActiveStep(2)}>Finish</Button>
            </Stack>
        </Stack>
    )
}