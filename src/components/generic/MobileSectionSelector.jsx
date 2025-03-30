"use client";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Button, Menu, MenuItem } from "@mui/material";
// CONTEXTS
import { FilterContext } from "@/context/filterContext";

const sections = ["Expense", "Income"];

export default function MobileSectionSelector() {
  const pathname = usePathname();

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

  const notDisplay = pathname === "/login" || pathname === "/profile";

  return (
    <Box
      display={{ xs: notDisplay ? "none" : "block", sm: "none" }}
      position={"absolute"}
      top={pathname === "/new" ? "5rem" : "1rem"}
      right={"1rem"}
      borderRadius={"1rem"}
      bgcolor={"primary.light"}
    >
      <Button onClick={handleOpen} color="black" sx={{ fontSize: "0.8rem" }}>
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
