"use client";
import { useContext } from "react";
// MUI
import { Box, Container, Grid2, Typography, useTheme } from "@mui/material";
// CONTEXTS
import { FilterContext } from "@/context/filterContext";
// COMPONENTS
import BarForFigureTable from "./BarForFigureTable";

export default function FigureTable({ plannedAmount, usedAmount }) {
  const { palette } = useTheme();
  const { selectedDate } = useContext(FilterContext);

  return (
    <Container
      sx={{ width: { xs: "100%", md: "60%" }, my: { xs: "2rem", md: 0 } }}
    >
      <Box
        sx={{
          borderRadius: "1rem",
          bgcolor: palette.primary.main,
          height: "12rem",
          padding: "1rem",
        }}
      >
        <Grid2
          container
          sx={{
            borderRadius: "1rem",
            bgcolor: "white",
            height: "100%",
            alignContent: "flex-start",
            overflowY: "auto",
          }}
        >
          {Object.keys(plannedAmount).map((category) => (
            <BarForFigureTable
              key={category}
              categoryName={category}
              plannedAmount={plannedAmount[category]}
              usedAmount={usedAmount[category]}
            />
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}
