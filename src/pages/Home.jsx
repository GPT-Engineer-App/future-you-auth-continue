import { Box, Flex, VStack, HStack, Text, Input, Avatar, Button } from "@chakra-ui/react";
import { FaSearch, FaUser, FaBriefcase, FaEnvelope } from "react-icons/fa";

const Home = () => {
  return (
    <Box>
      <Flex as="header" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">MyApp</Text>
        <HStack spacing={4}>
          <Input placeholder="Search" bg="white" color="black" />
          <Avatar name="User Name" />
        </HStack>
      </Flex>
      <Flex>
        <VStack as="nav" bg="gray.100" p={4} spacing={4} alignItems="flex-start" width="20%">
          <Button leftIcon={<FaUser />}>Profile</Button>
          <Button leftIcon={<FaBriefcase />}>Jobs</Button>
          <Button leftIcon={<FaEnvelope />}>Messages</Button>
        </VStack>
        <Box as="main" p={4} width="60%">
          <Text fontSize="xl" mb={4}>Feed</Text>
          {/* Feed content goes here */}
        </Box>
        <Box as="aside" bg="gray.50" p={4} width="20%">
          <Text fontSize="xl" mb={4}>Sidebar</Text>
          {/* Sidebar content goes here */}
        </Box>
      </Flex>
      <Flex as="footer" bg="blue.500" color="white" p={4} justifyContent="center">
        <Text>&copy; 2023 MyApp</Text>
      </Flex>
    </Box>
  );
};

export default Home;