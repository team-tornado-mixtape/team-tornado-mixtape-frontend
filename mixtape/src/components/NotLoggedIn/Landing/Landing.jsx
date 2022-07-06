import React from "react";
import SignIn from "./SignIn";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import { Link, Navigate } from "react-router-dom";
import TapeImage from "../../../images/TapeImage";

import WilmingtonHalf from "../../../images/cassettes/WilmingtonHalf.png";

export default function Landing({ setAuth, isLoggedIn, handleLogout }) {
  if (isLoggedIn) {
    return <Navigate to="/rack" replace={true} />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <img src={WilmingtonHalf} alt="Landing page" />
        </Box>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Typography variant="landing" >Mixtape</Typography>
          <Typography variant="h5">
            The best way to find and share songs, regardless of the streaming
            service you use.
          </Typography>
          <br></br>
          <SignIn
            setAuth={setAuth}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        </Box>
      </Box>
    </>
  );
}
