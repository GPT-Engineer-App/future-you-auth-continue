import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement login logic here
    // On success:
    localStorage.setItem("token", "dummy-token");
    navigate("/home");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <VStack spacing={4} width="300px">
        <Heading>Login</Heading>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin} colorScheme="blue" width="100%">Login</Button>
        <Text>Don't have an account? <Button variant="link" onClick={() => navigate("/signup")}>Sign Up</Button></Text>
      </VStack>
    </Box>
  );
};

export default Login;