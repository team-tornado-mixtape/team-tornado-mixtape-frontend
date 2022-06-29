import React from "react";
import axios from "axios";
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignIn({ setAuth, isLoggedIn, handleLogout }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [open, setOpen] = React.useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setError('')
        setOpen(false)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        console.log(event)
        setError('')
        axios
            .post(
                'https://team-tornado-mixtape.herokuapp.com/api/auth/token/login',
                {
                    username: username,
                    password: password,
                }
            )
            .then((res) => {
                // setAuth(username, token)
                // console.log(setAuth)
                console.log(res.data)
                console.log(`this is the token: ${res.data.auth_token}`)
                setAuth(username, res.data.auth_token);
                return <Navigate to="/rack" replace={true} />
            })
        // .catch((e) => {
        //     // e.message === 'Request failed with status code 400'
        //     //     ? setError(
        //     //         'Your username or password is incorrect. Please try again.'
        //     //     )
        //     //     : setError(
        //     //         setError(e.response.data.password[0])
        //     //     )
        //     setError(e.response.data.password[0])
        //     setOpen(true)
        // })
    }

    // if (isLoggedIn) {
    //     return <Navigate to="/rack" replace={true} />
    // }

    return (
        <>
            <Box sx={{ width: "90%", textAlign: "center" }}>
                <Typography variant="h2">Sign In to Continue</Typography>
            </Box>
            <br></br>
            {error && (
                <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="warning"
                        sx={{ width: '100%' }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
            )}
            <Box component="form" onSubmit={handleLogin}>
                <Box>
                    <TextField
                        label="username"
                        value={username}
                        margin="normal"
                        onChange={(e) => setUsername(e.target.value)} />
                </Box>
                <Box>
                    <TextField
                        label="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box textAlign="center">
                    <Button size="large" component={Link} to="/signup">Create account</Button>
                </Box>
                <Box textAlign="center">
                    <Button size="large" variant="outlined" type="submit" onClick={handleLogin}>Sign in</Button>
                </Box>
            </Box>
        </>
    );
}