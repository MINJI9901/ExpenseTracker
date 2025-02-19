"use client";
import { useState, useContext, useEffect } from "react";

import {
  useTheme,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "next/image";
import logo from "../../public/img/orange_heart_favicon.ico";

import { FilterContext, FilterProvider } from "@/context/filterContext";

import { authenticateUser } from "@/app/login/actions";
import { logout } from "@/app/login/actions";

import { createClient } from "@/utils/supabase/client";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// for DESKTOP MENU
const pageMenu = {
  Page: ["Summary", "Add New", "Plan"],
  Expense: ["Expense", "Income", "Asset"],
};

const pageLinks = { Summary: "/", "Add New": "/new", Plan: "/plan" };

let selectedMonth;
let selectedYear;
// let selectedDate = Date.now();

export default function NavBar() {
  const theme = useTheme();

  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState([
    "Profile",
    "Account",
    "Dashboard",
    "Logout",
  ]);
  const [anchorElNav, setAnchorElNav] = useState({});
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menuItems, setMenuItems] = useState(pageMenu);

  const { menu, setMenu, selectedDate, setSelectedDate } =
    useContext(FilterContext);
  // const { user, setUser } = useContext(UserContext);

  const checkUser = async () => {
    console.log("hahahahahahahaha checkUser is working");
    // const user = await authenticateUser();

    // const supabase = await createClient();

    // const { data, error } = await supabase.auth.getUser();

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      console.log("user in NavBar: ", data || error);
      setUser(data?.user);

      setSettings((prev) =>
        data?.user
          ? [...["Profile", "Account", "Dashboard", "Logout"]]
          : [...["Login/SignUp"]]
      );
    } catch {
      console.log("hahaha it doesn't work");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // for USER MENU
  // const settings = user
  //   ? ["Profile", "Account", "Dashboard", "Logout"]
  //   : ["Login/SignUp"];

  const handleOpenNavMenu = (e, page) => {
    setAnchorElNav((prev) => ({ ...prev, [page]: e.currentTarget }));
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav((prev) => ({ ...prev, [page]: null }));
  };

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = async (e) => {
    setAnchorElUser(null);
    const setting = e.target.innerText;
    console.log("setting: ", setting);
    if (setting == "Logout") {
      const logoutUser = await logout();
      console.log("logoutUser: ", logoutUser);
      setUser(null);
      setSettings((prev) => [...prev]);
    }
  };

  const clickMenuItem = (e, page) => {
    const item = e.target.innerText;

    setMenu((prev) => {
      const arr = [...prev];
      arr[arr.indexOf(page)] = item;
      return arr;
    });

    setMenuItems((prev) => {
      const obj = { ...prev };
      if (page !== item) {
        obj[item] = obj[page];
        delete obj[page];
      }
      return obj;
    });

    setAnchorElNav((prev) => ({ ...prev, [page]: null }));
  };

  const handleCalendar = (e) => {
    selectedMonth = e.$d.toDateString().split(" ")[1];
    selectedYear = e.$y;
  };

  // Set "selectedDate"
  const handleDateSubmit = (page) => {
    if (selectedMonth) {
      setSelectedDate(new Date(`${selectedYear}-${selectedMonth}-01`));

      setMenu((prev) => {
        const arr = [...prev];
        arr[arr.indexOf(page)] = selectedMonth;
        return arr;
      });
    }

    setAnchorElNav((prev) => ({ ...prev, [page]: null }));
  };

  return (
    <AppBar position="static" sx={{ mb: "0.5rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image src={logo} alt="Logo Image" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mx: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Expenser
          </Typography>

          {/* DESKTOP MENU */}
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "end", mr: 2 }}
          >
            {menu.map((page) => (
              <Box key={page}>
                <Button
                  onClick={(e) => handleOpenNavMenu(e, page)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav[page]}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav[page])}
                  onClose={() => handleCloseNavMenu(page)}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  {month.includes(page) ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateCalendar"]}>
                        <DemoItem>
                          <DateCalendar
                            defaultValue={dayjs(selectedDate)}
                            views={["month", "year"]}
                            openTo="month"
                            minDate={dayjs("2024-01-01")}
                            maxDate={dayjs("2026-01-01")}
                            onChange={(e) => handleCalendar(e, page)}
                            sx={{ height: "fit-content" }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              width: "90%",
                            }}
                          >
                            <Button
                              onClick={() => handleDateSubmit(page)}
                              sx={{
                                bgcolor: theme.palette.primary.main,
                                color: "black",
                                width: "100%",
                                ml: "2rem",
                              }}
                            >
                              Done
                            </Button>
                          </Box>
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  ) : menuItems[page] && menuItems[page].length > 0 ? (
                    menuItems[page].map((menu, index) => (
                      <MenuItem
                        key={menu}
                        component="a"
                        href={pageLinks[menu]}
                        onClick={(e) => clickMenuItem(e, page)}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {menu}
                        </Typography>
                      </MenuItem>
                    ))
                  ) : (
                    ""
                  )}
                </Menu>
              </Box>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    component={"a"}
                    href={setting == "Login/SignUp" ? "/login" : "/"}
                    sx={{ textAlign: "center" }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
