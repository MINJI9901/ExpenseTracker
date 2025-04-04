"use client";
import { useState, useEffect, useContext } from "react";
// MUI
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  Typography,
  TextField,
  useTheme,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
// CONTEXTS
import { UserContext } from "@/context/UserContext";
// TOAST
import { ToastContainer, toast } from "react-toastify";
// SUPABASE
import { createClient } from "@/utils/supabase/client";
// HOOKS
import { login, signup } from "@/app/login/actions";
// COMPONENTS
import { ToastMsg } from "../notification/ToastMsg";

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

export default function Login() {
  const { palette } = useTheme();

  const emailRegex = /^.+@.+\..+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const { user, setUser } = useContext(UserContext);
  const validateEmail = emailRegex.test(userInput.email);
  const validatePassword = passwordRegex.test(userInput.password);

  // useEffect(() => {
  //   window.handleGoogleLogin = () => signInWith("google");
  // }, [signInWith]);

  const handleEmailInput = (e) => {
    setUserInput((prev) => ({
      ...prev,
      email: e.target.value,
    }));
    // console.log(validateEmail)
  };

  const handlePasswordInput = (e) => {
    setUserInput((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    if (!validateEmail || !validatePassword) {
      e.preventDefault();
    }
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

    // const supabase = createClient();
    // const { data, error } = await supabase.auth.getUser();

    // setUser(data?.user);
  };

  async function signInWith(provider) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.log(`error in signing in with ${provider}: `, error);
    }
  }

  return (
    <Box
      sx={{
        margin: "auto",
        my: "5rem",
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
          error={!userInput.email.length || validateEmail ? false : true}
          name="email"
          label="E-mail"
          sx={{ mb: "1rem" }}
          onChange={handleEmailInput}
          helperText={
            !userInput.email.length || validateEmail ? "" : "Type valid email."
          }
        />
        <TextField
          fullWidth
          type="password"
          error={!userInput.password.length || validatePassword ? false : true}
          name="password"
          label="Password"
          sx={{ mb: "1rem" }}
          onChange={handlePasswordInput}
          helperText={
            !userInput.password.length || validatePassword
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
        {/* <Button
          component="button"
          type="submit"
          onClick={() => signInWith("google")}
        >
          Login in With Google!
        </Button> */}
        <Divider sx={{ mb: "2rem", color: "gray" }}>
          Social Login / Sign-up
        </Divider>

        <Box mb={"2rem"}>
          {/* <GoogleLogin /> */}
          <Button
            fullWidth
            color="gray"
            sx={{
              border: "1px solid",
              borderColor: palette.grey[300],
              mb: "0.5rem",
            }}
            onClick={() => signInWith("google")}
          >
            Sign in with Google{" "}
            <GoogleIcon
              fontSize="3rem"
              sx={{ color: palette.success.dark, ml: "0.2rem" }}
            />
          </Button>
          <Button
            fullWidth
            color="gray"
            sx={{ bgcolor: palette.grey[200] }}
            onClick={() => signInWith("github")}
          >
            Sign in with GitHub{" "}
            <GitHubIcon
              fontSize="3rem"
              sx={{ color: palette.success.dark, ml: "0.2rem" }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
