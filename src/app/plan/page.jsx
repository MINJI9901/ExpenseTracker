"use client";
import { useState, useContext } from "react";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FilterContext } from "@/context/filterContext";

import SumBoard from "@/components/generic/SumBoard";
import PlanFrame from "@/components/plan/PlanFrame";
import MonthPicker from "@/components/generic/MonthPicker";

const Page = () => {
  const { palette } = useTheme();

  const filters = useContext(FilterContext);
  const { section } = filters;

  const [monthlyDate, setMonthlyDate] = useState(new Date());

  //   const year = monthlyDate.getFullYear();
  //   const month = monthlyDate.getMonth() + 1;

  const [sumOfAmount, setSumOfAmount] = useState(0);

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
          <MonthPicker setMonthlyDate={setMonthlyDate} />
        </Container>
        <SumBoard
          text={`Entire ${section == "Expense" ? "Budget" : "Expected Income"}`}
          sumOfMoney={sumOfAmount}
        />
      </Box>
      <Box>
        <PlanFrame
          monthlyDate={monthlyDate}
          sumOfAmount={sumOfAmount}
          setSumOfAmount={setSumOfAmount}
        />
      </Box>
      {/* <Box margin={'2rem 0'}>
                <PlanFrame sumOfAmount={sumOfAmount} setSumOfAmount={setSumOfAmount}/>
            </Box> */}
    </>
  );
};

export default Page;
