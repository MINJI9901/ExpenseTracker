"use client";
import { createContext, useState } from "react";

export const FilterContext = createContext({
  date: new Date(),
  section: "Expense",
});

const pages = ["Expense"];

export const FilterProvider = ({ children }) => {
  const [menu, setMenu] = useState(pages);
  // const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <FilterContext.Provider
      value={{
        section: menu[0],
        // selectedCategory,
        // setSelectedCategory,
        menu,
        setMenu,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
