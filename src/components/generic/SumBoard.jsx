"use client";
import { useTheme } from "@emotion/react";
// MUI
import { Box, Typography } from "@mui/material";
// COMPONENTS
import { Counter } from "../motion/Counter";

export default function SumBoard({
  text = "This is sum board that Minsooni made hehe. You are welcome",
  sumOfMoney = "900000",
  isSub = false,
}) {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        minWidth: "23rem",
        maxWidth: "27rem",
        minHeight: { xs: "5rem", sm: "6rem", md: "6rem" },
        maxHeight: "7rem",
        bgcolor: isSub ? palette.secondary.main : palette.primary.dark,
        borderRadius: "7px",
        padding: "10px",
        margin: "0 1rem",
        whiteSpace: "pre-line",
      }}
    >
      <Typography
        sx={{
          color: "gray",
          maxWidth: "11rem",
          fontSize: { xs: "0.8rem", md: "1rem" },
          overflowWrap: "anywhere",
          overflow: "auto",
        }}
      >
        {text}
      </Typography>
      <Typography
        sx={{
          color: "white",
          maxWidth: "14rem",
          fontWeight: "700",
          fontSize: { xs: "1.7rem", md: "2rem" },
          margin: "auto 0",
        }}
      >
        $ <Counter targetNumber={parseInt(sumOfMoney)} />
      </Typography>
    </Box>
  );
}
