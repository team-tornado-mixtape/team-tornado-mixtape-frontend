import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div>
        <Button component={Link} to="/" variant="outlined">
          Landing Page
        </Button>
        <Button component={Link} to="/sidebar" variant="outlined">
          Sidebar
        </Button>
        <Button component={Link} to="/profile" variant="outlined">
          Profile
        </Button>
        <Button component={Link} to="/player" variant="outlined">
          Player
        </Button>
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h1">Mixtape</Typography>
          <Box
            sx={{
              width: "50%",
              height: 350,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          ></Box>
          <Box sx={{ width: "90%" }}>
            <Typography variant="h5">
              Mixtape is A fun way of gifting friends a curated mixtape,
              streaming service agnostically.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: "50%" }}>
          <Box sx={{ width: "90%", textAlign: "center" }}>
            <Typography variant="h2">Sign In or Sign Up</Typography>
          </Box>
          <br></br>
          <Box
            component="form"
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="username"
              />
              <br></br>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="password"
              />
              <br></br>
              <Button component={Link} to="/passwordreset" variant="outlined">
                Forgot Password?
              </Button>
              <br></br>

              <Stack spacing={2} direction="row">
                <Button color="secondary" variant="contained">
                  Sign Up
                </Button>
                <Button variant="contained">Sign In</Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
