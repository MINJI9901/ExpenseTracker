"use client"

import { useState, useContext, useEffect } from "react";

import { Box, FormControl, FormHelperText, Input, InputAdornment, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

import { FilterContext } from "@/context/filterContext";

export default function InputBox({ label, adornment='', needDatePicker=false, setNewBreakdown, isSubmitted }) {
    const filters = useContext(FilterContext);
    const { selectedDate, setSelectedDate } = filters;
    const [date, setDate] = useState(selectedDate);
    const [isFilled, setIsFilled] = useState(false);

    // const minDate = new Date(date.getFullYear(), date.getMonth(), 1)
    // const maxDate = date.getMonth() === new Date().getMonth() ? new Date() : new Date(date.getFullYear(), date.getMonth() + 1, 0)

    useEffect(() => {
        // To prevent select future date to write actual breakdown
        if (selectedDate > new Date()) {
            setDate(new Date())
        } else setDate(selectedDate)

        setNewBreakdown(prev => ({...prev, date: date}));

    }, [selectedDate])

    const handleDatePicking = (e) => {
        setNewBreakdown(prev => ({...prev, date: e.$d}))
        setSelectedDate(e.$d)
        setDate(e.$d)
    }

    const handleInput = (e) => {
        setNewBreakdown(prev => ({...prev, [label.toLowerCase()]: e.target.value}))
        // To check validity
        if (e.target.validity.valid) {
            setIsFilled(true);
        } else setIsFilled(false);
    }

    return (
        <>
        {needDatePicker === true 
            ? 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Date"
                        defaultValue={dayjs(date)}
                        value={dayjs(date)}
                        minDate={dayjs('2024-01-01')}
                        maxDate={dayjs(new Date())}
                        slotProps={{ textField: { fullWidth: true, my: '0.5rem' } }}
                        onChange={handleDatePicking}
                    />
                </DemoContainer>
            </LocalizationProvider> 
            :
            <TextField
                error={isSubmitted && !isFilled ? true : false}
                required
                fullWidth
                id="outlined-basic"
                label={label}
                variant="outlined"
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>
                    }
                }}
                sx={{my: '0.5rem'}}
                onChange={handleInput}
            >
            </TextField>
        }
        </>
    )
}