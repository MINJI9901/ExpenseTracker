"use client";
import { useState, useContext } from "react";

// MUI
import { useTheme } from "@mui/material";
import { Box, Card, Typography, Input, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// CONTEXT
import { FilterContext } from "@/context/filterContext";
import { UserContext } from "@/context/UserContext";

// HOOKS
import { updatedCategory, deleteCategory } from "@/lib/api";
import { updatedCategoryLocal, deleteCategoryLocal } from "@/lib/localApi";

export default function BudgetBox({
  categoryId,
  subCategoryData,
  fetchCategories,
}) {
  const { palette } = useTheme();
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [subCategoryInput, setSubCategoryInput] = useState(subCategoryData);

  const { section, selectedDate } = useContext(FilterContext);
  const { user, setUser } = useContext(UserContext);

  // TO MODIFY SUB-CATEGORY PROPERTIES
  const handleDoubleClick = (e) => {
    setIsDoubleClicked((prev) => !prev);
  };

  // TO KEEP TRACK OF INPUT VALUES OF SUB-CATEGORY WHICH IS BEING MODIFIED
  const handleSubCategoryInput = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setSubCategoryInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // SAVE MODIFIED SUB-CATEGORY DATA
  const handleSubmitSubCategory = async (e) => {
    if (e.keyCode === 13) {
      if (user) {
        const result = await updatedCategory(
          section,
          categoryId,
          subCategoryInput
        );
      } else {
        updatedCategoryLocal(section, categoryId, subCategoryInput);
      }

      fetchCategories();
      setIsDoubleClicked((prev) => !prev);
    }
  };

  // DELETE SUB-CATEGORY DATA
  const handleDeleteSubCategory = async () => {
    const ids = { categoryId: categoryId, subCategoryId: subCategoryData._id };

    if (user) {
      const result = await deleteCategory(section, ids);
    } else {
      deleteCategoryLocal(section, ids);
    }

    fetchCategories();
  };

  return (
    <Card
      size="sm"
      variant="plain"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        textAlign: "center",
        border: "1px solid",
        marginBottom: "0.7rem",
        padding: "0 0.5rem",
      }}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleSubmitSubCategory}
      className="isHovered"
    >
      <Box display={"flex"} alignItems={"center"} gap={1} flex={1}>
        <Box
          className="toggledTarget"
          sx={{ display: "none", left: "1rem" }}
          onClick={handleDeleteSubCategory}
        >
          <DeleteOutlineIcon></DeleteOutlineIcon>
        </Box>

        {isDoubleClicked ? (
          <Box
            sx={{
              lineHeight: "2.5rem",
              maxWidth: "60%",
              overflowX: "auto",
              textWrap: "nowrap",
            }}
          >
            <Input
              name="name"
              onChange={handleSubCategoryInput}
              value={subCategoryInput.name}
            ></Input>
          </Box>
        ) : (
          <Typography
            sx={{
              lineHeight: "2.5rem",
              maxWidth: "60%",
              overflowX: "auto",
              textWrap: "nowrap",
            }}
          >
            {subCategoryData.name}
          </Typography>
        )}
      </Box>

      {isDoubleClicked ? (
        <Box
          sx={{
            lineHeight: "2.5rem",
            maxWidth: "40%",
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          <label htmlFor="">$ </label>
          <Input
            type="number"
            name={section === "Expense" ? "budget" : "expected_amount"}
            onChange={handleSubCategoryInput}
            value={
              subCategoryInput.budget || subCategoryInput.expected_amount || 0
            }
          ></Input>
        </Box>
      ) : (
        <Typography
          sx={{
            lineHeight: "2.5rem",
            maxWidth: "40%",
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          {`$ ${(section === "Expense"
            ? subCategoryData.budget || 0
            : subCategoryData.expected_amount || 0
          ).toLocaleString("en", { maximumFractionDigits: 2 })}
          `}
        </Typography>
      )}
    </Card>
  );
}
