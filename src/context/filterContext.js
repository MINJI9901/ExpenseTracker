"use client";
import { createContext, useState } from "react";

export const FilterContext = createContext({
  date: new Date(),
  section: "Expense",
});

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
const currentMonth = month[new Date().getMonth()];

const pages = [currentMonth, "Page", "Expense"];

export const FilterProvider = ({ children }) => {
  const [menu, setMenu] = useState(pages);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <FilterContext.Provider
      value={{
        section: menu[2],
        selectedCategory,
        setSelectedCategory,
        menu,
        setMenu,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
