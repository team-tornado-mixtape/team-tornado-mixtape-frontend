import React from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn({ setAuth, isLoggedIn, handleLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
    setOpen(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(event);
    setError("");
    axios
      .post("https://team-tornado-mixtape.herokuapp.com/api/auth/token/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        console.log(`this is the token: ${res.data.auth_token}`);
        setAuth(username, res.data.auth_token);
        return <Navigate to="/" replace={true} />;
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <>
      <Box
        sx={{
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ width: 430, border: "1.5px solid #E2E2DF" }}
        >
          <Table sx={{ width: 430 }}>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography variant="h3">Sign In to Continue</Typography>
                  <Box
                    component="form"
                    onSubmit={handleLogin}
                    textAlign="center"
                  >
                    <Box>
                      <TextField
                        label="username"
                        value={username}
                        margin="normal"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Box>
                    <Box>
                      <TextField
                        label="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Box sx={{ height: "3vh" }}></Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Stack spacing={5} direction="row">
                          <Button size="large" variant="outlined" color="secondary" component={Link} to="/signup">
                            Create account
                          </Button>
                          <Button
                            size="large"
                            variant="contained"
                            type="submit"
                            onClick={handleLogin}>
                            Sign in
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ width: "90%", textAlign: "center" }}></Box>
      {
        error && (
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
        )
      }
    </>
  );
}
