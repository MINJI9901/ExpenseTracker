import { useContext, useState } from "react";
// MUI
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
// SUPABASE
import { createClient } from "@/utils/supabase/client";
// CONTEXTS
import { ProfileContext } from "@/context/ProfileContext";
// COMPONENTS
import { ToastMsg } from "../notification/ToastMsg";
import { toast } from "react-toastify";

export default function PasswordForm({ setCloseForm }) {
  const { palette } = useTheme();

  const { userInfo } = useContext(ProfileContext);

  const inputName = ["currPassword", "newPassword"];

  const [passwords, setPasswords] = useState({
    currPassword: "",
    newPassword: "",
  });

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  const validatePassword = passwordRegex.test(passwords["newPassword"]);

  const handleChangeInput = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (validatePassword) {
      const supabase = createClient();

      const { user, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: userInfo.email,
          password: passwords["currPassword"],
        });

      if (signInError) {
        console.log("password doesn't match: ", signInError);
        return toast(
          <ToastMsg
            title={"Password Not Matched"}
            content={"Entered current password is incorrect"}
            contentColor={palette.error.dark}
          />,
          { autoClose: 2000, hideProgressBar: true }
        );
      }

      const { data, error: updateError } = await supabase.auth.updateUser({
        password: passwords["newPassword"],
      });

      if (updateError) {
        console.log("problem in changing password: ", updateError);
        return;
      }

      setCloseForm(false);

      return toast(
        <ToastMsg
          title={"Password Change Completed!"}
          content={"Password is changed successfully!"}
          contentColor={palette.success.dark}
        />,
        {
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    }
  };

  return (
    <Box component={"form"}>
      {inputName.map((name, idx) => (
        <Box key={name} mt={"0.5rem"} ml={"1.5rem"}>
          <Typography>{["Current Password", "New Password"][idx]}</Typography>
          <Box
            minHeight={"2rem"}
            maxHeight={"5rem"}
            border={"1px solid"}
            borderColor={palette.grey[300]}
            borderRadius={"0.5rem"}
          >
            <TextField
              variant="standard"
              size="small"
              type="password"
              name={name}
              value={passwords[name]}
              sx={{
                width: "95%",
                height: "90%",
                mx: "0.5rem",
              }}
              error={
                !passwords[name].length || (idx === 1 && !validatePassword)
              }
              helperText={
                idx === 1
                  ? !passwords[name].length || validatePassword
                    ? ""
                    : "Password should be 8-16 letters that contain more than one of each alphabet, number, and special charactor."
                  : ""
              }
              //   slotProps={{
              //     formHelperText: {
              //       sx: {
              //         minHeight: "2em",
              //         position: "static",
              //         display: "block",
              //       },
              //     },
              //   }}
              onChange={handleChangeInput}
            ></TextField>
          </Box>
        </Box>
      ))}
      <Button
        size="small"
        sx={{
          borderColor: palette.success.light,
          border: "1px solid",
          color: palette.success.main,
          fontSize: "0.8rem",
          margin: "1rem 1.5rem",
        }}
        onClick={handleSave}
      >
        Change Password
      </Button>
    </Box>
  );
}
