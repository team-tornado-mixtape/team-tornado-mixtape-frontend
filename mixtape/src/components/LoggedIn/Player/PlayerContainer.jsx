import * as React from "react";
import { useState } from "react"
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
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

export default function PlayerContainer({ selectedMix, setSelectedMix, token }) {
    const [open, setOpen] = useState(true);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        // setSelectedMixId('')
    }

    // This is used only for the example
    // const container =
    //     window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            {/* <CssBaseline /> */}
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
            {/* <Box sx={{ textAlign: "center", pt: 1 }}>
                <Button onClick={toggleDrawer(true)}>Open</Button>
            </Box> */}
            <SwipeableDrawer
                // container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
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
                        {selectedMix.title}
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
                    <Player token={token} selectedMix={selectedMix} setSelectedMix={setSelectedMix} />
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

// WizardContainer.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window: PropTypes.func
// };

// export default WizardContainer;