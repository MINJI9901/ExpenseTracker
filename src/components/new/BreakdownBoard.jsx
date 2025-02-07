"use client";
import { useState, useContext, useEffect } from "react";
import { FilterContext } from "@/context/filterContext";
import { Box, useTheme, Typography } from "@mui/material";
import DateRangeSelector from "../generic/DateRangeSelector";

import Breakdown from "./Breakdown";
import { getBreakdown } from "@/app/actions";

export default function BreakdownBoard({
  getBreakdownData,
  breakdownData,
  newBreakdownData,
}) {
  const filters = useContext(FilterContext);
  const { category, section, selectedDate } = filters;
  const theme = useTheme();

  // const [dateRange, setDateRange] = useState({
  //     start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  //     end: selectedDate.getMonth() === new Date().getMonth() ? new Date() : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
  // });
  // const [breakdownData, setBreakdownData] = useState([]);
  // const [newBreakdownData, setNewBreakdownData] = useState({});
  // const [value, setValue] = useState(dayjs(selectedDate));

  // const expenseIncomeBreakdown = async () => {
  //     const data = await getBreakdown(section, dateRange);
  //     // console.log(breakdownData.length)
  //     if (isNewAdded) {
  //         setNewBreakdown(data.filter(item => (
  //             breakdownData.length > 1 ? !breakdownData.map(item => item._id).includes(item._id) : false
  //         ))[0]);
  //         console.log('new breakdown is: ', data.filter(item => {
  //             console.log(breakdownData.length > 1)
  //             return breakdownData.length > 1 ? !breakdownData.map(item => item._id).includes(item._id) : false
  //         }))

  //         setIsNewAdded(false);
  //     }

  //     setBreakdownData(data);
  // }

  // useEffect(() => {
  //     getData();

  //     // PROBLEM TO SOLVE: WHEN UPLOAD NEW DATA WITH DATE DOESN'T CHANGE, IT DOESN'T APPLY
  // }, [dateRange])

  return (
    <Box>
      {/* <DateRangeSelector dateRangeState={dateRange} setDateRangeState={setDateRange}/> */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
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
        <Box sx={{ overflowY: "auto", height: "90%" }}>
          {breakdownData.map((breakdown) =>
            newBreakdownData && newBreakdownData._id === breakdown._id ? (
              <Breakdown
                key={breakdown._id}
                breakdown={breakdown}
                getBreakdownData={getBreakdownData}
                isNew={true}
              ></Breakdown>
            ) : (
              <Breakdown
                key={breakdown._id}
                breakdown={breakdown}
                getBreakdownData={getBreakdownData}
              ></Breakdown>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}
