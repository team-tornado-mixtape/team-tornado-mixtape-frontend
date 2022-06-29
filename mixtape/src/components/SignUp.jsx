import React from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignUp({ setAuth, isLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('')
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
        'https://team-tornado-mixtape.herokuapp.com/api/auth/users/',
        {
          username: username,
          password: password,
          re_password: password,
        }
      )
      .then((res) => {
        console.log(res.data)
        setIsRegistered(true)
        setAuth(username, res.data.auth_token)
      })
      .catch((e) => {
        setError(e.response.data.password[0])
        setOpen(true)
      })
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" replace={true} />
  }

  if (isRegistered) {
    console.log("Registered!");
    return <Navigate to="/welcome" replace={true} />;
  }

  return (
    <>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '75vh' }}
      >
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
          <Typography variant="h3">Sign up</Typography>
          <br></br>
          <Typography variant="p">Choose a username</Typography>
          <br></br>
          <Box>
            <TextField
              label="username"
              variant="outlined"
              value={username}
              margin="normal"
              onChange={(e) => setUsername(e.target.value)} />
          </Box>
          <Typography variant="p">Choose a password</Typography>
          <br></br>
          <Box>
            <TextField
              label="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Box>
          {/* <br></br> */}
          {/* <Typography variant="p">Re-enter your password</Typography>
          <br></br>
          <Box>
            <TextField
              label="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Box> */}
          <br></br>
          <Box textAlign="center">
            <Button size="large" component={Link} to="/welcome">Cancel</Button>
          </Box>
          <Box textAlign="center">
            <Button size="large" variant="outlined" type="submit">Sign up!</Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
