import { useState, useEffect, useContext } from "react";
// MUI
import { Box, Container, Grid2, Stack, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// CONTEXTS
import { FilterContext } from "@/context/filterContext";
// HOOKS
import { addCategory } from "@/lib/api";
// COMPONENTS
import CategoryCard from "./CategoryCard";

export default function PlanTemplate() {
  const { palette } = useTheme();

  const { section } = useContext(FilterContext);

  const handleAddCategory = async () => {
    // await addCategory(section, monthlyDate);
    // fetchCategories();
  };

  return (
    <Box
      bgcolor={"white"}
      boxShadow={"0 0 30px gray"}
      borderRadius={"1rem"}
      width={"90%"}
      padding={"3rem"}
      position={"absolute"}
      top={"5rem"}
      left={"50%"}
      zIndex={3}
      sx={{ translate: "-50%" }}
    >
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
          {/* {categories.map((category) => (
            <CategoryCard
              key={category._id}
              categoryData={category}
              fetchCategories={fetchCategories}
            />
          ))} */}
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
    </Box>
  );
}
