"use client"
import { createContext, useState } from "react";

export const RefreshContext = createContext();

export const RefreshProvider = (children) => {
    const [isUpdated, setIsUpdated] = useState(false);

    return (
        <RefreshContext.Provider value={{isUpdated, setIsUpdated}}>
            {children}
        </RefreshContext.Provider>
    )
}