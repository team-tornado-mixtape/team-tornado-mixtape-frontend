import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Rack from "./TheRack/Rack";
import Stack from "@mui/material/Stack";

function EachSidebarView(props) {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index} id={`eachsidebarview-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
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
            </Tabs>
            <br></br>
            <Stack spacing={2} direction="column">
              <Typography>Signed in as @{username}</Typography>
              <Button variant="outlined" onClick={handleLogout}>Sign out</Button>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ width: "90vw" }}>
          <EachSidebarView value={value} index={0}>
            <Rack token={token} username={username} />
          </EachSidebarView>
        </Box>
      </Box>
    </>
  );
}
