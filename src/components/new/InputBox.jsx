"use client";

import { useState, useContext, useEffect } from "react";

// CONTEXTS
import { FilterContext } from "@/context/filterContext";

// MUI
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

export default function InputBox({
  label,
  adornment = "",
  needDatePicker = false,
  setNewBreakdown,
  isSubmitted,
  isNumber = false,
  dateRange,
}) {
  // const { selectedDate, setSelectedDate } = useContext(FilterContext);
  const [date, setDate] = useState(new Date());
  const [isFilled, setIsFilled] = useState(false);

  const today = new Date();

  if (dateRange) {
    useEffect(() => {
      if (dateRange["start"].getMonth() !== new Date().getMonth()) {
        setDate(dateRange["start"]);
      }
    }, [dateRange]);
  }

  // const minDate = new Date(date.getFullYear(), date.getMonth(), 1)
  // const maxDate = date.getMonth() === new Date().getMonth() ? new Date() : new Date(date.getFullYear(), date.getMonth() + 1, 0)

  //   useEffect(() => {
  //     // To prevent select future date to write actual breakdown
  //     if (selectedDate > new Date()) {
  //       setDate(new Date());
  //     } else setDate(selectedDate);

  //     setNewBreakdown((prev) => ({ ...prev, date: date }));
  //   }, [selectedDate]);

  const handleDatePicking = (e) => {
    setNewBreakdown((prev) => ({ ...prev, date: e.$d }));
    setDate(e.$d);
    console.log("data picking in NEW: ", e.$d);
  };

  const handleInput = (e) => {
    setNewBreakdown((prev) => ({
      ...prev,
      [label.toLowerCase()]: e.target.value,
    }));
    // To check validity
    if (e.target.validity.valid) {
      setIsFilled(true);
    } else setIsFilled(false);
  };

  return (
    <>
      {needDatePicker === true ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Date"
              defaultValue={dayjs(date)}
              value={dayjs(date)}
              minDate={dayjs("2024-01-01")}
              maxDate={dayjs(today)}
              slotProps={{ textField: { fullWidth: true, my: "0.5rem" } }}
              onChange={handleDatePicking}
            />
          </DemoContainer>
        </LocalizationProvider>
      ) : (
        <TextField
          error={isSubmitted && !isFilled ? true : false}
          required
          fullWidth
          type={isNumber ? "number" : ""}
          id="outlined-basic"
          label={label}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">{adornment}</InputAdornment>
              ),
            },
          }}
          sx={{ my: "0.5rem" }}
          onChange={handleInput}
        ></TextField>
      )}
    </>
  );
}
