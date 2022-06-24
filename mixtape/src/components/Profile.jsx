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
        color: "#E2E2DF"
    }

    function enterEditingMode() {
        setEditingMode('true')
    }

    function cancelEditingMode() {
        setEditingMode('false')
    }

    function saveEdit() {
        setEditingMode('false')
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
                    <br></br>
                    <Typography variant="h3" style={NormalText}>Profile</Typography>
                    <br></br>
                    <TableContainer component={Paper} sx={{ width: 400 }}>
                        <Table component="form" sx={{ width: 400 }} aria-label="simple table">
                            <TableBody>
                                {/* conditionally render TextFields to accept updated user input when they select "update profile" */}
                                {editingMode === 'false' ? (
                                    <>
                                        {/* set background color of first tablerow, and text color in cells, based on avi  */}
                                        <TableRow sx={{ backgroundColor: "#8F4F6A" }}>
                                            <TableCell align="left">
                                                <Avatar sx={{ width: 70, height: 70 }} alt="Avatar Aang" src="https://sportshub.cbsistatic.com/i/2022/03/01/fdf9fb59-929a-42c1-aa1e-4af3d16f2339/avatar-aang-cosplay.jpg" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Stack spacing={1} direction="column">
                                                    <Typography variant="h3" style={NormalText}>Aang</Typography>
                                                    <Typography variant="h6" style={NormalText}>@avataraang</Typography>
                                                </Stack>
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
                                        <TableRow>
                                            <TableCell align="left">
                                                <Typography variant="p" style={InfoText}>password</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="p" style={NormalText}>updated: 3 june 2022</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                    <>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Typography variant="p" style={InfoText}>username</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField label="update username" defaultValue="avataraang" />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Typography variant="p" style={InfoText}>password</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField type="password" label="update password" />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Typography variant="p" style={InfoText}>password</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField type="password" label="confirm new password" />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br></br>
                    {editingMode === 'false' ? (
                        <Stack spacing={1} direction="row">
                            <Button variant="outlined" onClick={() => enterEditingMode()}> Update Info</Button>
                        </Stack>
                    ) : (
                        <Stack spacing={1} direction="row">
                            <Button variant="outlined" onClick={() => cancelEditingMode()}>Cancel</Button>
                            <Button variant="contained" onClick={() => saveEdit()}>Update</Button>
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