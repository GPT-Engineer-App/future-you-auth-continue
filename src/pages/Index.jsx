// Update this page (the content is just a fallback if you fail and example)
// Use chakra-ui
import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  const navigate = useNavigate();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to MyApp</Text>
        <Text>Sign up or log in to access your account.</Text>
        <Button colorScheme="blue" onClick={() => navigate("/signup")}>Sign Up</Button>
        <Button onClick={() => navigate("/login")}>Log In</Button>
      </VStack>
    </Container>
  );
};

export default Index;
