import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";

export default function MixCreate() {
  return (
    <>
      <Typography variant="h3">Mixtape title</Typography>
      <br></br>
      <Typography variant="p">Song search</Typography>

      <br></br>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="search songs/artists"
      />
      <br></br>
      <Typography variant="p">Customization</Typography>
      <br></br>
      <Stack spacing={2} direction="row">
        <Button color="secondary" variant="contained">
          Default
        </Button>
        <Button variant="contained">Theme 1</Button>
        <Button color="secondary" variant="contained">
          Theme 2
        </Button>
        <Button variant="contained">Theme 3</Button>
        <Stack spacing={6} direction="row">
          <Button color="secondary" variant="contained">
            Upload image
          </Button>
        </Stack>
      </Stack>
      <br></br>
      <Typography variant="p">Preview</Typography>
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
      <br></br>
      <Stack spacing={50} direction="row">
        <Button variant="contained">Back</Button>
        <Button color="secondary" variant="contained">
          Save mixtape
        </Button>
      </Stack>
    </>
  );
}
