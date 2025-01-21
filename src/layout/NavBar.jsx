"use client";

import * as React from 'react';
import { useTheme } from '@mui/material';
import { useState, useContext } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Image from 'next/image';
import logo from '../../public/img/orange_heart_favicon.ico';

import { FilterContext, FilterProvider } from '@/context/filterContext';

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentMonth = month[(new Date()).getMonth()]
const currentYear = (new Date()).getFullYear()

// for MOBILE MENU
const pages = [currentMonth, 'Monthly', 'Category', 'Spending'];
// for DESKTOP MENU
const pageMenu = {
  Monthly: ['Daily', 'Monthly', 'Yearly'],
  Category: '',
  Spending: ['Spending', 'Earning', 'Asset']
}

// for USER MENU
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

let selectedMonth;
let selectedYear;
let selectedDate = Date.now();

export default function NavBar() {
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState({});
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menuItems, setMenuItems] = useState(pageMenu);
  const {menu, setMenu, selectedDate, setSelectedDate} = useContext(FilterContext);
  // const [menu, setMenu] = useState(pages);
  // const [menuItems, setMenuItems] = useState(pageMenu);
  // const [selectedDate, setSelectedDate] = useState(Date.now());

  const handleOpenNavMenu = (event, page) => {
    // setAnchorElNav(event.currentTarget);
    setAnchorElNav((prev) => ({...prev, [page]: event.currentTarget}))
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav((prev) => ({...prev, [page]: null}));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const clickMenuItem = (event, page) => {
    const item = event.target.innerText;

    setMenu((prev) => {
      const arr = [...prev];
      arr[arr.indexOf(page)] = item;
      return arr;
    });

    setMenuItems((prev) => {
      const obj = {...prev};
      if (page !== item) {
        obj[item] = obj[page];
        delete obj[page];
      }
      return obj;
    });

    setAnchorElNav((prev) => ({...prev, [page]: null}));
  };

  const handleCalendar = (event, page) => {
    selectedMonth = event.$d.toDateString().split(' ')[1];
    selectedYear = event.$y
    console.log("selected month: ", selectedMonth);
    console.log("selected year: ", selectedYear);
  }

  const handleDateSubmit = (page) => {
    if (selectedMonth) {
      setSelectedDate(new Date(`${selectedYear}-${selectedMonth}-01`));
      console.log("selected date: ", selectedDate);

      setMenu((prev) => {
        const arr = [...prev];
        arr[arr.indexOf(page)] = selectedMonth;
        return arr;
      });
    }
    
    setAnchorElNav((prev) => ({...prev, [page]: null}));
  }

  return (
    // <FilterContext.Provider value={{
    //   date: selectedDate,
    //   period: menu[1],
    //   category: menu[2],
    //   section: menu[3],
    //   setSelectedDate, // Optionally expose setter
    //   setMenu,         // Optionally expose setter
    //   handleDateSubmit,
    // }}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image src={logo} alt='Logo Image' />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mx: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Expenser
          </Typography>

          {/* MOBILE MENU */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'end' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => (handleOpenNavMenu(e, 'mobile'))}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav['mobile']}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav['mobile'])}
              onClose={() => (handleCloseNavMenu('mobile'))}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {menu.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          
          {/* DESKTOP MENU */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent:'end', mr: 2 }}>
            {menu.map((page) => (
              <Box key={page}>
              <Button
                onClick={(e) => (handleOpenNavMenu(e, page))}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
              <Menu
              id="menu-appbar"
              anchorEl={anchorElNav[page]}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav[page])}
              onClose={() => (handleCloseNavMenu(page))}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
            {month.includes(page) ?
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
                  <DemoItem>
                    <DateCalendar
                      defaultValue={dayjs(selectedDate)}
                      views={['month', 'year']}
                      openTo="month"
                      minDate={dayjs("2024-01-01")}
                      maxDate={dayjs("2026-01-01")}
                      onChange={(e) => handleCalendar(e, page)}
                      sx={{ height: 'fit-content' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                      <Button 
                        onClick={() => handleDateSubmit(page)}
                        sx={{ bgcolor: theme.palette.primary.main, color: 'black', width: '100%', ml: '2rem' }}>Done</Button>
                    </Box>
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider> :
              menuItems[page] && menuItems[page].length > 0 ? (menuItems[page].map(menu => (
                <MenuItem key={menu} onClick={(e) => (clickMenuItem(e, page))}>
                  <Typography sx={{ textAlign: 'center' }}>{menu}</Typography>
                </MenuItem>
              ))) : ('')
            }
            </Menu>
            </Box>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // </FilterContext.Provider>
  );
}
