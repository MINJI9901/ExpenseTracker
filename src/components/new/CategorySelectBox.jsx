"use client";
import { useEffect, useState } from "react";

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

export default function CategorySelectBox({
  categoryData,
  setNewBreakdown,
  isSubmitted,
}) {
  // States for manipulating category and sub-category select value and displayed menu items inside the select
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const handleSetCategory = (e) => {
    const selectedCategory = categoryData.filter(
      (data) => data.category === e.target.value
    );
    setCategory(selectedCategory);
    setNewBreakdown((prev) => ({ ...prev, category: selectedCategory }));
    setIsSelected(true);
  };

  const handleSetSubCategory = (e) => {
    const selectedSubCategory = category[0].sub_category.filter(
      (data) => data.name === e.target.value
    );
    setSubCategory(selectedSubCategory);
    setNewBreakdown((prev) => ({ ...prev, sub_category: selectedSubCategory }));
  };

  useEffect(() => {
    setCategory([]);
    setNewBreakdown((prev) => ({ ...prev, category: "", sub_category: "" }));
    setIsSelected(false);
  }, [categoryData]);

  return (
    <>
      <TextField
        error={isSubmitted && !isSelected ? true : false}
        required
        fullWidth
        select={true}
        value={category.length ? category[0].category : ""}
        id="category-select"
        label={"Category"}
        variant="outlined"
        sx={{ my: "0.5rem" }}
        onChange={handleSetCategory}
      >
        {categoryData.length ? (
          categoryData.map((option) => (
            <MenuItem key={option._id} value={option.category}>
              {option.category}
            </MenuItem>
          ))
        ) : (
          <MenuItem></MenuItem>
        )}
      </TextField>
      <TextField
        error={isSubmitted && !isSelected ? true : false}
        required
        fullWidth
        select={true}
        value={subCategory.length ? subCategory[0].name : ""}
        id="sub-category-select"
        label={"Sub-category"}
        variant="outlined"
        sx={{ my: "0.5rem" }}
        onChange={handleSetSubCategory}
      >
        {category.length ? (
          category[0].sub_category.map((option) =>
            option.name === "" ? (
              ""
            ) : (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            )
          )
        ) : (
          <MenuItem></MenuItem>
        )}
      </TextField>
    </>
  );
}
