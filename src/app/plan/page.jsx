"use client";
import SumBoard from "@/components/generic/SumBoard";
import PlanFrame from "@/components/plan/PlanFrame";

import { useState, useContext } from "react";
import { Box, Container, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FilterContext } from "@/context/filterContext";

const Page = () => {
  const [sumOfAmount, setSumOfAmount] = useState(0);
  const filters = useContext(FilterContext);
  const { section, selectedDate } = filters;
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  return (
    <>
      <Box
        sx={{
          display: { md: "flex" },
          bgcolor: "white",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Container>
          <CalendarMonthIcon></CalendarMonthIcon>
          <Typography display="inline-block" margin="0.5rem">
            {`${year}.${month < 10 ? `0${month}` : month}`}
          </Typography>
        </Container>
        <SumBoard
          text={`Entire ${section == "Expense" ? "Budget" : "Expected Income"}`}
          sumOfMoney={sumOfAmount}
        />
      </Box>
      <Box>
        <PlanFrame sumOfAmount={sumOfAmount} setSumOfAmount={setSumOfAmount} />
      </Box>
      {/* <Box margin={'2rem 0'}>
                <PlanFrame sumOfAmount={sumOfAmount} setSumOfAmount={setSumOfAmount}/>
            </Box> */}
    </>
  );
};

export default Page;
