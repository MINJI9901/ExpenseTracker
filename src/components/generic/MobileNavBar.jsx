"use client";
import { useEffect, useState } from "react";
// MUI
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// MUI ICONS
import CreateIcon from "@mui/icons-material/Create";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MobileNavBar() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const checkUrl = (endpoint) => window.location.href.includes(endpoint);

    const currValue = checkUrl("new")
      ? 1
      : checkUrl("plan")
      ? 2
      : checkUrl("login")
      ? 3
      : 0;

    setValue(currValue);
  });

  const pages = [
    { label: "Figure", link: "/", icon: <BarChartIcon /> },
    { label: "New", link: "/new", icon: <CreateIcon /> },
    { label: "Plan", link: "/plan", icon: <EditNoteIcon /> },
    { label: "User", link: "/login", icon: <AccountCircleIcon /> },
  ];

  const handleValue = (idx) => {
    setValue(idx);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          bottom: 0,
          width: "100%",
          boxShadow: "0 0 2px gray",
          zIndex: 2,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {pages.map((page, idx) => (
            <BottomNavigationAction
              key={page.label}
              label={page.label}
              icon={page.icon}
              href={page.link}
            />
          ))}
        </BottomNavigation>
      </Box>
    </>
  );
}
