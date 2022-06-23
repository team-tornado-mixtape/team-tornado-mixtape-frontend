import React from "react";
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

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

export default function Profile() {

    const NormalText = {
        userSelect: "none",
    }

    const InfoText = {
        userSelect: "none",
        color: "#9298E0"
    };

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
    ];

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
                    <Typography variant="p" style={NormalText}>Profile Info</Typography>
                    <br></br>
                    <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
                        <SpeedDial
                            ariaLabel="SpeedDial openIcon example"
                            sx={{ position: 'absolute', bottom: 10, right: 16 }}
                            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            ))}
                        </SpeedDial>
                    </Box>
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