"use client"

import { useState, useContext, useEffect } from "react";

import { Box, Grid2, Button, useTheme } from "@mui/material";

import { FilterContext } from "@/context/filterContext";
import { getCategories } from "@/app/actions";

import InputBox from "./InputBox";
import CategorySelectBox from "./CategorySelectBox";
import { addBreakdown } from "@/app/actions";

export default function FormContainer({ getBreakdownData }) {
    const theme = useTheme();
    const filters = useContext(FilterContext);
    const { section, selectedDate, setSelectedDate } = filters;

    const [categories, setCategories] = useState([]);
    const [newBreakdown, setNewBreakdown] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); // TO VALIDATE FORM WHEN IT'S SUBMITTED
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategoryData = async () => {
            const data = await getCategories(section, selectedDate);
    
            setCategories(data);
        }

        getCategoryData();

        setLoading(false);
        console.log('selected date: ', selectedDate)
        // TO UPDATE CATEGORY DEPENDING ON SECTION AND MONTH CHANGES
    }, [section, selectedDate.getMonth()]);

    const handleSubmit = async (e) => {
        if (e.target.checkValidity()) {
            e.preventDefault();
            await addBreakdown(section, newBreakdown);
            // TO UPDATE DATE IN DISPLAYING SECTION CORRESPONDING TO NEW SELECTED DATE
            setSelectedDate(newBreakdown.date);
            getBreakdownData(true);
        } else {
            e.preventDefault();
            setIsSubmitted(true);
        }
    }

    if (loading) return <div>loading...</div> 

    return (
        <Box component='form' onSubmit={handleSubmit} margin='20% 1rem' height='100dvh' noValidate>
            <InputBox label="Name" setNewBreakdown={setNewBreakdown} isSubmitted={isSubmitted}/>
            <InputBox label="Amount" adornment="$" setNewBreakdown={setNewBreakdown} isSubmitted={isSubmitted}/>
            <CategorySelectBox label="Category" categoryData={categories} setNewBreakdown={setNewBreakdown} isSubmitted={isSubmitted}/>
            <InputBox needDatePicker={true} setNewBreakdown={setNewBreakdown}/>
            <Button 
                type="submit"
                fullWidth
                sx={{display: 'inline-block', bgcolor: theme.palette.primary.dark, color: 'white', fontSize: 'large', fontWeight: '700', margin: '2rem auto'}}
            >
                Save
            </Button>
        </Box>
    )
}