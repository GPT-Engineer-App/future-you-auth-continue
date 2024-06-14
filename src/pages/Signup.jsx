import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Mock signup function
    localStorage.setItem("isAuthenticated", "true");
    navigate("/home");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <VStack spacing={4} width="300px">
        <Heading>Signup</Heading>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button onClick={handleSignup} colorScheme="blue" width="full">Signup</Button>
      </VStack>
    </Box>
  );
};

export default Signup;