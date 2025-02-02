"use client"
import { createContext, useState } from "react";

export const FilterContext = createContext({
    date: new Date(),
    period: 'monthly',
    category: null,
    section: 'expense'
});

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentMonth = month[(new Date()).getMonth()]

const pages = [currentMonth, 'Monthly', 'Category', 'Expense'];

export const FilterProvider = ({ children }) => {
    const [menu, setMenu] = useState(pages);
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <FilterContext.Provider value={{
            period: menu[1],
            category: menu[2],
            section: menu[3],
            menu,
            setMenu,
            selectedDate,
            setSelectedDate
        }}>
            {children}
        </FilterContext.Provider>
    )
}