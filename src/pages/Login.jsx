import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login function
    localStorage.setItem("isAuthenticated", "true");
    navigate("/home");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <VStack spacing={4} width="300px">
        <Heading>Login</Heading>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button onClick={handleLogin} colorScheme="blue" width="full">Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;