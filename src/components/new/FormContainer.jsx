"use client";

import { useState, useContext, useEffect } from "react";

import { Box, Grid2, Button, useTheme } from "@mui/material";

import { FilterContext } from "@/context/filterContext";
// import { getCategories } from "@/app/actions";

import InputBox from "./InputBox";
import CategorySelectBox from "./CategorySelectBox";
import { addBreakdown } from "@/app/actions";

export default function FormContainer({
  getBreakdownData,
  categoryData,
  dateRange,
}) {
  const { palette } = useTheme();
  const filters = useContext(FilterContext);
  const { section } = filters;

  const [isFormOpen, setIsFormOpen] = useState(false);
  //   const [categories, setCategories] = useState([]);
  const [newBreakdown, setNewBreakdown] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // TO VALIDATE FORM WHEN IT'S SUBMITTED
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const getCategoryData = async () => {
  //       const data = await getCategories(section, selectedDate);
  //       setCategories(data);
  //     };

  //     getCategoryData();

  //     setLoading(false);
  //     console.log("selected date: ", selectedDate);
  //     // TO UPDATE CATEGORY DEPENDING ON SECTION AND MONTH CHANGES
  //   }, [section, selectedDate.getMonth()]);

  const handleSubmit = async (e) => {
    if (e.target.checkValidity()) {
      e.preventDefault();
      await addBreakdown(section, newBreakdown);
      // TO UPDATE DATE IN DISPLAYING SECTION CORRESPONDING TO NEW SELECTED DATE
      setSelectedDate(newBreakdown.date);
      getBreakdownData(true);
    } else {
      e.preventDefault();
      setIsSubmitted(true);
    }
  };

  const handleOpenForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // if (loading) return <div>loading...</div>;

  return (
    <>
      <Button
        sx={{
          display: { xs: "block", md: "none" },
          bgcolor: palette.primary.dark,
          color: "black",
          fontWeight: 700,
          width: "90%",
          margin: "1.5rem",
        }}
        onClick={handleOpenForm}
      >
        {isFormOpen ? "Click To Close" : "Click To Add"}
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: { xs: isFormOpen ? "block" : "none", md: "block" },
          margin: { xs: "1rem", md: "20% 1rem" },
        }}
        noValidate
      >
        <InputBox
          label="Name"
          setNewBreakdown={setNewBreakdown}
          isSubmitted={isSubmitted}
        />
        <InputBox
          label="Amount"
          adornment="$"
          setNewBreakdown={setNewBreakdown}
          isSubmitted={isSubmitted}
          isNumber={true}
        />
        <CategorySelectBox
          label="Category"
          categoryData={categoryData}
          setNewBreakdown={setNewBreakdown}
          isSubmitted={isSubmitted}
        />
        <InputBox
          needDatePicker={true}
          setNewBreakdown={setNewBreakdown}
          dateRange={dateRange}
        />
        <Button
          type="submit"
          fullWidth
          sx={{
            display: "inline-block",
            bgcolor: palette.primary.dark,
            color: "white",
            fontSize: "large",
            fontWeight: "700",
            margin: "2rem auto",
            "&:hover": {
              bgcolor: palette.primary.main,
              color: "orange",
              border: "1px solid orange",
              "&:active": {
                boxShadow: "0 0 5px",
              },
            },
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
