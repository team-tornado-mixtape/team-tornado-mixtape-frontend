import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

export default function Player(token, selectedMix, setSelectedMix) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h1">my mix bangs</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "right",
            }}
          >
            <Button variant="outlined">Link</Button>
            <Button color="secondary" variant="outlined">
              Add to Rack
            </Button>
            <Button variant="outlined">Edit Tape</Button>
          </Box>
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
            <Typography variant="h5">Created by:</Typography>
          </Box>
        </Box>

        <Box sx={{ width: "50%" }}>
          <Box sx={{ width: "90%", textAlign: "center" }}></Box>
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
              <Stack spacing={2} direction="row">
                <Button color="secondary" variant="contained">
                  Back
                </Button>
                <Button variant="contained">Play</Button>
                <Button color="secondary" variant="contained">
                  Next
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
