"use client";

import { useState, useEffect, useContext } from "react";

import { Box, Container, Grid2, Stack, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { FilterContext } from "@/context/filterContext";
import { addCategory } from "@/app/actions";

import CategoryCard from "./CategoryCard";

export default function PlanFrame({ sumOfAmount, setSumOfAmount }) {
  let totalAmount = 0;
  const theme = useTheme();
  const filters = useContext(FilterContext);
  const { period, category, section, selectedDate } = filters;
  // console.log("Filtered Date: ", date)

  const [categories, setCategories] = useState([]);
  // const [isUpdated, setIsUpdated] = useState(false);

  const fetchCategories = async () => {
    const response = await fetch(
      `http://localhost:3000/api/${section.toLowerCase()}/category?month=${selectedDate.getMonth()}&year=${selectedDate.getFullYear()}`
    );
    const data = await response.json();

    data.forEach((category) => {
      category.sub_category.forEach((sub) => {
        totalAmount += section == "Expense" ? sub.budget : sub.expected_amount;
      });
    });

    setCategories(data);
    setSumOfAmount(totalAmount);
  };

  // GET DATA
  useEffect(() => {
    fetchCategories();
  }, [selectedDate, section]);

  // ADD NEW CATEGORY
  const handleAddCategory = async () => {
    await addCategory(section, selectedDate);
    fetchCategories();
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        bgcolor: theme.palette.primary.main,
        width: "95%",
        height: "fit-content",
        margin: "auto",
        padding: "1rem",
      }}
    >
      <Grid2 size={{ xs: 1.5, sm: 1, lg: 0.5 }}>
        <Box
          variant="text"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#C0C0C0",
            color: "black",
            borderRadius: "5px",
            width: "2.5rem",
            height: "25rem",
            writingMode: "vertical-lr",
            textOrientation: "upright",
            margin: "auto",
          }}
        >
          {section}
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 9, sm: 10, lg: 11 }}
        container
        sx={{ flexWrap: "nowrap", overflowX: "auto" }}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            categoryData={category}
            fetchCategories={fetchCategories}
          />
        ))}
      </Grid2>
      <Grid2 size={{ xs: 1.5, sm: 1, lg: 0.5 }}>
        <Box
          onClick={handleAddCategory}
          variant="text"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: theme.palette.primary.dark,
            color: "black",
            borderRadius: "5px",
            width: "2.5rem",
            height: "25rem",
            writingMode: "vertical-lr",
            textOrientation: "upright",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          <AddIcon size="sm"></AddIcon>
          Add Category
        </Box>
      </Grid2>
    </Grid2>
  );
}
