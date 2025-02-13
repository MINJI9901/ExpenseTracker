"use client";

import { useState, useEffect, useContext } from "react";

import {
  Box,
  Container,
  Grid2,
  Stack,
  Button,
  useTheme,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { FilterContext } from "@/context/filterContext";
import {
  getCategories,
  addCategory,
  addPastData,
  deleteCategory,
} from "@/app/actions";

import CategoryCard from "./CategoryCard";
import { Check } from "@mui/icons-material";

let totalAmount = 0;

export default function PlanFrame({ monthlyDate, setSumOfAmount }) {
  console.log("renders");
  const { palette } = useTheme();

  const filters = useContext(FilterContext);
  const { section } = filters;

  const [categories, setCategories] = useState([]);
  const [importedCategories, setImportedCategories] = useState([]);
  // const [isUpdated, setIsUpdated] = useState(false);

  // Getting the category data
  const fetchCategories = async () => {
    const data = await getCategories(section, monthlyDate);

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
  }, [monthlyDate, section, importedCategories]);

  // ADD NEW CATEGORY
  const handleAddCategory = async () => {
    await addCategory(section, monthlyDate);
    fetchCategories();
  };

  const handleTakeData = async (e) => {
    const lastMonth = new Date(
      monthlyDate.getFullYear(),
      monthlyDate.getMonth() - 1
    );

    const lastMonthData = await getCategories(section, lastMonth);

    const copiedData = lastMonthData.map((doc) => ({
      category: doc.category,
      sub_category: doc.sub_category,
      user_id: doc.user_id,
      date: monthlyDate,
    }));
    console.log("Date updated data: ", copiedData);

    const importedData = await addPastData(section, copiedData);

    setImportedCategories(importedData);
    // 이렇게 해버리면 monthlyDate가 아예 새로 설정돼버려서 안 됨
    // console.log(monthlyDate.setMonth(monthlyDate.getMonth() - 1));
  };

  return (
    <>
      <Button
        disableRipple
        sx={{
          position: { xs: "absolute", md: "static" },
          top: "4rem",
          right: "1rem",
          //   bgcolor: palette.secondary.main,
          border: "1px solid orange",
          color: "black",
          margin: { xs: "1rem 3rem", md: "0.5rem 3rem" },
          "&:hover": {
            bgcolor: palette.grey[100],
          },
          "&:active": {
            boxShadow: "0 0 10px gray",
          },
        }}
        onClick={handleTakeData}
      >
        Import last month categories
      </Button>
      {/* <FormControlLabel
        control={<Checkbox />}
        label="Take data from last month"
      ></FormControlLabel> */}
      <Grid2
        container
        spacing={2}
        sx={{
          bgcolor: palette.primary.main,
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
              bgcolor: palette.primary.dark,
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
    </>
  );
}
