import React from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useLocalStorageState from "use-local-storage-state";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp({ isLoggedIn, setAuth }) {
  const [password, setPassword] = useState("");
  const [password_again, setPassword_again] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [spotifyUser, setSpotifyUser] = useState(null);
  const [spotifyIsRegistered, setSpotifyIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [signUpSignInComplete, setSignUpSignInComplete] = useState(false);
  const [issuedToken, setIssuedToken] = useState("");

  const [token, setToken] = useLocalStorageState("reactMixtapeToken", "");
  const [username, setUsername] = useLocalStorageState(
    "reactMixtapeUsername",
    ""
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
    setOpen(false);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log(event);
    setError("");
    axios
      .post("https://team-tornado-mixtape.herokuapp.com/api/auth/users/", {
        username: username,
        password: password,
        re_password: password_again,
      })
      .then((res) => {
        console.log(res.data);
        console.log(`this is the token: ${res.data.auth_token}`);
        setToken(res.data.auth_token);
        const token = res.data.auth_token;
        setAuth(username, token);
        setIsRegistered(true);
        HandleLogin()
      })
      .catch((e) => {
        e.message === 'Request failed with status code 400'
          ? setError(
            'Passwords must: be at least 8 characters, contain at least one special character and contain at least one number.'
          )
          : setError(
            'Your account has been created. Please log in to continue.'
          )
        setOpen(true)
      })
  };

  function HandleLogin() {
    setError("");
    axios
      .post("https://team-tornado-mixtape.herokuapp.com/api/auth/token/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        console.log(`this is the token: ${res.data.auth_token}`);
        setToken(res.data.auth_token);
        const token = res.data.auth_token;
        setAuth(username, token);
      })
      .catch((e) => {
        e.message === 'Request failed with status code 400'
          ? setError(
            'An error occurred while trying to log in. Please try again.'
          )
          : setError(
            'An error occurred while trying to log in. Please try again.'
          )
        setOpen(true)
      })
  }

  function RegisterSpotifyAccount(token) {
    console.log("you got to this step!");
    console.log(token);
    axios
      .post(
        "https://team-tornado-mixtape.herokuapp.com/api/profiles/",
        {
          spotify_username: spotifyUser,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("Profile registered with spotify");
      })
      .catch((e) => {
        e.message === 'Request failed with status code 401'
          ? setError(
            'Not authorized. Are you logged in?'
          )
          : setError(
            'An error occurred while trying to log in. Please try again.'
          )
        setOpen(true)
      })
  }

  if (signUpSignInComplete) {
    console.log("Signed up and signed in!");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Box sx={{ width: "90%", textAlign: "center" }}>
      <>
        {error && (
          <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </>
      {!isRegistered ? (
        <>
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Typography variant="p">Choose a password</Typography>
            <br></br>
            <Box>
              <TextField
                label="password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                onChange={(e) => setPassword_again(e.target.value)}
              />
            </Box>
            <br></br>
            <Box textAlign="center">
              <Button size="large" component={Link} to="/">
                Cancel
              </Button>
            </Box>
            <Box textAlign="center">
              <Button size="large" variant="outlined" onClick={handleSignUp}>
                Continue
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <br></br>
          <Box component="form" onSubmit={RegisterSpotifyAccount}>
            <Typography variant="p">
              If you are a Spotify user, enter your Spotify username. Adding
              your Spotify username allows you to save Mixtapes to your Spotify
              library.
            </Typography>
            <br></br>
            <Box>
              <br></br>
              <TextField
                label="your spotify username"
                variant="outlined"
                value={spotifyUser}
                onChange={(e) => setSpotifyUser(e.target.value)}
              ></TextField>
            </Box>
            <br></br>
            <Box textAlign="center">
              <Button
                size="large"
                variant="outlined"
                onClick={RegisterSpotifyAccount}
              >
                Complete sign up
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}