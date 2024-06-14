import { Box, Flex, VStack, HStack, Text, Input, Avatar, Button } from "@chakra-ui/react";
import { FaSearch, FaHome, FaUser, FaBriefcase, FaEnvelope } from "react-icons/fa";

const Home = () => {
  return (
    <Box>
      <Flex as="header" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">MyApp</Text>
        <HStack spacing={4}>
          <Input placeholder="Search" bg="white" color="black" />
          <FaSearch />
          <Avatar name="User Name" />
        </HStack>
      </Flex>
      <Flex>
        <VStack as="nav" bg="gray.100" p={4} spacing={4} alignItems="flex-start" width="20%">
          <Button leftIcon={<FaHome />} variant="ghost" justifyContent="flex-start" width="100%">Home</Button>
          <Button leftIcon={<FaUser />} variant="ghost" justifyContent="flex-start" width="100%">Profile</Button>
          <Button leftIcon={<FaBriefcase />} variant="ghost" justifyContent="flex-start" width="100%">Jobs</Button>
          <Button leftIcon={<FaEnvelope />} variant="ghost" justifyContent="flex-start" width="100%">Messages</Button>
        </VStack>
        <Box as="main" p={4} width="60%">
          <Text fontSize="xl" mb={4}>Feed</Text>
          {/* Feed content goes here */}
        </Box>
      </Flex>
      <Box as="footer" bg="gray.200" p={4} textAlign="center">
        <Text>&copy; 2023 MyApp. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Home;