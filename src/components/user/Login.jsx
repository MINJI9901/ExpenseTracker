"use client";
import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";

import { login, signup } from "@/app/login/actions";

const signUpNotify = (e) => {
  e.preventDefault();

  toast(
    <ToastMsg
      title={"Check Your Email!"}
      content={"Verify you email to complete signup."}
    />,
    { hideProgressBar: true }
  );
};

const loginNotify = async (e) => {
  e.preventDefault();

  const form = e.target.closest("form"); // Get the closest form element
  //   console.log("closest form: ", form);
  if (!form) return;

  const formData = new FormData(form);
  //   console.log("formData: ", formData);
  const isLogined = await login(formData);
  //   console.log("After login call, isLogined:", isLogined);

  if (!isLogined) {
    return toast(
      <ToastMsg
        title={"Failed To Login"}
        content={"Check your email or password"}
      />,
      { autoClose: 2000, hideProgressBar: true }
    );
  }
};

function ToastMsg({ title, content }) {
  return (
    <Box textAlign="center" m="0.5rem">
      <Typography fontWeight={700} color="black">
        {title}
      </Typography>
      <Typography>{content}</Typography>
    </Box>
  );
}

export default function Login() {
  const { palette } = useTheme();

  const emailRegex = /^.+@.+\..+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const [user, setUser] = useState({ email: "", password: "" });
  const validateEmail = emailRegex.test(user.email);
  const validatePassword = passwordRegex.test(user.password);

  const handleEmailInput = (e) => {
    setUser((prev) => ({
      ...prev,
      email: e.target.value,
    }));
    console.log(user);
    // console.log(validateEmail)
  };

  const handlePasswordInput = (e) => {
    setUser((prev) => ({
      ...prev,
      password: e.target.value,
    }));
    console.log(user);
  };

  const handleSubmit = (e) => {
    if (!validateEmail || !validatePassword) {
      e.preventDefault();
    }
  };

  return (
    <Box
      sx={{
        margin: "auto",
        mt: "5rem",
        display: "flex",
        justifyContent: "center",
        width: { xs: "80%", sm: "60%", md: "50%" },
        height: "fit-content",
        border: "1px solid gray",
        borderRadius: "1rem",
      }}
    >
      <Box
        component={"form"}
        sx={{ width: "80%", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h1" sx={{ fontSize: "2rem", my: "2rem" }}>
          Login / SignUp
        </Typography>
        <TextField
          fullWidth
          error={!user.email.length || validateEmail ? false : true}
          name="email"
          label="E-mail"
          sx={{ mb: "1rem" }}
          onChange={handleEmailInput}
          helperText={
            !user.email.length || validateEmail ? "" : "Type valid email."
          }
        />
        <TextField
          fullWidth
          type="password"
          error={!user.password.length || validatePassword ? false : true}
          name="password"
          label="Password"
          sx={{ mb: "1rem" }}
          onChange={handlePasswordInput}
          helperText={
            !user.password.length || validatePassword
              ? ""
              : "Password should be 8-16 letters that contain more than one of each alphabet, number, and special charactor."
          }
        />
        <Button
          component="button"
          type="submit"
          //   formAction={login}
          onClick={async (e) => {
            await loginNotify(e);
          }}
          fullWidth
          sx={{
            bgcolor: palette.secondary.main,
            color: "white",
            py: "0.5rem",
            my: "0.5rem",
          }}
        >
          Login
        </Button>
        <Button
          component="button"
          type="submit"
          formAction={signup}
          onClick={signUpNotify}
          fullWidth
          sx={{
            border: `1px solid ${palette.secondary.main}`,
            bgcolor: "white",
            color: palette.secondary.main,
            py: "0.5rem",
            mb: "2rem",
          }}
        >
          SignUp
        </Button>
      </Box>
    </Box>
  );
}
