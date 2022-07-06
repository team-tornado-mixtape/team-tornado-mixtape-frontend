import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DefaultMini from "../../../../images/cassettes/Default_mini.png"
import MomentumMini from "../../../../images/cassettes/Momentum_mini.png"
import SeattleMini from "../../../../images/cassettes/Seattle_mini.png"
import WilmingtonMini from "../../../../images/cassettes/Wilmington_mini.png"
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"
import Box from "@mui/material/Box";

import WizardDelete from "../WizardDelete"

export default function Customization({ setActiveStep, mixId, mixTitle, setAuth, isLoggedIn, token, username, deleteConfirmOpen, setDeleteConfirmOpen, setAddMixtapeButtonClicked }) {
    const [theme, setTheme] = useState(0)
    const [error, setError] = useState('')

    const NormalText = {
        userSelect: "none",
    }

    useEffect(() => {
        axios
            .patch(
                `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/`,
                {
                    "theme": theme
                },
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status);
                console.log(res.data);
            })
            .catch((e) => {
                setError(e.message);
            });
        console.log(error);
    }, [token, error, mixId, theme]);

    const handleThemeChange = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.getAttribute("themeId"))
        setTheme(parseInt(e.currentTarget.getAttribute("themeId")))
        console.log(theme)
    }

    function handleFinish(e) {
        e.preventDefault();
        // setActiveStep(3)
        setAddMixtapeButtonClicked(false)
    }

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    return (
        <Stack spacing={0} direction="column" textAlign="center">
            <Typography variant="h5">Choose theme for '{mixTitle}'</Typography>
            <br></br>
            {theme === 0 ? (
                <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Chip label="Default" color="primary" themeId={0} onClick={handleThemeChange} />
                        <Chip label="Wilmington" variant="outlined" themeId={1} onClick={handleThemeChange} />
                        <Chip label="Seattle" variant="outlined" themeId={2} onClick={handleThemeChange} />
                        <Chip label="Momentum" variant="outlined" themeId={3} onClick={handleThemeChange} />
                    </Stack>
                    <Box className="cassette-spine" style={{ position: "relative" }}>
                        <img src={DefaultMini} alt="Default" />
                        <Typography
                            variant="eachmix"
                            sx={{
                                color: "#000000",
                                position: "absolute",
                                top: "62px",
                                left: "535px",
                            }}
                        >
                            {mixTitle}
                        </Typography>
                    </Box>
                </>
            ) : theme === 1 ? (
                <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Chip label="Default" variant="outlined" themeId={0} onClick={handleThemeChange} />
                        <Chip label="Wilmington" color="primary" themeId={1} onClick={handleThemeChange} />
                        <Chip label="Seattle" variant="outlined" themeId={2} onClick={handleThemeChange} />
                        <Chip label="Momentum" variant="outlined" themeId={3} onClick={handleThemeChange} />
                    </Stack>
                    <Box className="cassette-spine" style={{ position: "relative" }}>
                        <img src={WilmingtonMini} alt="Wilmington" />
                        <Typography
                            variant="eachmix"
                            sx={{
                                color: "#000000",
                                position: "absolute",
                                top: "62px",
                                left: "535px",
                            }}
                        >
                            {mixTitle}
                        </Typography>
                    </Box>
                </>
            ) : theme === 2 ? (
                <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Chip label="Default" variant="outlined" themeId={0} onClick={handleThemeChange} />
                        <Chip label="Wilmington" variant="outlined" themeId={1} onClick={handleThemeChange} />
                        <Chip label="Seattle" color="primary" themeId={2} onClick={handleThemeChange} />
                        <Chip label="Momentum" variant="outlined" themeId={3} onClick={handleThemeChange} />
                    </Stack>
                    <Box className="cassette-spine" style={{ position: "relative" }}>
                        <img src={SeattleMini} alt="Seattle" />
                        <Typography
                            variant="eachmix"
                            sx={{
                                color: "#000000",
                                position: "absolute",
                                top: "62px",
                                left: "535px",
                            }}
                        >
                            {mixTitle}
                        </Typography>
                    </Box>
                </>
            ) : theme === 3 ? (
                <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Chip label="Default" variant="outlined" themeId={0} onClick={handleThemeChange} />
                        <Chip label="Wilmington" variant="outlined" themeId={1} onClick={handleThemeChange} />
                        <Chip label="Seattle" variant="outlined" themeId={2} onClick={handleThemeChange} />
                        <Chip label="Momentum" color="primary" themeId={3} onClick={handleThemeChange} />
                    </Stack>
                    <Box className="cassette-spine" style={{ position: "relative" }}>
                        <img src={MomentumMini} alt="Momentum" />
                        <Typography
                            variant="eachmix"
                            sx={{
                                color: "#000000",
                                position: "absolute",
                                top: "62px",
                                left: "535px",
                            }}
                        >
                            {mixTitle}
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                </>
            )}
            {deleteConfirmOpen ? (
                <Dialog open={deleteConfirmOpen}>
                    <WizardDelete mixId={mixId} token={token} setDeleteConfirmOpen={setDeleteConfirmOpen} setActiveStep={setActiveStep} mixTitle={mixTitle} />
                </Dialog>
            ) : (
                <>
                    <Button variant="outlined" color="secondary" onClick={handleDeleteConfirmOpen}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleFinish}>Finish</Button>
                </>
            )
            }
        </Stack >
    )
}