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

const drawerWidth = 130;

export default function PermanentDrawerLeft({
  handleLogout,
  isLoggedIn,
  username,
  token,
}) {
  return (
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
      </Drawer>
    </Box>
  );
}
