import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function EachMixtape({ eachMix, index }) {
    // here are some consts to get you set up:
    const id = eachMix.id
    const createDate = eachMix.created_at
    const creator = eachMix.creator
    const title = eachMix.title
    const songs = eachMix.songs
    // songs is an array
    const theme = eachMix.theme
    // theme is a value, 0 - 3
    const isPublic = eachMix.is_public
    // isPublic is a boolean
    const description = eachMix.description
    const modifyDate = eachMix.modified_at
    const favorites = eachMix.favorited_by
    // it looks like favorites is an array of users by user id. either that, or the array is just the no. of favorites, though that would be a little extra

    return (
        <Box key={index}>
            <Typography>{title} @{creator}</Typography>
            <Typography>does this work??</Typography>
            <Typography>it does!!</Typography>
        </Box>
    )
}