import { useContext, useEffect, useRef, useState } from "react";

// CONTEXTS
import { FilterContext } from "@/context/filterContext";
import { ColorContext } from "@/context/ColorContext";
import { UserContext } from "@/context/UserContext";

// MUI
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// HOOKS
import { updateBreakdown } from "@/lib/api";
import { updateBreakdownLocal } from "@/lib/localApi";

export default function EditBreakdown({
  editState,
  setEdit,
  breakdown,
  categoryData,
  getBreakdownData,
}) {
  const { section } = useContext(FilterContext);
  const colorPalette = useContext(ColorContext);
  const { user, setUser } = useContext(UserContext);

  const editBox = useRef(null);

  const [category, setCategory] = useState(breakdown.category);
  const [subCategory, setSubCategory] = useState(breakdown.sub_category);
  const [editedBreakdown, setEditedBreakdown] = useState(breakdown);

  const { date } = breakdown;

  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  //   Take new input whenever input changes and update 'editedBreakdown' state
  const handleEditInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log("edited breakdown: ", editedBreakdown);

    if (name === "category") {
      const selectedCategory = categoryData.filter(
        (data) => data.category === value
      )[0];
      setCategory(selectedCategory);
      setEditedBreakdown((prev) => ({ ...prev, category: selectedCategory }));
    } else if (name === "sub_category") {
      const selectedSubCategory = category.sub_category.filter(
        (data) => data.name === value
      )[0];
      setSubCategory(selectedSubCategory);
      setEditedBreakdown((prev) => ({
        ...prev,
        sub_category: selectedSubCategory,
      }));
    } else {
      setEditedBreakdown((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (user) {
      const data = await updateBreakdown(section, editedBreakdown);
      console.log(data);
    } else {
      const data = updateBreakdownLocal(section, editedBreakdown);
      console.log(data);
    }

    setEdit(false);
    await getBreakdownData();
  };

  return (
    <Box display={editState ? "block" : "none"} ref={editBox}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          textAlign: "center",
          borderRadius: "5px",
          bgcolor: "#f2ece9",
          padding: "0.5rem",
          margin: "0.3rem",
        }}
      >
        <Typography
          sx={{
            width: { xs: "10rem", md: "10%" },
            my: "auto",
            mx: { xs: "1rem", md: 0 },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          {month < 10 ? `0${month}` : month}.{day < 10 ? `0${day}` : day}
        </Typography>
        |
        <TextField
          required
          variant="standard"
          name="name"
          value={editedBreakdown.name}
          sx={{
            width: "20%",
            overflowX: "auto",
            color: "gray",
            textAlign: "center",
          }}
          onChange={handleEditInput}
        />
        |
        <TextField
          required
          variant="standard"
          name="amount"
          value={editedBreakdown.amount}
          sx={{ width: "10%", overflowX: "auto", color: "gray" }}
          onChange={handleEditInput}
        />
        |
        <TextField
          required
          variant="standard"
          select={true}
          name="category"
          value={category ? category.category : breakdown.category.category}
          sx={{ width: "20%", overflowX: "auto", color: "gray" }}
          onChange={handleEditInput}
        >
          {categoryData.map((option) => (
            <MenuItem key={option._id} value={option.category}>
              {option.category}
            </MenuItem>
          ))}
        </TextField>
        |
        <TextField
          required
          variant="standard"
          select={true}
          name="sub_category"
          value={subCategory.name}
          sx={{ width: "20%", overflowX: "auto", color: "gray" }}
          onChange={handleEditInput}
        >
          {category.sub_category.map((option) => (
            <MenuItem key={option._id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
          <MenuItem></MenuItem>
        </TextField>
        |
        <Typography sx={{ width: "10%", overflowX: "auto" }}>
          <CheckCircleOutlineIcon onClick={handleSave} />
        </Typography>
      </Box>
    </Box>
  );
}
