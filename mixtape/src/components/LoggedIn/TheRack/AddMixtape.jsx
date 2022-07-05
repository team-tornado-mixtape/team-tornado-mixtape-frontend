import * as React from "react";
import Fab from "@mui/material/Fab";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddMixtapeButton = (props) => {
  const buttonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  return <Fab variant="extended" color="success" style={buttonStyle} onClick={props.addMixtape}>
    <AddCircleIcon sx={{ mr: 1 }} />
    Create Mixtape
  </Fab>
}

export default AddMixtapeButton
