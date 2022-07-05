import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';

export default function Title({ setActiveStep, setMixTitle, mixTitle, setMixId, setAuth, isLoggedIn, token, username }) {
    const [isLoading, setIsLoading] = useState(false)
    // const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
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
                    title: mixTitle,
                    description: description
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
                setMixId(res.data.id)
            })
            .catch((e) => {
                setError(e.message)
                setIsLoading(false)
            })
        console.log(error)
    }

    return (
        <>
            {mixTitle.length === 0 ? (
                <Box sx={{ textAlign: "left", justifyContent: "left" }}>
                    <Stack spacing={2} direction="column">
                        <Box component="form" onSubmit={handleMixCreate}>
                            <Box>
                                <TextField
                                    id="filled-multiline-static"
                                    label="title"
                                    value={mixTitle}
                                    margin="normal"
                                    onChange={(e) => setMixTitle(e.target.value)} />
                            </Box>
                            <Box>
                                <TextField
                                    id="filled-multiline-static"
                                    label="description"
                                    disabled
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                />
                            </Box>
                        </Box>
                    </Stack>
                    <Button variant="contained" disabled>Continue</Button>
                </Box>
            ) : (
                <Box sx={{ textAlign: "left", justifyContent: "left" }}>
                    <Stack spacing={2} direction="column">
                        <Box component="form" onSubmit={handleMixCreate}>
                            <Box>
                                <TextField
                                    id="filled-multiline-static"
                                    label="title"
                                    value={mixTitle}
                                    margin="normal"
                                    onChange={(e) => setMixTitle(e.target.value)} />
                            </Box>
                            <Box>
                                <TextField
                                    id="filled-multiline-static"
                                    label="description"
                                    value={description}
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </Box>
                        </Box>
                    </Stack>
                    {!isLoading ? (
                        <Button variant="contained" type="submit" onClick={(handleMixCreate)}>Next</Button>
                        // <Button variant="contained" onClick={() => setActiveStep(1)}>Continue</Button>
                    ) : (
                        <CircularProgress />
                    )}
                </Box>
            )}
        </>
    )
}
