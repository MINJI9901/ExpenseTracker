import { useContext, useEffect } from "react";

import { Grid2, Box, Typography, useTheme } from "@mui/material";

import { FilterContext } from "@/context/filterContext";

export default function BarForFigureTable({
  categoryName,
  plannedAmount,
  usedAmount,
  isSubCategoryFigure = false,
}) {
  const { palette } = useTheme();
  const { section } = useContext(FilterContext);

  return (
    <>
      <Grid2
        size={10.5}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          height: "1.5rem",
          my: "0.5rem",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            borderRadius: "0.3rem",
            background:
              usedAmount / plannedAmount > 1
                ? `linear-gradient(to right, ${palette.secondary.main}, #c429299A)`
                : palette.secondary.main,
            minWidth: "5px",
            width: `${(usedAmount / plannedAmount) * 100}%`,
            maxWidth: "99%",
            height: "100%",
          }}
        ></Box>
        <Typography
          sx={{
            color: "gray",
            fontSize: "1rem",
            mx: "0.5rem",
            my: "auto",
            zIndex: 1,
          }}
        >
          {categoryName ? categoryName : "No Name"}
          {usedAmount / plannedAmount > 1}
        </Typography>
        <Typography
          sx={{
            color: usedAmount / plannedAmount > 1 ? "white" : "gray",
            fontSize: "1rem",
            mx: "0.5rem",
            my: "auto",
            zIndex: 1,
          }}
        >
          $ {usedAmount}
        </Typography>
      </Grid2>
      <Grid2
        size={1.5}
        sx={{ textWrap: "nowrap", height: "1.5rem", my: "0.5rem" }}
      >
        ${" "}
        {plannedAmount
          ? plannedAmount.toLocaleString("en", { maximumFractionDigits: 2 })
          : 0}
      </Grid2>
    </>
  );
}
