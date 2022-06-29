import * as React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { Icon } from "@iconify/react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import App from "../App";

import Rack from "./Rack";
import MixCreate from "./MixCreate";
import Player from "./Player";
import Profile from "./Profile.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const drawerWidth = 130;

export default function PermanentDrawerLeft({
  handleLogout,
  isLoggedIn,
  username,
  token,
}) {

  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace={true} />
  }


  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* <Typography>What da fook?!</Typography> */}
          <Link to="/rack">
            <IconButton aria-label="the rack" color="secondary">
              <Icon icon="ant-design:database-twotone" />
            </IconButton>
          </Link>
          <Link to="/player">
            <IconButton aria-label="player" color="info">
              <Icon icon="bi:play-btn" />
            </IconButton>
          </Link>
          <Link to="/mixcreate">
            <IconButton aria-label="mixcreate" color="primary">
              <Icon icon="bxs:message-square-add" />
            </IconButton>
          </Link>
          <Link to="/profile">
            <IconButton aria-label="profile" color="warning">
              <Icon icon="healthicons:ui-user-profile" />
            </IconButton>
          </Link>
          {/* <Link to="/welcome">
            <IconButton aria-label="landing" color="info">
              <Icon icon="tabler:helicopter-landing" />
            </IconButton>
          </Link> */}
          <Link to="/welcome">
            <IconButton onClick={handleLogout} color="secondary" endIcon={<Icon icon="tabler:helicopter-landing" />}><Icon icon="tabler:helicopter-landing" /></IconButton>
          </Link>
        </Drawer>
        {/* <Box sx={{ display: "flex" }}>
    <Link to="/app"></Link>
      </Box> */}
      </Box>
      <Box>
        {/* other stuff will be contained here
        we will check conditions and display components based on button presses */}
        <Routes>
          <Route path="/rack" element={<Rack isLoggedIn={isLoggedIn} username={username} token={token} />}></Route>
          <Route path="/player" element={<Player />}></Route>
          <Route path="/mixcreate" element={<MixCreate isLoggedIn={isLoggedIn} username={username} token={token} />}></Route>
          <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} username={username} token={token} />}></Route>
        </Routes>
      </Box>
    </Box>
  );
}
