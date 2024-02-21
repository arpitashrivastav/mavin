"use client";
import { useState } from "react";
import axios from "axios";
import { Container, Heading, Box, Link, Button } from "@chakra-ui/react";
import SignupForm from "../../components/auth/SignUp";

export default function SignupPage() {
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post("/api/auth/signup", formData);
      // If signup is successful, redirect user to dashboard or homepage
      console.log("Signup successful", response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container maxW="sm">
      <Heading as="h1" textAlign="center" mb={6}>
        Sign Up
      </Heading>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <SignupForm onSubmit={onSubmit} />
      <Box>
        <span>Already have an account? </span>
        <Link href="/auth/login">Login</Link>
      </Box>
    </Container>
  );
  <Container maxW="sm">
    <Heading as="h1" textAlign="center" mb={6}>
      Sign Up
    </Heading>
  </Container>;
}
