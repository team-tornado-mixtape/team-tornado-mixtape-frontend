import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Wizard from "../NewMixtape/Wizard.jsx";

// export default function AddMixtape({ token }) {
//   const handleMixCreateOpen = () => {
//     return <Wizard token={token} />;
//   };

//   return (
//     <Box sx={{ "& > :not(style)": { m: 1 } }}>
//       <Fab variant="extended" color="primary" onClick={handleMixCreateOpen}>
//         <AddCircleIcon sx={{ mr: 1 }} />
//         Add Mixtape
//       </Fab>
//     </Box>
//   );
// }

const AddMixtapeButton = (props) => {
  const buttonStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  return <Fab variant="extended" color="primary" style={buttonStyle} onClick={props.addMixtape}>Add Mixtape</Fab>
}

export default AddMixtapeButton
