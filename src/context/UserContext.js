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

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("Error to get user: ", error);
      }

      setUser(data?.user);
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};
