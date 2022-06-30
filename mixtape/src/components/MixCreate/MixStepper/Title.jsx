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

export default function Title({ setActiveStep, setAuth, isLoggedIn, token, username }) {
    const [mixtapeInit, setMixtapeInit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mixtapeTitle, setMixtapeTitle] = useState('')
    const [error, setError] = useState('')

    const NormalText = {
        userSelect: "none",
    }

    function handleMixCreate() {
        setIsLoading(true)
        axios
            .post(
                `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/`,
                {
                    title: "test title",
                    description: "test description"
                },
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status)
                console.log(res.data)
                setActiveStep(1)
                setIsLoading(false)
            })
            .catch((e) => {
                setError(e.message)
                setIsLoading(false)
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
            {!isLoading ? (
                <Button variant="contained" onClick={(handleMixCreate)}>Continue</Button>
                // <Button variant="contained" onClick={() => setActiveStep(1)}>Continue</Button>
            ) : (
                <CircularProgress />
            )}
        </>
    )
}
