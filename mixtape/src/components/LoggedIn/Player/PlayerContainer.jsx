import * as React from "react";
import { useState } from "react"
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Player from './Player'

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor:
        theme.palette.mode === "light"
            ? grey[100]
            : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)"
}));

export default function PlayerContainer({ selectedMix, mixTitle, setSelectedMix, token, username }) {
    const [open, setOpen] = useState(true);

    const handleClose = (e) => {
        setOpen(false)
        setSelectedMix(0)
    }

    const handleOpen = (e) => {
        setOpen(true)
    }

    return (
        <Root>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(90% - ${drawerBleeding}px)`,
                        width: `calc(100% - 130px)`,
                        marginLeft: '115px',
                        overflow: "visible"
                    }
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
            // ModalProps={{
            //     keepMounted: true
            // }}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: "text.secondary" }}>
                        ‎
                    </Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: "100%",
                        overflow: "auto"
                    }}
                >
                    <Player token={token} selectedMix={selectedMix} setSelectedMix={setSelectedMix} username={username} setOpen={setOpen} />
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}