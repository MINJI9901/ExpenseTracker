"use client";
import { useState, useContext } from "react";

import {
  Box,
  Button,
  Container,
  Menu,
  Typography,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const now = new Date();

let month = now.getMonth() + 1;
let year = now.getFullYear();

export default function MonthPicker({ setMonthlyDate }) {
  const { palette } = useTheme();

  const [isOpen, setIsOpen] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCalendar = (e) => {
    console.log(e);
    month = e.$M + 1;
    year = e.$y;
  };

  const handleDateSubmit = (page) => {
    if (month) {
      setMonthlyDate(new Date(`${year}-${month}-01`));
    }

    console.log("month: ", month);

    setIsOpen(null);
  };

  return (
    <Box>
      <CalendarMonthIcon onClick={handleOpen}></CalendarMonthIcon>
      <Typography display="inline-block" margin="0.5rem">
        {`${year}.${month < 10 ? `0${month}` : month}`}
      </Typography>
      <Menu
        id="menu-appbar"
        anchorEl={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(isOpen)}
        onClose={handleClose}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar"]}>
            <DemoItem>
              <DateCalendar
                defaultValue={dayjs(now)}
                views={["month", "year"]}
                openTo="month"
                minDate={dayjs("2024-01-01")}
                maxDate={dayjs("2026-01-01")}
                onChange={handleCalendar}
                sx={{ height: "fit-content" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "90%",
                }}
              >
                <Button
                  onClick={handleDateSubmit}
                  sx={{
                    bgcolor: palette.primary.main,
                    color: "black",
                    width: "100%",
                    ml: "2rem",
                  }}
                >
                  Done
                </Button>
              </Box>
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Menu>
    </Box>
  );
}
