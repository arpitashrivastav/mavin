"use client";
import { useState } from "react";
import axios from "axios";
import { Container, Heading, Box, Link, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Login from "../../components/auth/Login";
import { useAuth } from "../../contexts/Auth";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const { state, actions } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const response = await axios.post("/api/auth/login", formData);

      if (response.status === 200) {
        // const { token } = response.data;
        // localStorage.setItem("token", token);
        // actions.setUser(

        // )

        router.push("/");
      }

      console.log("Login successful", response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container maxW="sm">
      <Heading as="h1" textAlign="center" mb={6}>
        Login
      </Heading>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Login onSubmit={onSubmit} />
      <Box>
        <span>Don&apos;t have an account? </span>
        <Link href="/auth/signup">Sign up</Link>
      </Box>
    </Container>
  );
}
