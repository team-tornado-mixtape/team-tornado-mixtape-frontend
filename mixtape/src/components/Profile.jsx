import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Profile() {
    const [editingMode, setEditingMode] = useState('false')

    const NormalText = {
        userSelect: "none",
    }

    const InfoText = {
        userSelect: "none",
        color: "#9298E0"
    }

    const enterEditingMode = (e) => {
        setEditingMode(e.target.value)
        console.log(e.target.value)
        console.log(`Editing mode clicked. Value should be true: ${editingMode}`)
    }

    const cancelEditingMode = (e) => {
        setEditingMode(e.value)
        console.log(`Cancel editing mode clicked. Value should be false: ${editingMode}`)
    }

    const saveEdit = (e) => {
        setEditingMode(e.value)
        console.log(`Save edit clicked. Value should be false: ${editingMode}`)
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                    sx={{
                        width: "90%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Stack spacing={2} direction="row">
                        <Avatar alt="Avatar Aang" src="https://sportshub.cbsistatic.com/i/2022/03/01/fdf9fb59-929a-42c1-aa1e-4af3d16f2339/avatar-aang-cosplay.jpg" />
                        <Stack spacing={1} direction="column">
                            <Typography variant="h3" style={NormalText}>Aang</Typography>
                            <Typography variant="h6" style={NormalText}>@avataraang</Typography>
                        </Stack>
                    </Stack>
                    <br></br>
                    <Typography variant="p" style={NormalText}>My Info</Typography>
                    <br></br>
                    <TableContainer component={Paper} sx={{ width: 400 }}>
                        <Table sx={{ width: 400 }} aria-label="simple table">
                            <TableBody>
                                {/* conditionally render TextFields to accept updated user input when they select "update profile" */}
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography variant="p" style={InfoText}>name</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="p" style={NormalText}>Aang</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography variant="p" style={InfoText}>username</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="p" style={NormalText}>avataraang</Typography>
                                    </TableCell>
                                </TableRow>
                                {/* conditionally render this password row
                    <TableRow>
                        <TableCell align="left">password</TableCell>
                    </TableRow> */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br></br>
                    {editingMode === 'true' ? (
                        <Stack spacing={1} direction="row">
                            <Button variant="outlined" value={'true'} onClick={(e) => enterEditingMode(e.target.value)}>Edit Info</Button>
                        </Stack>
                    ) : (
                        <Stack spacing={1} direction="row">
                            <Button variant="outlined" value={'false'} onClick={(e) => cancelEditingMode(e.target.value)}>Cancel</Button>
                            <Button variant="contained" value={'false'} onClick={(e) => saveEdit(e.target.value)}>Update</Button>
                        </Stack>
                    )}
                </Box>
                <Box
                    sx={{
                        width: "90%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >hey</Box>
            </Box>
        </>
    );
}