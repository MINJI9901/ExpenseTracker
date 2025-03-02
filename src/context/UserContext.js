"use client";
import { createContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// const checkUser = async () => {
//     const user = await authenticateUser()
//     return user;
// }

export const UserContext = createContext({ user: null, setUser: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getAndSetUser = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.log("Error to get user: ", error);
      return;
    }

    setUser(data?.user);
  };

  useEffect(() => {
    getAndSetUser();
  }, []);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};
