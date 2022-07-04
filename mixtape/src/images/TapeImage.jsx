import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import MyImage from "./Tape1.jpg";
import { flexbox } from "@mui/system";

export default function TapeImage() {
  return (
    <Card
      sx={{
        // display: "flexbox",
        // justifyContent: "center",
        width: "50%",
        height: "15%",
      }}
    >
      <img src={MyImage} alt="tape" />
    </Card>
  );
}
