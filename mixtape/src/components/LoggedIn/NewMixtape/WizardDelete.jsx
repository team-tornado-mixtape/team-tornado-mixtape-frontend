import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function WizardDelete({ deleteConfirmOpen, setDeleteConfirmOpen, mixId, setActiveStep, mixTitle, setAuth, isLoggedIn, token, username }) {
    const [deleteIsProcessing, setDeleteIsProcessing] = useState(false)
    const [error, setError] = useState('')

    const handleDeleteConfirmOpen = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    function handleDelete(e) {
        e.preventDefault();
        setDeleteIsProcessing(true)
        axios
            .delete(
                `https://team-tornado-mixtape.herokuapp.com/api/mixtapes/${mixId}/`,
                {
                    headers: { Authorization: `Token ${token}` },
                }
            )
            .then((res) => {
                console.log(res.status)
                console.log(res.data)
                console.log('mixtape deleted!')
                setActiveStep(0)
                setDeleteConfirmOpen(false)
            })
            .catch((e) => {
                setError(e.message)
            })
        console.log(error)
    }

    return (
        <>
            <DialogTitle>
                {"Delete this mixtape?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete '{mixTitle}'? This cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleDeleteConfirmClose}>Back</Button>
                <Button variant="outlined" color="secondary" onClick={handleDelete} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </>
    )

}