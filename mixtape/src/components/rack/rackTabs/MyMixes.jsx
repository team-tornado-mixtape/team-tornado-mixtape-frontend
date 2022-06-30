import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function MyMixes({ setAuth, isLoggedIn, token, username }) {
  const [myMixes, setMyMixes] = useState([]);
  const [error, setError] = useState("");

  const NormalText = {
    userSelect: "none",
  };
  useEffect(() => {
    axios

      .get(`https://team-tornado-mixtape.herokuapp.com/api/my/mixtapes/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setMyMixes(res.data);
        // setIsLoading(false)
      })
      .catch((e) => {
        setError(e.message);
        // setIsLoading(false)
      });
    console.log(error);
    // }
  }, [token, error]);

  return (
    <>
      <Box></Box>
      {myMixes.map((eachMix, index) => {
        return <Box key={index}></Box>;
      })}
    </>
  );
}
