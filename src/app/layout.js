import { Geist, Geist_Mono, Signika } from "next/font/google";
import "./globals.css";
import { Box } from "@mui/material";
// THEME
import ThemeProvider from "@/theme/ThemeProvider";
// CONTEXT
import { FilterProvider } from "@/context/filterContext";
import { UserProvider } from "@/context/UserContext";
// TOAST
import { ToastContainer, toast } from "react-toastify";
// COMPONENTS
import NavBar from "@/components/generic/NavBar";
import MobileNavBar from "@/components/generic/MobileNavBar";
import Footer from "@/components/generic/Footer";
import Login from "@/components/user/Login";

const signika = Signika({ subsets: ["latin"], weight: ["400", "700"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expenser",
  description: "Manage Your Money Flow!",
  icons: {
    icon: "/img/orange_heart_favicon.ico", // Default favicon
    shortcut: "/img/orange_heart_favicon.ico",
    apple: "/img/orange_heart_favicon.ico", // Apple touch icon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${signika.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <FilterProvider>
            <ThemeProvider>
              <Box display={{ xs: "none", sm: "block" }}>
                <NavBar />
              </Box>
              {children}
              <ToastContainer position="top-center" autoClose={5000} />
              {/* // render echarts option. */}
              {/* <ReactECharts option={this.getOption()} /> */}
              <Box display={{ xs: "none", sm: "flex" }}>
                <Footer />
              </Box>
              <MobileNavBar />
            </ThemeProvider>
          </FilterProvider>
        </UserProvider>
      </body>
    </html>
  );
}
