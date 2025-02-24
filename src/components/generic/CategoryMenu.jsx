"use client";
import { useState, useContext } from "react";

import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { FilterContext } from "@/context/filterContext";

export default function CategoryMenu({ categories }) {
  const { setSelectedCategory } = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = (e) => {
    setAnchorEl(null);
    setSelectedCategory(e.target.innerText);
  };
  return (
    <>
      <Button onClick={handleOpenMenu} sx={{ color: "black" }}>
        Category <ArrowDropDownIcon fontSize="large" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {categories.map((category) => (
          // Key id로 수정 필요 | category.category로 수정 필요
          <MenuItem key={category} onClick={handleCloseMenu}>
            {category}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
