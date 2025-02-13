import { useContext, useEffect, useRef, useState } from "react";

// Import Context
import { FilterContext } from "@/context/filterContext";
import { ColorContext } from "@/context/ColorContext";

import {
  Box,
  Button,
  Input,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import dayjs from "dayjs";

import { deleteBreakdown } from "@/app/actions";
import { Cancel } from "@mui/icons-material";

import CategorySelectBox from "./CategorySelectBox";

export default function Breakdown({
  getBreakdownData,
  breakdown,
  categoryData,
  handleFilter,
  isNew,
}) {
  const { section } = useContext(FilterContext);
  const colorPalette = useContext(ColorContext);

  const theme = useTheme().palette;
  const box = useRef(null);
  const editBox = useRef(null);

  // STATE FOR EDIT
  // const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedBreakdown, setEditedBreakdown] = useState(breakdown);

  const { _id, name, amount, category, sub_category, date } = breakdown;

  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  useEffect(() => {
    // Highlight newly added breakdown
    if (isNew) {
      box.current.style.backgroundColor = theme.primary.dark;
      setTimeout(() => {
        box.current.style.backgroundColor = "white";
        box.current.style.transition = "background-color 500ms linear";
      }, 500);
    }
  }, [breakdown]);

  const handleDeleteItem = async () => {
    const data = await deleteBreakdown(section, _id);
    getBreakdownData();
  };

  const handleToggleEditForm = () => {
    const display = editBox.current.style.display;
    editBox.current.style.display = display === "none" ? "block" : "none";
  };

  const handleEditInput = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  // const handleDatePicking = (e) => {
  //     setNewBreakdown(prev => ({...prev, date: e.$d}))
  //     setSelectedDate(e.$d)
  //     setDate(e.$d)
  // }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          overflow: "auto",
          textAlign: "center",
          borderRadius: "5px",
          bgcolor: "white",
          padding: "0.5rem",
          margin: "0.3rem",
        }}
        ref={box}
      >
        <Typography
          sx={{
            width: { xs: "10rem", md: "10%" },
            mx: { xs: "1rem", md: 0 },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          {month < 10 ? `0${month}` : month}.{day < 10 ? `0${day}` : day}
        </Typography>
        <Typography
          sx={{
            width: { xs: "10rem", md: "20%" },
            mx: { xs: "1rem", md: 0 },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            width: { xs: "10rem", md: "10%" },
            mx: { xs: "1rem", md: 0 },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          $ {amount.toLocaleString("en", { maximumFractionDigits: 2 })}
        </Typography>
        <Typography
          sx={{
            width: { xs: "10rem", md: "20%" },
            mx: { xs: "1rem", md: 0 },
            overflowX: "auto",
            textWrap: "nowrap",
            color: colorPalette[0],
          }}
          onClick={() => handleFilter(category.category)}
        >
          {category.category}
        </Typography>
        <Typography
          sx={{
            width: { xs: "10rem", md: "20%" },
            mx: { xs: "1rem", md: 0 },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          {sub_category ? sub_category.name : ""}
        </Typography>
        <Typography
          sx={{
            width: { xs: "10rem", md: "10%" },
            mx: { xs: "1rem", md: 0 },
            overflowX: "auto",
            textWrap: "nowrap",
          }}
        >
          <ModeEditIcon
            display={{ xs: "none", md: "block" }}
            onClick={handleToggleEditForm}
          />{" "}
          | <DeleteOutlineIcon onClick={handleDeleteItem} />
        </Typography>
      </Box>
      <Box display={"none"} ref={editBox}>
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
          ref={box}
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
            variant="standard"
            name="amount"
            value={editedBreakdown.amount}
            sx={{ width: "10%", overflowX: "auto", color: "gray" }}
            onChange={handleEditInput}
          />
          |
          <Box sx={{ width: "40%", overflowX: "auto", color: "gray" }}>
            <CategorySelectBox
              categoryData={categoryData}
              setNewBreakdown={setEditedBreakdown}
              isSubmitted={false}
            ></CategorySelectBox>
          </Box>
          {/* <TextField
            variant="standard"
            select
            name="category"
            value={editedBreakdown.category.category}
            sx={{ width: "20%", overflowX: "auto", color: "gray" }}
            onChange={handleEditInput}
          ></TextField>
          |
          <TextField
            variant="standard"
            select
            name="sub_category"
            value={editedBreakdown.sub_category.name}
            sx={{ width: "20%", overflowX: "auto", color: "gray" }}
            onChange={handleEditInput}
          ></TextField> */}
          |
          <Typography sx={{ width: "10%", overflowX: "auto" }}>
            <CheckCircleOutlineIcon />
          </Typography>
        </Box>
      </Box>
    </>
  );
}
