"use client";
import { Box, List, ListItem, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const { palette } = useTheme();
  return (
    <Box
      width={"100%"}
      bgcolor={palette.primary.main}
      display={"flex"}
      justifyContent={"center"}
      gap={"3rem"}
      p={"2rem"}
      mt={"auto"}
    >
      <Box>
        <Typography
          variant="h1"
          fontSize={"1rem"}
          fontWeight={"700"}
          lineHeight={"2rem"}
          my={"auto"}
        >
          Expenser
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h1"
          fontSize={"1rem"}
          fontWeight={"700"}
          lineHeight={"2rem"}
        >
          Support
        </Typography>
        <Typography lineHeight={"2rem"}>FAQ</Typography>
        <Typography lineHeight={"2rem"}>Support Center</Typography>
        <Typography lineHeight={"2rem"}>Contact Us</Typography>
      </Box>
    </Box>
  );
}
