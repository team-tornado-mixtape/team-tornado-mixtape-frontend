import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ResetForm() {
  return (
    <>
      <Typography variant="h2">Reset your password</Typography>
      <br></br>
      <Typography variant="p">
        Filler text explaining why you are here...
      </Typography>
      <br></br>
      <Typography variant="p">
        Resetting password for the account username.
      </Typography>
      <br></br>
      <TextField id="outlined-basic" variant="outlined" label="new password" />
      <br></br>

      <TextField
        id="outlined-basic"
        variant="outlined"
        label="new password, again"
      />
      <br></br>
      <Button color="secondary" variant="contained">
        Confirm password
      </Button>
    </>
  );
}
