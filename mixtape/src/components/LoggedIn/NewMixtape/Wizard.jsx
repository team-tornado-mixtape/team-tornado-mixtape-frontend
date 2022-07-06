import React from "react";
import useState from 'react';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import Title from "./Wizard/Title.jsx"
import SongSearch from "./Wizard/SongSearch.jsx"
import Customization from "./Wizard/Customization.jsx"

import Stack from "@mui/material/Stack";

const steps = [
    "Set title",
    "Add songs",
    "Choose theme"
];

export default function Wizard({ username, token, setAddMixtapeButtonClicked }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [mixTitle, setMixTitle] = React.useState('')
    const [mixId, setMixId] = React.useState('')
    const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false)

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Title username={username} token={token} setActiveStep={setActiveStep} setMixTitle={setMixTitle} mixTitle={mixTitle} setMixId={setMixId} setDelete />;
            case 1:
                return (
                    <>
                        < SongSearch username={username} token={token} setActiveStep={setActiveStep} mixTitle={mixTitle} mixId={mixId} deleteConfirmOpen={deleteConfirmOpen} setDeleteConfirmOpen={setDeleteConfirmOpen} />
                    </>);
            case 2:
                return (
                    <Customization username={username} token={token} setActiveStep={setActiveStep} mixTitle={mixTitle} mixId={mixId} deleteConfirmOpen={deleteConfirmOpen} setDeleteConfirmOpen={setDeleteConfirmOpen} setAddMixtapeButtonClicked={setAddMixtapeButtonClicked} />
                );
            default:
                return "Unknown step";
        }
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Stack direction="column" textAlign="center">
                        <Typography>All set</Typography>
                    </Stack>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Typography>{getStepContent(activeStep)}</Typography>
                </React.Fragment>
            )}
        </Box>
    );
}