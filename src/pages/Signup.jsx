import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={6}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" colorScheme="blue" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
      <Text mt={4}>
        Already have an account? <Button variant="link" onClick={() => navigate("/login")}>Log In</Button>
      </Text>
    </Box>
  );
};

export default Signup;