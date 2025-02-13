"use client";
import { useState, useContext, useEffect, useMemo } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { FilterContext } from "@/context/filterContext";
import { Typography, useTheme } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const now = new Date();

export default function DateRangeSelector({
  dateRangeState,
  setDateRangeState,
  getData,
}) {
  const { palette } = useTheme();
  const filters = useContext(FilterContext);
  const { selectedDate } = filters;

  const today = new Date();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Set default date range
  //   const defaultStartDate = new Date(
  //     selectedDate.getFullYear(),
  //     selectedDate.getMonth(),
  //     1
  //   );
  //   const defaultEndDate =
  //     selectedDate.getMonth() === new Date().getMonth()
  //       ? new Date()
  //       : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const defaultStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const defaultEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  //   dateRangeState = useMemo(
  //     () => ({ start: defaultStartDate, end: defaultEndDate }),
  //     [selectedDate]
  //   );

  //   useEffect(() => {
  //     setDateRangeState({ start: defaultStartDate, end: defaultEndDate });
  //   }, []);

  const handleStartDate = (e) => {
    setDateRangeState((prev) => ({ ...prev, start: e.$d }));
  };

  const handleEndDate = (e) => {
    setDateRangeState((prev) => ({ ...prev, end: e.$d }));
  };

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  return (
    <>
      <Typography
        display={{ xs: "block", md: "none" }}
        my="1rem"
        onClick={handleOpenDatePicker}
      >
        <CalendarMonthIcon />
        {` ${dateRangeState.start.toLocaleDateString("en", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })} - ${dateRangeState.end.toLocaleDateString("en", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}`}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker", "DatePicker"]}
          sx={{
            display: { xs: isDatePickerOpen ? "flex" : "none", md: "flex" },
            border: { xs: "1px solid lightGray", md: 0 },
            borderRadius: "0.5rem",
            padding: { xs: "1rem", md: 0 },
          }}
        >
          <DatePicker
            label="from"
            defaultValue={dayjs(defaultStartDate)}
            value={dayjs(dateRangeState.start)}
            minDate={dayjs("2024-01-01")}
            maxDate={dayjs(today)}
            slotProps={{
              textField: {
                variant: "standard",
              },
            }}
            onChange={handleStartDate}
          />
          <DatePicker
            // value={value}
            // onChange={(newValue) => setValue(newValue)}
            label="to"
            defaultValue={dayjs(defaultEndDate)}
            value={dayjs(dateRangeState.end)}
            minDate={dayjs("2024-01-01")}
            maxDate={dayjs(today)}
            slotProps={{
              textField: {
                variant: "standard",
              },
            }}
            onChange={handleEndDate}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
