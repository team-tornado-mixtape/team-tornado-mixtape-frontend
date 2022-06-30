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
import AllMixes from "./rackTabs/AllMixes.jsx";
import FavMixes from "./rackTabs/FavMixes.jsx";
import MyMixes from "./rackTabs/MyMixes.jsx";

function EachRackView(props) {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index} id={`eachrackview-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* THIS is where the child views of the tabs are called! */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

EachRackView.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabProps(index) {
  return {
    id: `rackview-tab-${index}`,
  };
}
export default function Rack({token}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box>
        <Button component={Link} to="/mixcreate" variant="outlined">
          Create new mixtape
        </Button>
      </Box>
      <Typography variant="h2">The Rack</Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="search mixtapes"
      />
      <Button color="secondary" variant="contained">
        Search
      </Button>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Created by me" {...TabProps(0)} />
            <Tab label="Favorite mixtapes" {...TabProps(1)} />
            <Tab label="All mixtapes" {...TabProps(2)} />
          </Tabs>
        </Box>
        {/* the value of the clicked tab determines which view is rendered here */}
        <EachRackView value={value} index={0}>
          Created by me
          <MyMixes token={token}/>
        </EachRackView>
        <EachRackView value={value} index={1}>
          Favorite mixtapes
          {/* really should be a component */}
        </EachRackView>
        <EachRackView value={value} index={2}>
          All mixtapes
          {/* really should be a component */}
        </EachRackView>
      </Box>
    </>
  );
}
