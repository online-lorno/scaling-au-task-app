"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { registerAction } from "@/app/(pages)/register/actions";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const result = await registerAction({ email, password });
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Account registered");
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
          <Typography variant="h6">Register Form</Typography>
          {error && (
            <Alert severity="error">
              {error ?? "Cannot register with the given credentials"}
            </Alert>
          )}
          {success && (
            <Alert severity="success">{success ?? "Account registered"}</Alert>
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
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
          >
            Register
          </Button>
          <Link href="/login">Login here</Link>
        </Paper>
      </form>
    </Box>
  );
};

export default RegisterForm;
