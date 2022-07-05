import React from "react";
import SignIn from "./SignIn"
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardMedia from '@mui/material/CardMedia';
import { Link, Navigate } from "react-router-dom";
import TapeImage from "../../../images/TapeImage";

import WilmingtonHalf from "../../../images/cassettes/WilmingtonHalf.png"

export default function Landing({ setAuth, isLoggedIn, handleLogout }) {

  if (isLoggedIn) {
    return <Navigate to="/rack" replace={true} />
  }

  return (
    <>
      <Stack spacing={2} direction="row">
        <Box sx={{ width: "50%" }}>
          <img src={WilmingtonHalf} alt="Landing page" />
        </Box>
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}> */}
        {/* <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        > */}

        {/* <Typography variant="h1">Mixtape</Typography> */}
        {/* <Box
            sx={{
              width: "50%",
              height: 350,
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          ></Box> */}
        {/* 
          <TapeImage /> */}
        <Box sx={{ width: "50%" }}>
          <Stack spacing={4} direction="column" textAlign="center">
            <Typography variant="h1">Mixtape</Typography>
            {/* <Box sx={{ width: "90%" }}> */}
            <Typography variant="h5">
              Mixtape is a fun way of gifting friends a curated mixtape,
              streaming service agnostically.
            </Typography>
            {/* </Box> */}
            {/* </Box> */}
            <Box sx={{ width: "50%" }}>
              <SignIn setAuth={setAuth}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout} />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
