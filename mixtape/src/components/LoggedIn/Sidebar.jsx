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
import App from "../../App";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Rack from "./TheRack/Rack";
import MixStepper from "./NewMixtape/Wizard.jsx";
import Player from "./Player/Player";
import Profile from "./Profile/Profile.jsx";

function EachSidebarView(props) {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index} id={`eachsidebarview-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* THIS is where the child views of the tabs are called! */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

EachSidebarView.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabProps(index) {
  return {
    id: `sidebarview-tab-${index}`,
  };
}
export default function PermanentDrawerLeft({
  handleLogout,
  isLoggedIn,
  username,
  token,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "100px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} orientation="vertical" onChange={handleChange}>
              <Tab
                {...TabProps(0)}
                icon={<Icon icon="ant-design:database-twotone" />}
              ></Tab>
              <Tab {...TabProps(1)} icon={<Icon icon="bi:play-btn" />}></Tab>
              <Tab
                {...TabProps(2)}
                icon={<Icon icon="bxs:message-square-add" />}
              ></Tab>
              <Tab
                {...TabProps(3)}
                icon={<Icon icon="healthicons:ui-user-profile" />}
              ></Tab>
            </Tabs>
            <Typography>Signed in as @{username}</Typography>
            <Button onClick={handleLogout}>Log out</Button>
          </Box>
        </Box>
        {/* the value of the clicked tab determines which view is rendered here */}
        <Box sx={{ width: "90vw" }}>
          <EachSidebarView value={value} index={0}>
            <Rack token={token} />
          </EachSidebarView>
          <EachSidebarView value={value} index={1}>
            <Player />
          </EachSidebarView>
          <EachSidebarView value={value} index={2}>
            <MixStepper isLoggedIn={isLoggedIn} token={token} />
          </EachSidebarView>
          <EachSidebarView value={value} index={3}>
            <Profile />
          </EachSidebarView>
        </Box>
      </Box>
    </>
  );
}
