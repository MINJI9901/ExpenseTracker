"use client";

import { useState, useEffect, useContext } from "react";
// MUI
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

// CONTEXTS
import { FilterContext } from "@/context/filterContext";
import { UserContext } from "@/context/UserContext";
// HOOKS
import {
  getCategories,
  addCategory,
  addPastData,
  deleteCategory,
} from "@/lib/api";
import {
  getCategoriesLocal,
  addCategoryLocal,
  addPastDataLocal,
} from "@/lib/localApi";
// COMPONENTS
import CategoryCard from "./CategoryCard";
// SUPABASE
import { createClient } from "@/utils/supabase/client";

let totalAmount = 0;

export default function PlanFrame({ monthlyDate, setSumOfAmount }) {
  console.log("renders");
  const { palette } = useTheme();

  const filters = useContext(FilterContext);
  const { section } = filters;

  const [categories, setCategories] = useState([]);
  //   const [importedCategories, setImportedCategories] = useState([]);
  //   const [user, setUser] = useState(null);
  //   User Context
  const { user, setUser } = useContext(UserContext);

  //   const checkUser = async () => {
  //     const supabase = createClient();

  //     const { data, error } = await supabase.auth.getUser();

  //     setUser(data?.user);
  //   };

  // GETTING THE CATEGORY DATA
  const fetchCategories = async () => {
    let data = [];
    if (user) {
      data = await getCategories(section, monthlyDate);
      // WHEN IT'S NOT AN AUTHENTICATED USER
    } else {
      //   localStorage.removeItem(`${section.toLowerCase()}Categories`);
      data = getCategoriesLocal(section, monthlyDate);
    }
    data.forEach((category) => {
      category.sub_category.forEach((sub) => {
        const amountToAdd = parseFloat(
          section == "Expense" ? sub.budget : sub.expected_amount
        );
        totalAmount += amountToAdd;
      });
    });

    setCategories(data);
    setSumOfAmount(totalAmount);
  };

  // useEffecs
  //   useEffect(() => {
  //     checkUser();
  //   }, []);

  useEffect(() => {
    // localStorage.removeItem("expenseCategories");
    fetchCategories();
  }, [monthlyDate, section, user]);

  // ADD NEW CATEGORY
  const handleAddCategory = async () => {
    if (user) {
      await addCategory(section, monthlyDate);
    } else {
      addCategoryLocal(section, monthlyDate);
    }
    fetchCategories();
  };

  // TAKE LAST MONTH PLAN DATA AND ADD FOR THE MONTH
  const handleTakeData = async (e) => {
    let lastMonthData;

    const lastMonth = new Date(
      monthlyDate.getFullYear(),
      monthlyDate.getMonth() - 1
    );

    if (user) {
      lastMonthData = await getCategories(section, lastMonth);
    } else {
      lastMonthData = getCategoriesLocal(section, lastMonth);
    }

    const copiedData = lastMonthData.map((doc) => ({
      category: doc.category,
      sub_category: doc.sub_category,
      user_id: doc.user_id,
      date: monthlyDate,
    }));
    console.log("Date updated data: ", copiedData);

    if (user) {
      const importedData = await addPastData(section, copiedData);
      //   setImportedCategories(importedData);
    } else {
      addPastDataLocal(section, copiedData);
    }

    fetchCategories();
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
