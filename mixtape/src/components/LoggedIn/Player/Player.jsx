import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

import Tracklist from "../TrackList"

export default function Player(token, selectedMix, setSelectedMix) {
  console.log(`the selected mixID is: ${selectedMix}`)
  return (
    <>
      <Tracklist mixId={66} token={token} />
    </>
  );
}
