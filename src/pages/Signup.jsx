import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Implement signup logic here
    // On success:
    localStorage.setItem("token", "dummy-token");
    navigate("/home");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <VStack spacing={4} width="300px">
        <Heading>Sign Up</Heading>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSignup} colorScheme="blue" width="100%">Sign Up</Button>
        <Text>Already have an account? <Button variant="link" onClick={() => navigate("/login")}>Login</Button></Text>
      </VStack>
    </Box>
  );
};

export default Signup;