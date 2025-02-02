"use client"
import { createContext, useState } from "react";
import { authenticateUser } from "@/app/login/actions";

// const checkUser = async () => {
//     const user = await authenticateUser()
//     return user;
// }

export const UserContext = createContext({ user: null, setUser: null });

export const UserProvider = ({children}) => {
    const [isUser, setIsUser] = useState({});
    // console.log('user initial state: ', isUser)

    return (
        <UserContext.Provider value={{ user: isUser, setUser: setIsUser }}>
            {children}
        </UserContext.Provider>
    )
}