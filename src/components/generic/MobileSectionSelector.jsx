"use client";
import { useContext, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
// CONTEXTS
import { FilterContext } from "@/context/filterContext";

const sections = ["Expense", "Income"];

export default function MobileSectionSelector() {
  const { section, setSection } = useContext(FilterContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleClick = (e) => {
    console.log(e.target.innerText);
    setSection(e.target.innerText);
    setAnchorEl(null);
    // setSection(e.target);
  };

  return (
    <Box
      display={{ xs: "block", sm: "none" }}
      position={"absolute"}
      top={"1rem"}
      right={"1rem"}
      borderRadius={"0.5rem"}
      bgcolor={"primary.light"}
    >
      <Button onClick={handleOpen} color="black">
        {section}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sections.map((sect, index) => (
          <MenuItem key={sect} onClick={handleClick}>
            {sect}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
