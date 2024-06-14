import { Box, Flex, VStack, HStack, Text, Input, Avatar, Button, IconButton } from "@chakra-ui/react";
import { FaSearch, FaHome, FaUser, FaBriefcase, FaEnvelope } from "react-icons/fa";

const Home = () => {
  return (
    <Flex direction="column" height="100vh">
      <Box bg="blue.500" p={4} color="white">
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold">MyApp</Text>
          <HStack spacing={4}>
            <Input placeholder="Search" bg="white" color="black" />
            <IconButton aria-label="Search" icon={<FaSearch />} />
            <Avatar name="User Name" />
          </HStack>
        </Flex>
      </Box>
      <Flex flex="1">
        <Box w="20%" bg="gray.100" p={4}>
          <VStack align="start" spacing={4}>
            <Button leftIcon={<FaHome />} variant="ghost" justifyContent="flex-start" width="100%">Home</Button>
            <Button leftIcon={<FaUser />} variant="ghost" justifyContent="flex-start" width="100%">Profile</Button>
            <Button leftIcon={<FaBriefcase />} variant="ghost" justifyContent="flex-start" width="100%">Jobs</Button>
            <Button leftIcon={<FaEnvelope />} variant="ghost" justifyContent="flex-start" width="100%">Messages</Button>
          </VStack>
        </Box>
        <Box flex="1" p={4}>
          <Text fontSize="xl" mb={4}>Feed</Text>
          {/* Feed content goes here */}
        </Box>
      </Flex>
      <Box bg="gray.200" p={4} textAlign="center">
        <Text>&copy; 2023 MyApp. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default Home;