import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#faece5d4",
      dark: "#fbd6c8c5",
    },
    secondary: {
      // main: "#FC9D4E"
      main: "#c7e8b3",
    },
  },
  typography: {
    fontFamily: '"Signika", "Arial", sans-serif', // Set Signika as default font
  },
});

export default theme;
