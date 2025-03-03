"use client";
import { useState, useContext, useEffect } from "react";

// CONTEXT
import { FilterContext } from "@/context/filterContext";

// MUI
import { Box, useTheme, Typography } from "@mui/material";
import DateRangeSelector from "../generic/DateRangeSelector";

// COMPONENTS
import Breakdown from "./Breakdown";

// HOOKS
import { getBreakdown } from "@/lib/api";

export default function BreakdownBoard({
  getBreakdownData,
  breakdownData,
  newBreakdownData,
  categoryData,
  loading,
}) {
  const { section, selectedDate } = useContext(FilterContext);
  const { palette } = useTheme();

  //   const [category, setCategory] = useState(null);
  const [toggleCategory, setToggleCategory] = useState(false);
  //   State to filter by categories
  const [displayedData, setDisplayedData] = useState(() => [...breakdownData]);

  useEffect(() => {
    setDisplayedData([...breakdownData]);
  }, [breakdownData]);

  //   Filter by category
  const handleFilter = (category) => {
    if (toggleCategory) {
      setDisplayedData(
        breakdownData.filter(
          (breakdown) => breakdown.category.category === category
        )
      );
      setToggleCategory(false);
    } else {
      setDisplayedData(() => [...breakdownData]);
      setToggleCategory(true);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: palette.primary.main,
        height: "30rem",
        padding: "0.5rem",
        my: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          textAlign: "center",
          borderRadius: "5px",
          color: "gray",
          padding: "0.2rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "smaller",
            width: { xs: "5rem", md: "10%" },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          Date
        </Typography>
        <Typography
          sx={{
            fontSize: "smaller",
            width: { xs: "5rem", md: "20%" },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          Name
        </Typography>
        <Typography
          sx={{
            fontSize: "smaller",
            width: { xs: "5rem", md: "10%" },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          Amount
        </Typography>
        <Typography
          sx={{
            fontSize: "smaller",
            width: { xs: "5rem", md: "20%" },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          Category
        </Typography>
        <Typography
          sx={{
            fontSize: "smaller",
            width: { xs: "5rem", md: "20%" },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          Sub-category
        </Typography>
        <Typography
          sx={{
            fontSize: "smaller",
            width: { xs: "5rem", md: "10%" },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          Modify
        </Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "83%" }}>
        {displayedData.length ? (
          displayedData.map((breakdown) =>
            newBreakdownData && newBreakdownData._id === breakdown._id ? (
              <Breakdown
                key={breakdown._id}
                breakdown={breakdown}
                getBreakdownData={getBreakdownData}
                categoryData={categoryData}
                handleFilter={handleFilter}
                isNew={true}
              ></Breakdown>
            ) : (
              <Breakdown
                key={breakdown._id}
                breakdown={breakdown}
                getBreakdownData={getBreakdownData}
                categoryData={categoryData}
                handleFilter={handleFilter}
              ></Breakdown>
            )
          )
        ) : (
          <Typography
            textAlign={"center"}
            color="gray"
            fontSize={"1.2rem"}
            mt={"15%"}
          >
            {loading ? "Loading..." : "No data"}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          border: "1px solid gray",
          borderRadius: "5px",
          color: "white",
          bgcolor: palette.grey[700],
          padding: "0.5rem 3rem",
          margin: "0.3rem",
        }}
      >
        <Typography mx={"2rem"} fontSize={"1rem"} fontWeight={700}>
          Total
        </Typography>
        <Typography fontSize={"1rem"} fontWeight={700}>
          ${" "}
          {displayedData
            .reduce((prev, curr) => prev + parseFloat(curr.amount), 0)
            .toLocaleString("en", { maximumFractionDigits: 2 })}
        </Typography>
      </Box>
    </Box>
  );
}
