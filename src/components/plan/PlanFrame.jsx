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
  Typography,
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

export default function PlanFrame({ monthlyDate, setSumOfAmount }) {
  let totalAmount = 0;
  // console.log("renders");
  const { palette } = useTheme();

  const { section } = useContext(FilterContext);
  const { user, setUser } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const checkUser = async () => {
  //     const supabase = createClient();

  //     const { data, error } = await supabase.auth.getUser();

  //     setUser(data?.user);
  //   };

  // GETTING THE CATEGORY DATA
  const fetchCategories = async () => {
    setLoading(true);
    let data = [];
    // console.log("user in Plan: ", user);
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

        totalAmount += parseFloat(amountToAdd);
      });
    });

    setCategories(data);
    setSumOfAmount(totalAmount);
    setLoading(false);
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
      <Box display={"flex"}>
        <Button
          disableRipple
          sx={{
            position: { xs: "static", sm: "absolute", md: "static" },
            top: "5rem",
            right: "1rem",
            //   bgcolor: palette.secondary.main,
            border: "1px solid orange",
            color: "black",
            margin: { xs: "0.5rem 2rem", md: "0.5rem 3rem" },
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
        <Button
          disableRipple
          sx={{
            display: { xs: "inline-block", sm: "none" },
            position: "static",
            top: "5rem",
            right: "1rem",
            //   bgcolor: palette.secondary.main,
            border: "1px solid green",
            color: "black",
            margin: { xs: "0.5rem 0", md: "0.5rem 3rem" },
            "&:hover": {
              bgcolor: palette.grey[100],
            },
            "&:active": {
              boxShadow: "0 0 10px gray",
            },
          }}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </Box>

      <Grid2
        container
        spacing={2}
        sx={{
          bgcolor: palette.primary.main,
          width: "95%",
          height: "fit-content",
          minHeight: "27rem",
          margin: "auto",
          padding: "1rem",
        }}
      >
        <Grid2
          size={{ xs: 0, sm: 1, lg: 0.5 }}
          display={{ xs: "none", sm: "grid" }}
        >
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
          size={{ xs: 12, sm: 10, lg: 11 }}
          container
          sx={{ flexWrap: "nowrap", overflowX: "auto" }}
        >
          {categories.length ? (
            categories.map((category) => (
              <CategoryCard
                key={category._id}
                categoryData={category}
                fetchCategories={fetchCategories}
              />
            ))
          ) : (
            <Typography
              textAlign={"center"}
              color="gray"
              fontSize={"1.2rem"}
              margin={"auto"}
            >
              {loading ? "Loading..." : "No Data"}
            </Typography>
          )}
        </Grid2>
        <Grid2
          size={{ xs: 0, sm: 1, lg: 0.5 }}
          display={{ xs: "none", sm: "grid" }}
        >
          <Box
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
            onClick={handleAddCategory}
          >
            <AddIcon size="sm"></AddIcon>
            Add Category
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
