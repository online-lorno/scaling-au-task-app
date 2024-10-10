"use client";

import { useState, useTransition } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "@/lib/redux/hooks";
import { login } from "@/lib/redux/slices/auth-slice";
import { loginAction } from "@/app/(pages)/login/actions";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    startTransition(async () => {
      const result = await loginAction({ email, password });
      if (result.error) {
        setError(result.error);
      } else {
        // this will automatically redirect to the home page
        // since it will check again in the login page if it's authenticated
        dispatch(
          login({
            isAuthenticated: true,
          })
        );
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <Paper
          elevation={6}
          sx={{
            padding: 2,
            width: "500px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Login</Typography>
          {error && (
            <Alert severity="error">{error ?? "Invalid credentials"}</Alert>
          )}
          <TextField
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
          >
            Submit
          </Button>
        </Paper>
      </form>
    </Box>
  );
};

export default LoginForm;
