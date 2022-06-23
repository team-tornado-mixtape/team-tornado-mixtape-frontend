import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function SignUp() {
  return (
    <>
      <Typography variant="h3">Sign up</Typography>
      <br></br>
      <Typography variant="p">Add your name</Typography>
      <br></br>

      <TextField id="outlined-basic" variant="outlined" label="first name" />
      <br></br>
      <TextField id="outlined-basic" variant="outlined" label="last name" />
      <br></br>
      <Typography variant="p">Choose a username</Typography>
      <br></br>
      <TextField id="outlined-basic" variant="outlined" label="username" />
      <br></br>
      <Typography variant="p">Choose a password</Typography>
      <br></br>
      <TextField id="outlined-basic" variant="outlined" label="password" />
      <br></br>
      <Typography variant="p">Re-enter your password</Typography>
      <br></br>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="re-enter password"
      />
      <br></br>
      <Button color="secondary" variant="contained">
        Sign up!
      </Button>
    </>
  );
}
