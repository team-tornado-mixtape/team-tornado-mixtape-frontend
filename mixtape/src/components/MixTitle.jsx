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

export default function MixCreate({ setAuth, isLoggedIn, token, username }) {
    const [mixtapeTitle, setMixtapeTitle] = useState('')
    const [error, setError] = useState('')

    if (!isLoggedIn) {
        return <Navigate to="/" replace={true} />
    }

    const handleChange = (e) => {
        setMixtapeTitle(e.target.value)
    }

    function handleMixtapeCreate() {
        axios
            .post(
                `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/`,
                {
                    "title": mixtapeTitle,
                    "creator": username
                },
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status)
                console.log(res.data)
                console.log(res)
            })
            .catch((e) => {
                setError(e.message)
            })
        console.log(error)
    }

    return (
        <>
            <Stack spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    // defaultValue="Mixtape title"
                    onChange={handleChange}
                    value={mixtapeTitle}
                />
                <Button onClick={handleMixtapeCreate} color="secondary" variant="contained">
                    Next
                </Button>
            </Stack>
        </>
    )
}