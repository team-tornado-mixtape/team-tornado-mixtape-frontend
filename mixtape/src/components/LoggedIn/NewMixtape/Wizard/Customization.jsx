import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Default from "../../../../images/cassettes/Default.png"
import Momentum from "../../../../images/cassettes/Momentum.png"
import Seattle from "../../../../images/cassettes/Seattle.png"
import Wilmington from "../../../../images/cassettes/Wilmington.png"
import WizardDelete from '../WizardDelete'
import Chip from "@mui/material/Chip"
import Dialog from "@mui/material/Dialog"

export default function Customization({ setActiveStep, mixId, mixTitle, setAuth, isLoggedIn, token, username, deleteConfirmOpen, setDeleteConfirmOpen }) {
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
        setActiveStep(3)
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
                    <img src={Default} alt="Default" />
                </>
            ) : theme === 1 ? (
                <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Chip label="Default" variant="outlined" themeId={0} onClick={handleThemeChange} />
                        <Chip label="Wilmington" color="primary" themeId={1} onClick={handleThemeChange} />
                        <Chip label="Seattle" variant="outlined" themeId={2} onClick={handleThemeChange} />
                        <Chip label="Momentum" variant="outlined" themeId={3} onClick={handleThemeChange} />
                    </Stack>
                    <img src={Wilmington} alt="Wilmington" />
                </>
            ) : theme === 2 ? (
                <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Chip label="Default" variant="outlined" themeId={0} onClick={handleThemeChange} />
                        <Chip label="Wilmington" variant="outlined" themeId={1} onClick={handleThemeChange} />
                        <Chip label="Seattle" color="primary" themeId={2} onClick={handleThemeChange} />
                        <Chip label="Momentum" variant="outlined" themeId={3} onClick={handleThemeChange} />
                    </Stack>
                    <img src={Seattle} alt="Seattle" />
                </>
            ) : theme === 3 ? (
                <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Chip label="Default" variant="outlined" themeId={0} onClick={handleThemeChange} />
                        <Chip label="Wilmington" variant="outlined" themeId={1} onClick={handleThemeChange} />
                        <Chip label="Seattle" variant="outlined" themeId={2} onClick={handleThemeChange} />
                        <Chip label="Momentum" color="primary" themeId={3} onClick={handleThemeChange} />
                    </Stack>
                    <img src={Momentum} alt="Momentum" />
                </>
            ) : (
                <>
                </>
            )}
            <Stack spacing={2} direction="row">
                <Button variant="outlined" color="secondary" onClick={handleDeleteConfirmOpen}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleFinish}>Finish</Button>
                <Dialog open={deleteConfirmOpen}>
                    <WizardDelete mixId={mixId} mixTitle={mixTitle} setActiveStep={setActiveStep} deleteConfirmOpen={deleteConfirmOpen} setDeleteConfirmOpen={setDeleteConfirmOpen} token={token} />
                </Dialog>
            </Stack>
        </Stack>
    )
}