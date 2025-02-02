"use client"
import { login, signup } from "@/app/login/actions"
import { Box, Button, FormControl, FormHelperText, Grid2, Typography, TextField, useTheme } from "@mui/material"

import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

// const validatePassword = (password) => {
//     const minLength = 8;
//     const maxLength = 16;
//     const hasUpperCase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     return password.length >= minLength && password.length <= maxLength && hasUpperCase && hasNumber && hasSpecialChar;
// };

export default function Login() {
    const { palette } = useTheme();

    const signUpNotify = () => toast(<ToastMsg title={'Check Your Email!'} content={'Verify you email to complete signup.'} />, { hideProgressBar: true });

    const loginNotify = async () => {
        const isLogined = await login();
        console.log('isLogined: ', isLogined)
        if (!isLogined) {
            console.log('isLogined: ', isLogined)
            return toast(<ToastMsg title={'Failed To Login'} content={'Check your email or password'} />, { autoClose: 2000, hideProgressBar: true })
        }
    }
    
    function ToastMsg({ title, content }) {
        return (
            <Box textAlign='center' m='0.5rem'>
                <Typography fontWeight={700} color="black">{title}</Typography>
                <Typography>{content}</Typography>
            </Box>
        )
    }

    const emailRegex = /^.+@.+\..+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    const [user, setUser] = useState({email: '', password: ''});
    const validateEmail = emailRegex.test(user.email);
    const validatePassword = passwordRegex.test(user.password);

    const handleEmailInput = (e) => {
        setUser(prev => ({
            ...prev,
            email: e.target.value
        }))
        console.log(user)
        // console.log(validateEmail)
    }

    const handlePasswordInput = (e) => {
        setUser(prev => ({
            ...prev,
            password: e.target.value
        }))
        console.log(user)
    }

    const handleSubmit = (e) => {
        if (!validateEmail || !validatePassword) {
            e.preventDefault();
        }
    }

    return (
        <Box sx={{ margin: 'auto', mt: '5rem', display: 'flex', justifyContent: 'center', width: '50%', height: 'fit-content', border: '1px solid gray', borderRadius: '1rem' }}>
            <Box component={'form'} sx={{ width: '80%', textAlign: 'center' }} onSubmit={handleSubmit}>
                <Typography variant="h1" sx={{ fontSize: '2rem', my: '2rem' }}>Login / SignUp</Typography>
                <TextField
                    fullWidth
                    error={!user.email.length || validateEmail ? false : true}
                    name="email"
                    label='E-mail'
                    sx={{ mb: '1rem' }}
                    onChange={handleEmailInput}
                    helperText={!user.email.length || validateEmail ? '' : 'Type valid email.'}
                />
                <TextField
                    fullWidth
                    error={!user.password.length || validatePassword ? false : true}
                    name="password"
                    label='Password'
                    sx={{ mb: '1rem' }}
                    onChange={handlePasswordInput}
                    helperText={!user.password.length || validatePassword ? '' : 'Password should be 8-16 letters that contain more than one of each alphabet, number, and special charactor.'}
                />
                <Button component="button" type="submit" formAction={login} onClick={loginNotify} fullWidth sx={{ bgcolor: palette.secondary.main, color: 'white', py: '0.5rem', my: '0.5rem' }}>Login</Button>
                <Button component="button" type="submit" formAction={signup} onClick={signUpNotify} fullWidth sx={{ border: `1px solid ${palette.secondary.main}`, bgcolor: 'white', color: palette.secondary.main, py: '0.5rem', mb: '2rem' }}>SignUp</Button>
            </Box>
        </Box>

    //   <form>
    //     <label htmlFor="email">Email:</label>
    //     <input id="email" name="email" type="email" required />
    //     <label htmlFor="password">Password:</label>
    //     <input id="password" name="password" type="password" required />
    //     <button formAction={login}>Log in</button>
    //     <button formAction={signup}>Sign up</button>
    //   </form> display: 'fixed', top: '50%', left: '50%', width: '50%',
    )
  }