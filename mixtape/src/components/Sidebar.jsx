import * as React from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { Icon } from '@iconify/react';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const drawerWidth = 100;

export default function PermanentDrawerLeft({ handleLogout, isLoggedIn, username, token }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          // alignItems: "center",
          // justifyContent: "center",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Box sx={{ display: "flex", flexDirection: "column", alignItems: "spaceBetween" }}> */}
        {/* <Stack spacing={2}> */}
        <Stack spacing={15} direction="column">
          <IconButton aria-label="the rack" color="primary">
            <Icon icon="bi:play-btn" />
          </IconButton>
          <IconButton aria-label="add a mixtape" color="info">
            <Icon icon="bxs:message-square-add" />
          </IconButton>
          <IconButton aria-label="player" color="primary">
            <Icon icon="bi:play-btn" />
          </IconButton>
          <IconButton aria-label="profile" color="primary">
            <Icon icon="healthicons:ui-user-profile" />
            {/* ternary operator here for conditionally showing avi when user is logged in */}
          </IconButton>
          {!isLoggedIn ? (
            <Typography>not logged in</Typography>
          ) : (
            <>
              <Typography>you are logged in as @{username}</Typography>
              <Button variant="contained" onClick={handleLogout}>Log out</Button>
            </>
          )}
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
      </Box>
    </Box>
  );
}
