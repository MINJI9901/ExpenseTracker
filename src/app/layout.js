import { Geist, Geist_Mono, Signika } from "next/font/google";
import "./globals.css";
// THEME
import ThemeProvider from "@/theme/ThemeProvider";
// CONTEXT
import { FilterProvider } from "@/context/filterContext";
import { UserProvider } from "@/context/UserContext";
// TOAST
import { ToastContainer, toast } from "react-toastify";
// COMPONENTS
import NavBar from "@/components/generic/NavBar";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/rabbit_favicon.ico" />
      <body
        className={`${signika.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <FilterProvider>
            <ThemeProvider>
              <NavBar />
              {children}
              <ToastContainer position="top-center" autoClose={5000} />
              {/* // render echarts option. */}
              {/* <ReactECharts option={this.getOption()} /> */}
              <Footer />
            </ThemeProvider>
          </FilterProvider>
        </UserProvider>
      </body>
    </html>
  );
}
