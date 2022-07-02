import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function PasswordReset() {
  return (
    <>
      <Typography variant="h3">Reset your password</Typography>
      <br></br>
      <Typography variant="p">
        Enter the email address associated with your account. An email will be
        sent to you with a link to reset your account password.
      </Typography>
      <br></br>
      <TextField id="outlined-basic" variant="outlined" label="email" />
      <br></br>
      <Stack spacing={2} direction="row">
        <Button color="secondary" variant="contained">
          Back
        </Button>
        <Button variant="contained">Send password reset email</Button>
      </Stack>
    </>
  );
}
