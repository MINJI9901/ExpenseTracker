"use client"
import { Box, Typography } from "@mui/material";
// import { useTheme } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function SumBoard({ text='This is sum board that Minsooni made hehe. You are welcome', sumOfMoney='900000' }) {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '25rem', maxWidth: '27rem', maxHeight: '7rem', bgcolor: theme.palette.secondary.main, borderRadius: '7px', padding: '10px', margin: '0 1rem' }}>
            <Typography sx={{color: 'gray', maxWidth: '11rem', overflowWrap: 'anywhere', overflow: 'auto'}}>{text}</Typography>
            <Typography sx={{color: 'white', maxWidth: '14rem', fontWeight: '700', fontSize: '2rem', margin: 'auto 0'}}>$ {parseInt(sumOfMoney).toLocaleString("en", { 'minimumFractionDigits':2, 'maximumFractionDigits':2 })}</Typography>
        </Box>
    )
}