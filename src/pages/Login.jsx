import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={6}>Log In</Heading>
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
            Log In
          </Button>
        </VStack>
      </form>
      <Text mt={4}>
        Don't have an account? <Button variant="link" onClick={() => navigate("/signup")}>Sign Up</Button>
      </Text>
    </Box>
  );
};

export default Login;