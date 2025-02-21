"use client";
import { createContext } from "react";

const colorPalette = [
  "#005e5c",
  "#80c8d9",
  "#c7e8b3",
  "#ebdae1",
  "#FFE6C9",
  "#C5BAFF",
  "#FFFBCA",
  "#A35C7A",
  "#B3D8A8",
  "#EABDE6",
  "#009990",
];

export const ColorContext = createContext(colorPalette);

export const ColorProvider = ({ children }) => {
  return (
    <ColorContext.Provider value={colorPalette}>
      {children}
    </ColorContext.Provider>
  );
};
