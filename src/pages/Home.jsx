import { Box, Flex, VStack, HStack, Text, Input, Avatar, Button, IconButton } from "@chakra-ui/react";
import { FaSearch, FaHome, FaUser, FaBriefcase, FaEnvelope, FaBell } from "react-icons/fa";

const Home = () => {
  return (
    <Flex direction="column" height="100vh">
      <Flex as="header" bg="blue.500" color="white" p={4} justify="space-between" align="center">
        <HStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">MyApp</Text>
          <Input placeholder="Search" bg="white" color="black" />
          <IconButton aria-label="Search" icon={<FaSearch />} />
        </HStack>
        <HStack spacing={4}>
          <IconButton aria-label="Notifications" icon={<FaBell />} />
          <Avatar name="User Name" />
        </HStack>
      </Flex>
      <Flex flex="1">
        <VStack as="nav" bg="gray.100" width="250px" p={4} spacing={4} align="stretch">
          <Button leftIcon={<FaHome />}>Home</Button>
          <Button leftIcon={<FaUser />}>Profile</Button>
          <Button leftIcon={<FaBriefcase />}>Jobs</Button>
          <Button leftIcon={<FaEnvelope />}>Messages</Button>
        </VStack>
        <Box flex="1" p={4} overflowY="auto">
          <Text fontSize="xl" mb={4}>Feed</Text>
          {/* Feed content goes here */}
        </Box>
      </Flex>
      <Box as="footer" bg="gray.200" p={4} textAlign="center">
        <Text>&copy; 2023 MyApp. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default Home;