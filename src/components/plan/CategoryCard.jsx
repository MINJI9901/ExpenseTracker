import { useState, useContext } from "react";

// MUI
import {
  Box,
  Container,
  Grid2,
  Typography,
  Button,
  Card,
  Chip,
  Input,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

// CONTEXTS
import { FilterContext } from "@/context/filterContext";
import { UserContext } from "@/context/UserContext";

// HOOKS
import { addSubCategory, updatedCategory, deleteCategory } from "@/app/actions";
import {
  updatedCategoryLocal,
  addSubCategoryLocal,
  deleteCategoryLocal,
} from "@/lib/localApi";

// COMPONENTS
import BudgetBox from "./BudgetBox";

export default function CategoryCard({ categoryData, fetchCategories }) {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [categoryInput, setCategoryInput] = useState(categoryData.category);

  const { section, selectedDate } = useContext(FilterContext);
  const { user, setUser } = useContext(UserContext);

  const amountPerCategory = categoryData.sub_category.reduce(
    (prev, curr) =>
      prev +
      (section == "Expense"
        ? parseFloat(curr.budget)
        : parseFloat(curr.expected_amount)),
    0
  );

  // ADD SUB-CATEGORY FOR A CATEGORY
  const handleAddSubCategory = async () => {
    if (user) {
      await addSubCategory(section, categoryData._id);
    } else {
      addSubCategoryLocal(section, categoryData._id);
    }

    fetchCategories();
  };

  // TO MODIFY CATEGORY NAME
  const handleDoubleClick = (e) => {
    setIsDoubleClicked((prev) => !prev);
  };

  // TO KEEP TRACK OF INPUT VALUE OF THE CATEGORY WHICH IS BEING MODIFIED
  const handleCategoryInput = (e) => {
    const value = e.target.value;
    setCategoryInput(value);
  };

  // SAVE MODIFIED CATEGORY NAME
  const handleSubmitCategory = async (e) => {
    if (e.keyCode === 13) {
      if (user) {
        const result = await updatedCategory(section, categoryData._id, {
          category: categoryInput,
        });
      } else {
        updatedCategoryLocal(section, categoryData._id, {
          category: categoryInput,
        });
      }
      fetchCategories();
      setIsDoubleClicked((prev) => !prev);
    }
  };

  // DELETE CATEGORY
  const handleDeleteCategory = async () => {
    if (user) {
      const result = await deleteCategory(section, categoryData._id);
    } else {
      deleteCategoryLocal(section, categoryData._id);
    }

    fetchCategories();
  };

  return (
    // <Container sx={{bgcolor: 'white', width: '20rem'}}>dsfdsfds</Container>
    <Grid2 size={4} minWidth="18rem">
      <Card
        size="sm"
        variant="plain"
        sx={{
          position: "relative",
          textAlign: "center",
          lineHeight: "2.5rem",
          minHeight: "2.5rem",
        }}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleSubmitCategory}
        className="isHovered"
      >
        <Box
          className="toggledTarget"
          sx={{ display: "none", position: "absolute", left: "1rem" }}
          onClick={handleDeleteCategory}
        >
          <DeleteOutlineIcon></DeleteOutlineIcon>
        </Box>
        {isDoubleClicked ? (
          <Box>
            <Input onChange={handleCategoryInput} value={categoryInput}></Input>
            {/* <DoneIcon onClick={handleSubmitCategory} sx={{ ml: '3rem' }}></DoneIcon> */}
          </Box>
        ) : (
          categoryData.category
        )}
      </Card>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "1.5rem",
          height: "22rem",
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        <Box sx={{ overflow: "auto", height: "15rem", marginBottom: "0.5rem" }}>
          <Chip
            label={`Sub-category | ${
              section == "Expense" ? "Budget" : "Income"
            }`}
            sx={{
              display: "block",
              position: "sticky",
              top: "0",
              borderRadius: "0",
              bgcolor: "white",
              color: "#A0A0A0",
              textAlign: "center",
            }}
          />
          {categoryData.sub_category.map((subCate) => (
            <BudgetBox
              key={subCate._id}
              categoryId={categoryData._id}
              subCategoryData={subCate}
              fetchCategories={fetchCategories}
            />
          ))}
        </Box>
        <Box sx={{ position: "sticky", margin: "auto" }}>
          <Card
            size="sm"
            variant="plain"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "beige",
              textAlign: "center",
              marginBottom: "0.2rem",
              padding: "0 0.5rem",
            }}
          >
            <Typography
              sx={{
                lineHeight: "2.5rem",
                maxWidth: "50%",
                overflowX: "auto",
                textWrap: "nowrap",
              }}
            >
              Budget
            </Typography>
            <Typography
              sx={{
                lineHeight: "2.5rem",
                maxWidth: "40%",
                overflowX: "auto",
                textWrap: "nowrap",
              }}
            >
              ${" "}
              {amountPerCategory.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Card>
          <Button
            sx={{ bgcolor: "#C0C0C0", width: "100%" }}
            onClick={handleAddSubCategory}
          >
            <AddIcon size="sm"></AddIcon>
            Add New Sub-category
          </Button>
        </Box>
      </Box>
    </Grid2>
  );
}
