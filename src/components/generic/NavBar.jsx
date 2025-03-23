"use client";
import { useState, useContext, useEffect } from "react";
// NEXTJS
import Image from "next/image";
// MUI
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
  Link,
} from "@mui/material";
// MUI ICONS
import CreateIcon from "@mui/icons-material/Create";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BarChartIcon from "@mui/icons-material/BarChart";

// FILE
import logo from "../../../public/img/orange_heart_favicon.ico";
// CONTEXTS
import { FilterContext } from "@/context/filterContext";
import { UserContext } from "@/context/UserContext";
import { ProfileContext } from "@/context/ProfileContext";
// HOOKS
import { logout, login } from "@/app/login/actions";

const sections = ["Expense", "Income"];

export default function NavBar() {
  const { palette } = useTheme();

  // const [user, setUser] = useState(null);
  const [settings, setSettings] = useState([{ "Login/SignUp": "/login" }]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const [menuItems, setMenuItems] = useState(pageMenu);

  const { section, setSection } = useContext(FilterContext);
  const { user, setUser } = useContext(UserContext);
  const { userInfo, setUserInfo } = useContext(ProfileContext);

  useEffect(() => {
    setSettings(() =>
      user
        ? [{ Profile: "/profile" }, { Logout: "/" }]
        : [{ "Login/SignUp": "/login" }]
    );
  }, [user]);

  const handleOpenNavMenu = (e, page) => {
    setAnchorElNav(e.target.innerText);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };

  // OPEN USER DROP DOWN MENU
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  // CLOSE USER DROP DOWN MENU
  const handleCloseUserMenu = async (e) => {
    setAnchorElUser(null);
    const setting = e.target.innerText;
    if (setting == "Logout") {
      setUser(null);
      const logoutUser = await logout();
      console.log("logoutUser: ", logoutUser);
      // setSettings((prev) => [...prev]);
    }
  };

  // CLICK EACH MENU ITEM
  const clickMenuItem = (e, page) => {
    const item = e.target.innerText;

    setSection(item);

    setAnchorElNav(null);
  };

  // CHANGE DATE BASED OFF OF CALENDAR
  const handleCalendar = (e) => {
    selectedMonth = e.$d.toDateString().split(" ")[1];
    selectedYear = e.$y;
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
            href="/"
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
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
              alignContent: "center",
              mr: 2,
            }}
          >
            <Typography
              component={"a"}
              href="/"
              color="black"
              margin={"auto 0.5rem"}
            >
              <BarChartIcon />
            </Typography>
            <Typography
              component={"a"}
              href="/new"
              color="black"
              margin={"auto 0.5rem"}
            >
              New <CreateIcon />
            </Typography>
            <Typography
              component={"a"}
              href="/plan"
              color="black"
              margin={"auto 0.5rem"}
            >
              Plan <EditNoteIcon />
            </Typography>

            {/* {menu.map((page) => ( */}
            <Box>
              <Button
                onClick={handleOpenNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {section}
              </Button>
              <Menu
                id="menu-appbar"
                sx={{ display: { xs: "none", md: "block" } }}
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {sections.map((menu, index) => (
                  <MenuItem key={menu} onClick={clickMenuItem}>
                    <Typography sx={{ textAlign: "center" }}>{menu}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* ))} */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt=""
                  src={userInfo.image.src || ""}
                  sx={{
                    bgcolor: user
                      ? palette.secondary.dark
                      : palette.primary.dark,
                  }}
                >
                  {user ? "" : "?"}
                </Avatar>
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
              {settings.map((setting) => (
                <MenuItem
                  key={Object.keys(setting)[0]}
                  onClick={handleCloseUserMenu}
                >
                  <Typography
                    component={"a"}
                    // href={setting == "Login/SignUp" ? "/login" : "/profile"}
                    href={Object.values(setting)[0]}
                    sx={{ textAlign: "center" }}
                  >
                    {Object.keys(setting)[0]}
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
