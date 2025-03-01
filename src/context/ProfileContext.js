"use client";
import { createContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
// HOOKS
import { getUser } from "@/lib/userApi";

const profileInfo = {
  name: "",
  image: {},
  email: "",
  currPassword: "",
  newPassword: "",
};

export const ProfileContext = createContext(profileInfo);

export const ProfileProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(profileInfo);

  const getUserData = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    console.log("user data: ", data);

    if (!data?.user?.id) {
      console.error("User ID not found");
      return;
    }

    const userData = await getUser(data.user.id);

    if (userData) {
      // const base64Img = userData.image?.data
      //   ? Buffer.from(userData.image.data.data).toString("base64")
      //   : null;
      // const url = base64Img
      //   ? `data:${userData.image.contentType}:base64,${base64Img}`
      //   : "";
      const blob = userData.image?.data
        ? new Blob([new Uint8Array(userData.image.data.data)], {
            type: userData.image.contentType,
          })
        : null;
      const url = blob ? URL.createObjectURL(blob) : "";

      setUserInfo((prev) => ({
        ...prev,
        email: userData.email,
        name: userData.name,
        image: { src: url || "" },
      }));
    } else {
      if (data.user.email && userInfo.email !== data.user.email) {
        setUserInfo((prev) => ({ ...prev, email: data.user.email }));
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ProfileContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </ProfileContext.Provider>
  );
};
