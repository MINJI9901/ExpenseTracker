"use client"
import { useState, useContext, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { FilterContext } from "@/context/filterContext";

export default function DateRangeSelector({ dateRangeState, setDateRangeState }) {
    const filters = useContext(FilterContext);
    const { selectedDate } = filters;

    const defaultStartDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const defaultEndDate = selectedDate.getMonth() === new Date().getMonth() ? new Date() : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    useEffect(() => {
        setDateRangeState({start: defaultStartDate, end: defaultEndDate})
    }, [selectedDate])

    const handleStartDate = (e) => {
        setDateRangeState(prev => ({...prev, start: e.$d}));
    }

    const handleEndDate = (e) => {
        setDateRangeState(prev => ({...prev, end: e.$d}));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    label='from'
                    defaultValue={dayjs(defaultStartDate)}
                    value={dayjs(dateRangeState.start)}
                    minDate={dayjs('2024-01-01')}
                    maxDate={dayjs(new Date())}
                    slotProps={{
                        textField: { 
                            variant: 'standard'
                        }
                    }}
                    onChange={handleStartDate}
                />
                <DatePicker
                    // value={value}
                    // onChange={(newValue) => setValue(newValue)}
                    label='to'
                    defaultValue={dayjs(defaultEndDate)}
                    value={dayjs(dateRangeState.end)}
                    minDate={dayjs('2024-01-01')}
                    maxDate={dayjs(new Date())}
                    slotProps={{
                        textField: { 
                            variant: 'standard'
                        }
                    }}
                    onChange={handleEndDate}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}