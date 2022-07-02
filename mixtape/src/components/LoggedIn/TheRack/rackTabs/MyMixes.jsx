// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import { Link } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";
// // import Card from '@mui/material/Card';
// // import CardActions from '@mui/material/CardActions';
// // import CardContent from '@mui/material/CardContent';

// export default function MyMixes({ setAuth, isLoggedIn, token, username }) {
//   const [myMixes, setMyMixes] = useState([]);
//   const [error, setError] = useState("");

//   const NormalText = {
//     userSelect: "none",
//   };
//   useEffect(() => {
//     axios

//       .get(`https://team-tornado-mixtape.herokuapp.com/api/my/mixtapes/`, {
//         headers: { Authorization: `Token ${token}` },
//       })
//       .then((res) => {
//         console.log(res.status);
//         console.log(res.data);
//         setMyMixes(res.data);

//       })
//       .catch((e) => {
//         setError(e.message);

//       });
//     console.log(error);
//     // }
//   }, [token, error]);

//   return (
//     <>

//       {myMixes.map((eachMix, index) => {
//         return <Box key={index}>
//           <Typography>{eachMix.title}</Typography>
//         </Box>;
//       })}
//     </>
//   );
// }
