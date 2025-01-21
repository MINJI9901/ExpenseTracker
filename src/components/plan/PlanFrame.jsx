"use client"
import { Box, Container, Grid2, Stack, Button, useTheme } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "@/context/filterContext";
import AddIcon from '@mui/icons-material/Add';
import CategoryCard from "./CategoryCard";
import { postCategory } from "@/app/plan/actions";
import { use } from "react";

export default function PlanFrame() {
    const theme = useTheme();
    const filters = useContext(FilterContext);
    const { date, period, category, section, selectedDate } = filters;
    console.log("Filtered Date: ", date)

    const [categories, setCategories] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch(`http://localhost:3000/api/expense/category?month=${date.getMonth()}&year=${date.getFullYear()}`)
            const data = await response.json();

            setCategories(data);
        }

        fetchCategories();
    }, [selectedDate, isUpdated])

    const addNewCategory = async () => {
        console.log(date.getMonth())
        await postCategory(date);
        setIsUpdated(!isUpdated);
    }

    return (
        <Grid2 container spacing={2} sx={{display: 'flex', bgcolor: theme.palette.primary.main, width: '95%', height: 'fit-content', margin: 'auto', padding: '1rem'}}>
            <Grid2 size={0.5}>
                <Box
                    variant="text"
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: "#C0C0C0", color: "black", borderRadius: '5px', width: '2.5rem', height: '25rem', writingMode: 'vertical-lr', textOrientation: 'upright', margin: 'auto'}}
                >
                    {section}
                </Box>
            </Grid2>
            <Grid2 size={11} container sx={{flexWrap: 'nowrap', overflow: 'auto'}}>
                {categories.map(category => (
                    <CategoryCard key={category._id} categoryData={category}/>
                ))}
            </Grid2>
            <Grid2 size={0.5}>
                <Box
                    onClick={addNewCategory}
                    variant="text"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: theme.palette.secondary.main, color: "black", borderRadius: '5px', width: '2.5rem', height: '25rem', writingMode: 'vertical-lr', textOrientation: 'upright', margin: 'auto', cursor: 'pointer' }}
                >
                    <AddIcon size='sm'></AddIcon>
                    Add Category
                </Box>
            </Grid2>
        </Grid2>
    )
}