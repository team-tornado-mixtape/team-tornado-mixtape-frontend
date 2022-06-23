import React from "react";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Profile() {
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
                            <Typography variant="h2">First Last</Typography>
                            <Typography variant="h4">@username</Typography>
                        </Stack>
                    </Stack>
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