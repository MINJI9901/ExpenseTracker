import { Geist, Geist_Mono, Signika } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Box } from "@mui/material";
// THEME
import ThemeProvider from "@/theme/ThemeProvider";
// CONTEXT
import { FilterProvider } from "@/context/filterContext";
import { UserProvider } from "@/context/UserContext";
import { ProfileProvider } from "@/context/ProfileContext";
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

// const isClient = typeof window !== "undefined";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>

      <body
        className={`${signika.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <UserProvider>
          <ProfileProvider>
            <FilterProvider>
              <ThemeProvider key="mui">
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <NavBar />
                </Box>
                {children}
                <ToastContainer position="top-center" autoClose={5000} />
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Footer />
                </Box>
                <MobileNavBar />
              </ThemeProvider>
            </FilterProvider>
          </ProfileProvider>
        </UserProvider>
      </body>
    </html>
  );
}
