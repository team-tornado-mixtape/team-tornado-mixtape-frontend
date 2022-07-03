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
import useLocalStorageState from "use-local-storage-state";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignUp({ isLoggedIn }) {
  const [password, setPassword] = useState('')
  const [password_again, setPassword_again] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  const [spotifyUser, setSpotifyUser] = useState(null)
  const [spotifyIsRegistered, setSpotifyIsRegistered] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = React.useState(false)
  const [signUpSignInComplete, setSignUpSignInComplete] = useState(false)
  const [issuedToken, setIssuedToken] = useState('')

  const [token, setToken] = useLocalStorageState("reactMixtapeToken", "");
  const [username, setUsername] = useLocalStorageState(
    "reactMixtapeUsername",
    ""
  );

  const setAuth = (username, token) => {
    setToken(token);
    setUsername(username);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError('')
    setOpen(false)
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    console.log(event)
    setError('')
    axios
      .post(
        'https://team-tornado-mixtape.herokuapp.com/api/auth/users/',
        {
          username: username,
          password: password,
          re_password: password_again,
        }
      )
      .then((res) => {
        console.log(res.data)
        setIsRegistered(true)
        HandleLogin()
      })
      .catch((e) => {
        setError(e.message)
      })
  }

  function HandleLogin() {
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
        console.log(res.data)
        console.log(`this is the token: ${res.data.auth_token}`)
        // setAuth(username, res.data.auth_token)
        setAuth(username, token)
        setIssuedToken(res.data.auth_token);
        RegisterSpotifyAccount()
      })
      .catch((e) => {
        setError(e.message)
      })
  }

  function RegisterSpotifyAccount() {
    console.log('you got to this step!')
    console.log(token)
    // setError('')
    axios
      .post(
        'https://team-tornado-mixtape.herokuapp.com/api/profiles/',
        {
          spotify_username: spotifyUser,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res)
        // setSpotifyIsRegistered(true)
        console.log('Profile registered with spotify')
        setSignUpSignInComplete(true)
      })
      .catch((e) => {
        setError(e.message)
      })
  }

  // if (isLoggedIn) {
  //   return <Navigate to="/" replace={true} />
  // }

  if (signUpSignInComplete) {
    console.log("Signed up and signed in!");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Box sx={{ width: "90%", textAlign: "center" }}>
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
        <Box component="form" onSubmit={handleSignUp}>
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
          <br></br>
          <Typography variant="p">Re-enter your password</Typography>
          <br></br>
          <Box>
            <TextField
              label="password"
              type="password"
              variant="outlined"
              value={password_again}
              onChange={(e) => setPassword_again(e.target.value)} />
          </Box>
          <br></br>
          <Box textAlign="center">
            <Button size="large" component={Link} to="/">Cancel</Button>
          </Box>
          <Box textAlign="center">
            <Button size="large" variant="outlined" onClick={handleSignUp}>Continue</Button>
          </Box>
          <br></br>
          <Typography variant="p">If you are a Spotify user, enter your username. Adding your username allows you to save Mixtapes to your Spotify library.</Typography>
          <br></br>
          <Box>
            <TextField label="your spotify username"
              variant="outlined"
              value={spotifyUser}
              onChange={(e) => setSpotifyUser(e.target.value)}>
            </TextField>
          </Box>
          <br></br>
          <Box textAlign="center">
            <Button size="large" variant="outlined" onClick={RegisterSpotifyAccount}>Complete sign up</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
